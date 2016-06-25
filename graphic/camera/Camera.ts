import {Fatal} from '../../../runtime/common/lang/Fatal';
import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {FrustumPlanes} from '../../../runtime/math/FrustumPlanes';
import {Matrix4} from '../../../runtime/math/Matrix4';
import {SFrustum} from '../../../runtime/math/SFrustum';
import {Point3} from '../../math/Point3';
import {Vector3} from '../../math/Vector3';
import {Viewport} from './Viewport';

//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class Camera extends ObjectBase {
   // @attribute 变换矩阵
   public matrix: Matrix4;
   // @attribute 相机位置
   public position: Point3;
   public target: Point3;
   // @attribute 相机方向
   public direction: Vector3;
   public directionTarget: Vector3;
   // @attribute 中心位置
   public centerFront = 0.6;
   public centerBack = 1.0;
   // @attribute 焦平面
   public focalNear = 0.1;
   public focalFar = 200.0;
   // @attribute 视截体
   public frustum: SFrustum;
   public planes: FrustumPlanes;
   public viewport: Viewport;
   // @attribute 轴线
   protected _axisUp: Vector3;
   protected _axisX: Vector3;
   protected _axisY: Vector3;
   protected _axisZ: Vector3;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super()
      // 初始化变量
      this.matrix = new Matrix4();
      this.position = new Point3();
      this.target = new Point3();
      this.direction = new Vector3();
      this.directionTarget = new Vector3();
      // 初始化变量
      this.frustum = new SFrustum();
      this.planes = new FrustumPlanes();
      this.viewport = ClassUtil.create(Viewport);
      // 初始化变量
      this._axisUp = new Vector3(0, 1, 0);
      this._axisX = new Vector3();
      this._axisY = new Vector3();
      this._axisZ = new Vector3();
   }

   //==========================================================
   // <T>设置位置。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   // @param z:Number Z坐标
   //==========================================================
   public setPosition(x, y, z) {
      this.position.set(x, y, z);
   }

   //==========================================================
   // <T>设置方向。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   // @param z:Number Z坐标
   //==========================================================
   public setDirection(x, y, z) {
      this.direction.set(x, y, z);
      this.directionTarget.set(x, y, z);
   }

   //==========================================================
   // <T>向前/向后移动</T>
   //
   // @method
   // @param p:value:Number 距离
   //==========================================================
   public doWalk(p) {
      this.position.x += this.direction.x * p;
      this.position.z += this.direction.z * p;
   }

   //==========================================================
   // <T>向左/向右平移</T>
   //
   // @method
   // @param p:value:Number 距离
   //==========================================================
   public doStrafe(p) {
      this.position.x += this._axisY.x * p;
      this.position.z += this._axisY.z * p;
   }

   //==========================================================
   // <T>向上/向下移动</T>
   //
   // @method
   // @param p:value:Number 距离
   //==========================================================
   public doFly(p) {
      this.position.y += p;
   }

   //==========================================================
   // <T>向上/向下旋转。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doPitch(p) {
      throw new Fatal(this, 'Unsupport.')
   }

   //==========================================================
   // <T>向左/向右旋转。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doYaw(p) {
      throw new Fatal(this, 'Unsupport.')
   }

   //==========================================================
   // <T>向左/向右转向。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doRoll(p) {
      throw new Fatal(this, 'Unsupport.')
   }

   //==========================================================
   // <T>朝向目标。</T>
   //
   // @method
   //==========================================================
   public lookAt(x, y, z) {
      var position = this.position;
      var direction = this.direction;
      this.target.set(x, y, z);
      direction.set(x - position.x, y - position.y, z - position.z);
      direction.normalize();
      this.directionTarget.assign(direction);
   }

   //==========================================================
   // <T>更新相机信息。</T>
   // <P>1. 更新空间矩阵。</P>
   // <P>2. 更新目标点。</P>
   //
   // @method
   //==========================================================
   public update() {
      var axisX = this._axisX;
      var axisY = this._axisY;
      var axisZ = this._axisZ;
      // 计算坐标轴
      axisZ.assign(this.direction);
      axisZ.normalize();
      axisX.crossVectors(this._axisUp, axisZ);
      axisX.normalize();
      axisY.crossVectors(axisZ, axisX);
      axisY.normalize();
      // 计算矩阵
      var elements = this.matrix.elements;
      elements[0] = axisX.x;
      elements[1] = axisY.x;
      elements[2] = axisZ.x;
      elements[3] = 0.0;
      elements[4] = axisX.y;
      elements[5] = axisY.y;
      elements[6] = axisZ.y;
      elements[7] = 0.0;
      elements[8] = axisX.z;
      elements[9] = axisY.z;
      elements[10] = axisZ.z;
      elements[11] = 0.0;
      elements[12] = -axisX.dot(this.position);
      elements[13] = -axisY.dot(this.position);
      elements[14] = -axisZ.dot(this.position);
      elements[15] = 1.0;
   }

   //==========================================================
   // <T>更新相机视截体。</T>
   //
   // @method
   //==========================================================
   public updateFrustum() {
      var matrix = new Matrix4();
      matrix.assign(this.matrix);
      //m.append(this._projection.matrix());
      this.planes.updateVision(matrix.elements);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this.matrix = ObjectUtil.dispose(this.matrix);
      // 父处理
      super.dispose();
   }
}
