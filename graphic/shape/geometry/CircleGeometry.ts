import {Vector2} from '../../../math/Vector2';
import {Vector3} from '../../../math/Vector3';
import {Face3} from '../../core/Face3';
import {Geometry} from '../../core/Geometry';

/**
 * 圆面几何体配置信息。
 */
export class CircleGeometryOptions {
   // 角度
   public radius: number;
   // 分段数
   public segments: number;
   // 角开始
   public thetaStart: number;
   // 角长度
   public thetaLength: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.radius = 50;
      this.segments = 8;
      this.thetaStart = 0;
      this.thetaLength = Math.PI * 2;
   }
}

/**
 * 圆面几何体。
 */
export class CircleGeometry extends Geometry {
   // 配置信息
   public options: CircleGeometryOptions;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置参数
      this.options = new CircleGeometryOptions();
   }

   /**
    * 构建处理。
    */
   public build() {
      // 获得参数
      var options = this.options;
      var radius = options.radius;
      var segments = options.segments;
      var thetaStart = options.thetaStart;
      var thetaLength = options.thetaLength;
      // 计算参数
      var positions = this.positions;
      var normals = this.normals;
      var coords = this.syncCoord();
      // 生成顶点数据
      positions.push(new Vector3(0, 0, 0));
      normals.push(new Vector3(0, 0, 1));
      coords.push(new Vector2(0.5, 0.5));
      for (var s = 0, i = 3, ii = 2; s <= segments; s++ , i += 3, ii += 2) {
         var segment = thetaStart + s / segments * thetaLength;
         var cos = Math.cos(segment);
         var sin = Math.sin(segment);
         positions.push(new Vector3(cos * radius, sin * radius, 0));
         normals.push(new Vector3(0, 0, 1));
         coords.push(new Vector2((cos + 1) * 0.5, (sin + 1) * 0.5));
      }
      // 生成面数据
      var faces = this.faces;
      for (var i = 1; i <= segments; i++) {
         faces.push(new Face3(i, i + 1, 0));
      }
   }
}
