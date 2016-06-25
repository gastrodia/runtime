import {MathUtil} from '../../../math/MathUtil';
import {Vector2} from '../../../math/Vector2';
import {Vector3} from '../../../math/Vector3';
import {Face4} from '../../core/Face4';
import {Geometry} from '../../core/Geometry';

/**
 * 球体几何体配置信息。
 */
export class SphereGeometryOptions {
   // 宽度
   public width: number;
   // 高度
   public height: number;
   // 深度
   public depth: number;
   // 分割数量
   public splitCount: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.width = 1;
      this.height = 1;
      this.depth = 1;
      this.splitCount = 8;
   }
}

/**
 * 球体几何体。
 * 
 * @class
 * @author maocy
 * @history 150207
 */
export class SphereGeometry extends Geometry {
   // 配置信息
   public options: SphereGeometryOptions;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置参数
      this.options = new SphereGeometryOptions();
   }

   /**
    * 构建处理。
    */
   public build() {
      // 获得参数
      var options = this.options;
      var splitCount = options.splitCount;
      var positions = this.positions;
      var normals = this.normals;
      var coords = this.syncCoord();
      // 计算坐标
      var countAngle = splitCount * 2;
      var countZ = splitCount;
      var vertexCount = (countZ + 1) * (countAngle + 1);
      var stepAngle = Math.PI * 2 / countAngle;
      var stepZ = Math.PI / countZ;
      for (var rz = 0; rz <= countZ; rz++) {
         for (var r = 0; r <= countAngle; r++) {
            var radius = stepAngle * r - Math.PI;
            var radiusZ = stepZ * rz - MathUtil.PI_2;
            var x = Math.sin(radius) * Math.cos(radiusZ);
            var y = Math.sin(radiusZ);
            var z = -Math.cos(radius) * Math.cos(radiusZ);
            // 计算顶点数据
            positions.push(Vector3.from(x, y, z));
            normals.push(Vector3.from(x, y, z));
            coords.push(Vector2.from(radius / Math.PI / 2 + 0.5, radiusZ / Math.PI - 0.5));
         }
      }
      //..........................................................
      // 计算索引
      var faces = this.faces;
      for (var rz = 0; rz < countZ; rz++) {
         for (var r = 0; r < countAngle; r++) {
            var i = (countAngle + 1) * rz;
            var ci = i + r;
            var ni = i + r + (countAngle + 1);
            faces.push(new Face4(ci, ni, ci + 1, ni + 1));
         }
      }
      // 可以更新
      this.dirty();
   }
}
