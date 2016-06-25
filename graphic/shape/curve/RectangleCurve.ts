import {Path} from '../brep/Path';

/**
 * 坐标系配置信息。
 */
export class RectangleCurveOptions {
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
 * <T>坐标系。</T>
 *
 *  0 ─ 1
 *  │  │
 *  3 ─ 2
 *
 * @author maocy
 * @version 160506
 */
export class RectangleCurve extends Path {
   // 配置信息
   public options: RectangleCurveOptions;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.options = new RectangleCurveOptions();
   }

   /**
    * 构建处理。
    */
//    public build() {
//       var options = this.options;
//       var left = options.left;
//       var top = options.top;
//       var width = options.width;
//       var height = options.height;
//       // 创建线段1
//       this.moveTo(left, top, 0);
//       this.lineTo(left + width, top, 0);
//       this.lineTo(left + width, top + height, 0);
//       this.lineTo(left, top + height, 0);
//    }
}
