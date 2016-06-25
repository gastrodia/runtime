import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {MathUtil} from '../../../runtime/math/MathUtil';
import {Matrix3x3} from '../../../runtime/math/Matrix3x3';
import {Quaternion} from '../../../runtime/math/Quaternion';
import {Vector3} from '../../../runtime/math/Vector3';
import {Camera} from './Camera';
import {PerspectiveProjection} from './PerspectiveProjection';
import {Projection} from './Projection';

//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class PerspectiveCamera extends Camera {
   // 投影
   public projection: Projection;
   // 四元数
   public rotation: Vector3;
   public rotationMatrix: Matrix3x3;
   public quaternion: Quaternion;
   public quaternionX: Quaternion;
   public quaternionY: Quaternion;
   public quaternionZ: Quaternion;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 初始化变量
      this.projection = new PerspectiveProjection();
      this.rotation = new Vector3();
      this.rotationMatrix = new Matrix3x3();
      this.quaternion = new Quaternion();
      this.quaternionX = new Quaternion();
      this.quaternionY = new Quaternion();
      this.quaternionZ = new Quaternion();
   }

   //==========================================================
   // <T>X轴移动。</T>
   //
   // @method
   // @param value:Number 距离
   //==========================================================
   public doMoveX(value) {
      this.position.x += value;
   }

   //==========================================================
   // <T>Y轴移动。</T>
   //
   // @method
   // @param value:Number 距离
   //==========================================================
   public doMoveY(value) {
      this.position.y += value;
   }

   //==========================================================
   // <T>Z轴移动。</T>
   //
   // @method
   // @param value:Number 距离
   //==========================================================
   public doMoveZ(value) {
      this.position.z += value;
   }

   //==========================================================
   // <T>向前/向后移动。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doForward(value) {
      this.position.x += this.direction.x * value;
      this.position.y += this.direction.y * value;
      this.position.z += this.direction.z * value;
   }

   //==========================================================
   // <T>向上/向下旋转。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doPitch(p) {
      this.rotation.x += p;
   }

   //==========================================================
   // <T>向左/向右旋转。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doYaw(p) {
      this.rotation.y += p;
   }

   //==========================================================
   // <T>向左/向右转向。</T>
   //
   // @method
   // @param p:radian:Number 弧度
   //==========================================================
   public doRoll(p) {
      this.rotation.z += p;
   }

   //==========================================================
   // <T>加载资源。</T>
   //
   // @method
   // @param resource:FE3sCamera 资源
   //==========================================================
   public loadResource(resource) {
      // var resourceProjection = resource.projection();
      // this._resource = resource;
      // // 加载设置
      // this.position().assign(resource.position());
      // this.setDirection(resource.direction().x, resource.direction().y, resource.direction().z);
      // this.update();
      // // 设置投影
      // var projection = this.projection();
      // projection._angle = resourceProjection.angle();
      // projection._znear = resourceProjection.znear();
      // projection._zfar = resourceProjection.zfar();
      // projection.update();
      //cameraProjection.loadResource(rcv);
   }

   //==========================================================
   // <T>提交资源。</T>
   //
   // @method
   //==========================================================
   public commitResource() {
      // var resource = this._resource;
      // resource._position.assign(this._position);
      // resource._direction.assign(this._direction);
   }

   //==========================================================
   // <T>更新相机信息。</T>
   //
   // @method
   //==========================================================
   public update() {
      // 计算旋转分量
      var rotation = this.rotation;
      // this.quaternionX.fromAxisAngle(MathUtil.vectorAxisX, rotation.x);
      // this.quaternionY.fromAxisAngle(MathUtil.vectorAxisY, rotation.y);
      // this.quaternionZ.fromAxisAngle(MathUtil.vectorAxisZ, rotation.z);
      this.quaternionX.fromAxisAngle(new Vector3(1, 0, 0), rotation.x);
      this.quaternionY.fromAxisAngle(new Vector3(0, 1, 0), rotation.y);
      this.quaternionZ.fromAxisAngle(new Vector3(0, 0, 1), rotation.z);
      // 计算旋转
      var quaternion = this.quaternion.identity();
      quaternion.mul(this.quaternionX);
      quaternion.mul(this.quaternionY);
      quaternion.mul(this.quaternionZ);
      // 转换为矩阵
      var matrix = this.rotationMatrix;
      matrix.build(quaternion);
      // 计算目标
      var direction = this.direction;
      matrix.transformPoint3(this.directionTarget, direction);
      direction.normalize();
      // 父更新矩阵
      super.update();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this.projection = ObjectUtil.dispose(this.projection);
      // 父处理
      super.dispose();
   }
}
