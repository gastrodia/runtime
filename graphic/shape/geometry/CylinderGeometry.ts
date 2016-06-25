import {Vector2} from '../../../math/Vector2';
import {Vector3} from '../../../math/Vector3';
import {Face3} from '../../core/Face3';
import {Face4} from '../../core/Face4';
import {Geometry} from '../../core/Geometry';

/**
 * 圆柱几何体配置信息。
 */
export class CylinderGeometryOptions {
   // 是否封口
   public openEnded: boolean;
   // 顶部角度
   public radiusTop: number;
   // 底部角度
   public radiusBottom: number;
   // 角度分段数
   public radialSegments: number;
   // 高度分段数
   public heightSegments: number;
   // 高度
   public height: number;
   // 角度开始
   public thetaStart: number;
   // 角度长度
   public thetaLength: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.openEnded = false;
      this.radiusTop = 10;
      this.radiusBottom = 10;
      this.radialSegments = 16;
      this.heightSegments = 1;
      this.height = 20;
      this.thetaStart = 0;
      this.thetaLength = Math.PI * 2;
   }

   public set(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
   }
}

/**
 * 圆柱几何体。
 * 如果顶部或底部角度为0，可以生成圆锥。
 */
export class CylinderGeometry extends Geometry {
   // 配置信息
   public options: CylinderGeometryOptions;
   // 顶点索引位置
   protected _vertexIndex: number;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置参数
      this.options = new CylinderGeometryOptions();
   }

   /**
    * 生成躯干数据。
    */
   protected generateTorso() {
      // 获得配置
      var options = this.options;
      var radiusTop = options.radiusTop;
      var radiusBottom = options.radiusBottom;
      var radialSegments = options.radialSegments;
      var heightSegments = options.heightSegments;
      var height = options.height;
      var thetaStart = options.thetaStart;
      var thetaLength = options.thetaLength;
      // 获得参数
      var positions = this.positions;
      var normals = this.normals;
      var coords = this.syncCoord();
      var halfHeight = height / 2;
      // 生成顶点数据
      var indexArray = new Array<Array<number>>();
      var tanTheta = (radiusBottom - radiusTop) / height;
      for (var y = 0; y <= heightSegments; y++) {
         var indexRow = [];
         var v = y / heightSegments;
         var radius = v * (radiusBottom - radiusTop) + radiusTop;
         for (var x = 0; x <= radialSegments; x++) {
            var u = x / radialSegments;
            var cx = radius * Math.sin(u * thetaLength + thetaStart);
            var cy = - v * height + halfHeight;
            var cz = radius * Math.cos(u * thetaLength + thetaStart);
            // 计算坐标
            positions.push(new Vector3(cx, cy, cz));
            // 计算法线
            var normal = new Vector3(cx, cy, cz);
            if ((radiusTop == 0 && y == 0) || (radiusBottom == 0 && y == heightSegments)) {
               normal.x = Math.sin(u * thetaLength + thetaStart);
               normal.z = Math.cos(u * thetaLength + thetaStart);
            }
            normal.setY(Math.sqrt(normal.x * normal.x + normal.z * normal.z) * tanTheta);
            normals.push(normal.normalize());
            // 计算纹理
            coords.push(new Vector2(u, 1 - v));
            indexRow.push(this._vertexIndex);
            this._vertexIndex++;
         }
         indexArray.push(indexRow);
      }
      // 生成面数据
      var faces = this.faces;
      for (var x = 0; x < radialSegments; x++) {
         for (var y = 0; y < heightSegments; y++) {
            // 计算索引
            var i1 = indexArray[y][x];
            var i2 = indexArray[y + 1][x];
            var i3 = indexArray[y + 1][x + 1];
            var i4 = indexArray[y][x + 1];
            // 增加面
            faces.push(new Face4(i1, i2, i3, i4));
         }
      }
   }

   /**
    * 生成盖子数据。
    */
   protected generateCap(faceTop: boolean) {
      // 获得配置
      var options = this.options;
      var radiusTop = options.radiusTop;
      var radiusBottom = options.radiusBottom;
      var radialSegments = options.radialSegments;
      var height = options.height;
      var thetaStart = options.thetaStart;
      var thetaLength = options.thetaLength;
      // 获得参数
      var positions = this.positions;
      var normals = this.normals;
      var coords = this.syncCoord();
      var halfHeight = height / 2;
      // 生成顶点数据
      var uv = new Vector2();
      var vertex = new Vector3();
      var radius = (faceTop === true) ? radiusTop : radiusBottom;
      var sign = (faceTop === true) ? 1 : - 1;
      var centerIndexStart = this._vertexIndex;
      for (var x = 1; x <= radialSegments; x++) {
         // 计算坐标
         positions.push(new Vector3(0, halfHeight * sign, 0));
         // 计算法线
         normals.push(new Vector3(0, sign, 0));
         if (faceTop) {
            uv.x = x / radialSegments;
            uv.y = 0;
         } else {
            uv.x = (x - 1) / radialSegments;
            uv.y = 1;
         }
         // 计算纹理
         coords.push(new Vector2(uv.x, uv.y));
         // 调整索引
         this._vertexIndex++;
      }
      var centerIndexEnd = this._vertexIndex;
      for (var x = 0; x <= radialSegments; x++) {
         var u = x / radialSegments;
         // 计算坐标
         var position = new Vector3();
         position.x = radius * Math.sin(u * thetaLength + thetaStart);
         position.y = halfHeight * sign;
         position.z = radius * Math.cos(u * thetaLength + thetaStart);
         positions.push(position);
         // 计算法线
         normals.push(new Vector3(0, sign, 0));
         // 计算纹理
         coords.push(new Vector2(u, faceTop ? 1 : 0));
         // 调整索引
         this._vertexIndex++;
      }
      // 生成面数据
      var faces = this.faces;
      for (x = 0; x < radialSegments; x++) {
         var c = centerIndexStart + x;
         var i = centerIndexEnd + x;
         if (faceTop) {
            // 生成上面数据
            faces.push(new Face3(i, i + 1, c));
         } else {
            // 生成下面数据
            faces.push(new Face3(i + 1, i, c));
         }
      }
   }

   public build() {
      // 获得参数
      var options = this.options;
      var openEnded = options.openEnded;
      var radiusTop = options.radiusTop;
      var radiusBottom = options.radiusBottom;
      // 计算参数
      this._vertexIndex = 0;
      // 生成躯干
      this.generateTorso();
      if (!openEnded) {
         // 生成上盖子
         if (radiusTop > 0) {
            this.generateCap(true);
         }
         // 生成下盖子
         if (radiusBottom > 0) {
            this.generateCap(false);
         }
      }
      this.dirty();
   }
}
