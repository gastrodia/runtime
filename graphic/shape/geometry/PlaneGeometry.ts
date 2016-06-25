import {Fatal} from '../../../common/lang/Fatal';
import {Vector2} from '../../../math/Vector2';
import {Vector3} from '../../../math/Vector3';
import {Face3} from '../../core/Face3';
import {Geometry} from '../../core/Geometry';

/**
 * 平面几何体配置信息。
 */
export class PlaneGeometryOptions {
   // 面类型
   public faceCd: string;
   // 左位置
   public left: number;
   // 上位置
   public top: number;
   // 宽度
   public width: number;
   // 高度
   public height: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.left = -1;
      this.top = -1;
      this.width = 2;
      this.height = 2;
   }
}

/**
 * 平面几何体。
 *  0 ─ 1
 *  │  │
 *  3 ─ 2
 *
 * @author maocy
 * @history 160506
 */
export class PlaneGeometry extends Geometry {
   // 配置信息
   public options: PlaneGeometryOptions;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置参数
      this.options = new PlaneGeometryOptions();
   }

   /**
    * 构建平面处理。
    *
    * @param u U分量
    * @param v V分量
    * @param w W分量
    * @param udir U方向
    * @param vdir V方向
    */
   protected buildPlane(u: string, v: string, w: string, udir: number, vdir: number) {
      var options = this.options;
      var vertexCounter = 0;
      var groupCount = 0;
      var positions = this.positions;
      var normals = this.normals;
      var coords = this.syncCoord();
      // 计算坐标
      positions.push(Vector3.fromUvw(u, options.left, v, options.top, w, 0));
      positions.push(Vector3.fromUvw(u, options.left + options.width * udir, v, options.top, w, 0));
      positions.push(Vector3.fromUvw(u, options.left + options.width * udir, v, options.top + options.height * vdir, w, 0));
      positions.push(Vector3.fromUvw(u, options.left, v, options.top + options.height * vdir, w, 0));
      // 计算UV
      coords.push(new Vector2(0, 0));
      coords.push(new Vector2(0, 1));
      coords.push(new Vector2(1, 1));
      coords.push(new Vector2(1, 0));
      // 增加面
      this.pushFace(new Face3(0, 1, 2));
      this.pushFace(new Face3(0, 2, 3));
   }

   /**
    * 构建处理。
    */
   public build() {
      switch (this.options.faceCd) {
         case 'xy':
            this.buildPlane('x', 'y', 'z', 1, 1);
         case 'xz':
            this.buildPlane('x', 'z', 'y', 1, 1);
         case 'yz':
            this.buildPlane('y', 'z', 'x', 1, 1);
         default:
            throw new Fatal(this, 'Invalid facecd.');
      }
   }
}
