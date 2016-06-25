import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {Box3} from '../../../math/Box3';
import {Vector2} from '../../../math/Vector2';
import {Vector3} from '../../../math/Vector3';
import {Face3} from '../../core/Face3';
import {Geometry} from '../../core/Geometry';

/**
 * 盒子几何体配置信息。
 */
export class BoxGeometryOptions {
   // 宽度
   public width: number;
   // 高度
   public height: number;
   // 深度
   public depth: number;
   // 宽度段数
   public widthSegments: number;
   // 高度段数
   public heightSegments: number;
   // 深度段数
   public depthSegments: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.width = 1;
      this.height = 1;
      this.depth = 1;
      this.widthSegments = 1;
      this.heightSegments = 1;
      this.depthSegments = 1;
   }
}

/**
 * 盒子几何体。
 */
export class BoxGeometry extends Geometry {
   // 配置信息
   public options: BoxGeometryOptions;
   // 顶点数量
   protected _vertexTotal;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置参数
      this.options = new BoxGeometryOptions();
   }

   /**
    * 构建平面处理。
    *
    * @param u U分量
    * @param v V分量
    * @param w W分量
    * @param udir U方向
    * @param vdir V方向
    * @param width 宽度
    * @param height 高度
    * @param depth 深度
    * @param gridX X方向格子
    * @param gridY Y方向格子
    * @param materialIndex 材质索引
    */
   protected buildPlane(u: string, v: string, w: string, udir: number, vdir: number, width: number, height: number, depth: number, gridX: number, gridY: number, color: number, materialIndex: number) {
      var segmentWidth = width / gridX;
      var segmentHeight = height / gridY;
      var widthHalf = width / 2;
      var heightHalf = height / 2;
      var depthHalf = depth / 2;
      var gridXCount = gridX + 1;
      var gridYCount = gridY + 1;
      var vertexCounter = 0;
      var groupCount = 0;
      var positions = this.positions;
      var normals = this.normals;
      var coords = this.syncCoord();
      // 生成顶点数据
      for (var iy = 0; iy < gridYCount; iy++) {
         var y = iy * segmentHeight - heightHalf;
         for (var ix = 0; ix < gridXCount; ix++) {
            var x = ix * segmentWidth - widthHalf;
            // 计算坐标
            positions.push(Vector3.fromUvw(u, x * udir, v, y * vdir, w, depthHalf));
            // 计算法线
            normals.push(Vector3.fromUvw(u, 0, v, 0, w, depth > 0 ? 1 : - 1));
            // 计算纹理
            coords.push(new Vector2(ix / gridX, 1 - (iy / gridY)));
            // 更新计数器
            vertexCounter++;
         }
      }
      // 生成面数据
      var vertexTotal = this._vertexTotal
      var faces = this.faces;
      for (var iy = 0; iy < gridY; iy++) {
         for (var ix = 0; ix < gridX; ix++) {
            // 计算索引
            var a = vertexTotal + ix + gridXCount * iy;
            var b = vertexTotal + ix + gridXCount * (iy + 1);
            var c = vertexTotal + (ix + 1) + gridXCount * (iy + 1);
            var d = vertexTotal + (ix + 1) + gridXCount * iy;
            // 增加面
            this.pushFace(new Face3(a, b, d, null, color, materialIndex));
            this.pushFace(new Face3(b, c, d, null, color, materialIndex));
         }
      }
      // 更新计数器
      this._vertexTotal += vertexCounter;
   }

   /**
    * 构建处理。
    */
   public build() {
      // 获得参数
      var options = this.options;
      var width = options.width;
      var height = options.height;
      var depth = options.depth;
      var widthSegments = options.widthSegments;
      var heightSegments = options.heightSegments;
      var depthSegments = options.depthSegments;
      AssertUtil.debugTrue(Math.floor(widthSegments) == widthSegments);
      AssertUtil.debugTrue(Math.floor(heightSegments) == heightSegments);
      AssertUtil.debugTrue(Math.floor(depthSegments) == depthSegments);
      // 计算数据
      var segments = 0;
      segments += widthSegments * heightSegments * 2;
      segments += widthSegments * depthSegments * 2;
      segments += depthSegments * heightSegments * 2;
      var vertexCount = segments * 4;
      this._vertexTotal = 0;
      // 构建面信息
      this.buildPlane('z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0xFFFF0000, 0);
      this.buildPlane('z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 0xFF800000, 1);
      this.buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 0xFF00FF00, 2);
      this.buildPlane('x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 0xFF008000, 3);
      this.buildPlane('x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 0xFF0000FF, 4);
      this.buildPlane('x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 0xFF000080, 5);
      // 可以更新
      this.dirty();
   }

   /**
    * 构建处理。
    *
    *
    *
    *
    */
   // 创建各个面
   //        09
   //    4 ──  5
   //   ╱│    ╱ │
   // 7 ──  6   │     Z         Y   Z
   // │  │  │   │     │         │ ╱
   // │  0 ─│─  1     o ── X    o ── X
   // │╱    │ ╱      ╱
   // 3  ── 2      Y
   public static create(box3: Box3) {
      // this.width = 1;
      // this.height = 1;
      // this.depth = 1;
      // this.widthSegments = 1;
      // this.heightSegments = 1;
      // this.depthSegments = 1;
   }

   /**
    * 构建处理。
    */
   public static createFromBox3(box3: Box3) {

   }
}
