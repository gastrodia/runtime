import {Vector3} from '../../../math/Vector3';
import {CurveActor} from '../../actor/CurveActor';
import {MeshActor} from '../../actor/MeshActor';
import {Actor} from '../../core/Actor';
import {LineBasicMaterial} from '../../material/LineBasicMaterial';
import {MeshBasicMaterial} from '../../material/MeshBasicMaterial';
import {LineCurve} from '../curve/LineCurve';
import {CylinderGeometry} from '../geometry/CylinderGeometry';

/**
 * 箭头帮助器配置信息。
 */
export class ArrowHelperOptions {
   // 方向
   public direction: Vector3;
   // 开始点
   public origin: Vector3;
   // 长度
   public length: number;
   // 颜色
   public color: number;
   // 头长度
   public headLength: number;
   // 头宽度
   public headWidth: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.origin = new Vector3(0, 0, 0);
      this.direction = new Vector3(0, 1, 0);
      this.length = 1;
      this.color = 0xFFFF0000;
      this.headLength = 0.2;
      this.headWidth = 0.06;
   }
}

/**
 * 箭头帮助器。
 */
export class ArrowHelper extends Actor {
   // 配置信息
   public options: ArrowHelperOptions;
   // 箭头几何体
   public cone: MeshActor;
   // 线几何体
   public line: CurveActor;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置参数
      this.options = new ArrowHelperOptions();
   }

   /**
    * 构建处理。
    */
//    public build() {
//       var options = this.options;
//       // 创建圆锥几何体
//       var coneGeometry = new CylinderGeometry();
//       var coneOptions = coneGeometry.options;
//       coneOptions.radiusTop = 0;
//       coneOptions.radiusBottom = 0.5;
//       coneOptions.height = 1;
//       coneOptions.radialSegments = 8;
//       coneOptions.heightSegments = 1;
//       coneGeometry.matrix.addTranslate(0, -0.5, 0);
//       coneGeometry.build();
//       var coneMaterial = new MeshBasicMaterial();
//       var cone = this.cone = new MeshActor(coneGeometry, coneMaterial);
//       cone.matrixAutoUpdate = false;
//       this.addChild(cone);
//       // 创建直线几何体
//       var lineCurve = new LineCurve();
//       lineCurve.begin.set(0, 0, 0);
//       lineCurve.end.set(0, 1, 0);
//       var lineMaterial = new LineBasicMaterial();
//       var lineActor = this.line = new CurveActor(lineCurve, lineMaterial);
//       lineActor.matrixAutoUpdate = false;
//       this.addChild(lineActor);
//       // 设置属性
//       this.position.assign(options.origin);
//       this.setDirection(options.direction);
//       this.setLength(options.length, options.headLength, options.headWidth);
//       this.setColor(options.color);
//       // 脏处理
//       this.dirty();
//    }

   /**
    * 设置方向。
    *
    * @param direction 方向
    */
   public setDirection(direction: Vector3) {
      var quaternion = this.quaternion;
      var axis = new Vector3();
      if (direction.y > 0.99999) {
         quaternion.set(0, 0, 0, 1);
      } else if (direction.y < -0.99999) {
         quaternion.set(1, 0, 0, 0);
      } else {
         axis.set(direction.z, 0, - direction.x).normalize();
         var radians = Math.acos(direction.y);
         quaternion.setFromAxisAngle(axis, radians);
      }
   }

   /**
    * 设置长度。
    *
    * @param length 长度
    * @param headLength 箭头长度
    * @param headWidth 箭头宽度
    */
   public setLength(length: number, headLength?: number, headWidth?: number) {
      if (headLength == null) {
         headLength = length * 0.2;
      }
      if (headWidth == null) {
         headWidth = headLength * 0.2;
      }
      // 更新圆锥
      var cone = this.cone;
      cone.scale.set(headWidth, headLength, headWidth);
      cone.position.y = length;
      cone.updateMatrix();
      // 更新直线
      var line = this.line;
      line.scale.set(1, Math.max(0, length - headLength), 1);
      line.updateMatrix();
   }

   /**
    * 设置颜色。
    *
    * @param color 颜色
    */
   public setColor(color: number) {
      var coneMaterial = this.cone.material as MeshBasicMaterial;
      coneMaterial.ambientColor.setInteger(color);
      var lineMaterial = this.line.material as LineBasicMaterial;
      lineMaterial.color.setInteger(color);
   }
}
