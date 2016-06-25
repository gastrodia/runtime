import {CurvePath} from '../brep/CurvePath';
import {LineCurve} from './LineCurve';

/**
 * 坐标系配置信息。
 */
export class DimensionalCurveOptions {
   // 宽度
   public width: number;
   // 高度
   public height: number;
   // 格子宽度
   public cellWidth: number;
   // 格子高度
   public cellHeight: number;
   // 线颜色
   public lineColor: number;
   // X轴颜色
   public axisXColor: number;
   // Y轴颜色
   public axisYColor: number;
   // Z轴颜色
   public axisZColor: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.width = 16;
      this.height = 16;
      this.cellWidth = 1;
      this.cellHeight = 1;
      this.lineColor = 0xFF808080;
      this.axisXColor = 0xFFFF0000;
      this.axisYColor = 0xFF00FF00;
      this.axisZColor = 0xFF0000FF;
   }
}

/**
 * <T>坐标系。</T>
 *
 *  + ─  + ─  2 ─  +  ─ +
 *  │    │    │    │    │
 *  + ─  + ─  1 ─  + ─  +
 *  │    │    │    │    │
 * -2 ─ -1 ─  0 ─  1 ─  2 (中线)
 *  │    │    │    │    │
 *  + ─  + ─ -1 ─  + ─  +
 *  │    │    │    │    │
 *  + ─  + ─ -2 ─  + ─  +
 *          (中线)
 *
 *
 * @author maocy
 * @version 160422
 */
export class DimensionalCurve extends CurvePath {
   /** 配置信息 */
   public options: DimensionalCurveOptions;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.options = new DimensionalCurveOptions();
   }
   public getPoint(t) {

   }
   /**
    * 构建处理。
    */
//    public build() {
//       var options = this.options;
//       // 设置变量
//       var cellWidth = options.cellWidth;
//       var cellHeight = options.cellHeight;
//       var width = options.width;
//       var width2 = width / 2;
//       var height = options.height;
//       var height2 = height / 2;
//       // 填充横线数据
//       for (var i = 0; i <= height; i++) {
//          var z = cellHeight * (i - height2);
//          // 创建线段
//          if (i == height2) {
//             var line = new LineCurve();
//             line.begin.set(cellWidth * -(width2 + 1), 0, z);
//             line.end.set(0, 0, z);
//             line.color = options.lineColor;
//             this.add(line);
//             var line = new LineCurve();
//             line.begin.set(0, 0, z);
//             line.end.set(cellWidth * (width2 + 1), 0, z);
//             line.color = options.axisXColor;
//             this.add(line);
//          } else {
//             var line = new LineCurve();
//             line.begin.set(cellWidth * -width2, 0, z);
//             line.end.set(cellWidth * width2, 0, z);
//             line.color = options.lineColor;
//             this.add(line);
//          }
//       }
//       // 填充纵线数据
//       for (var i = 0; i <= width; i++) {
//          var x = cellWidth * (i - width2);
//          // 创建线段
//          if (i == width2) {
//             var line = new LineCurve();
//             line.begin.set(x, 0, cellHeight * - (height2 + 1));
//             line.end.set(x, 0, 0);
//             line.color = options.lineColor;
//             this.add(line);
//             var line = new LineCurve();
//             line.begin.set(x, 0, 0);
//             line.end.set(x, 0, cellHeight * (height2 + 1));
//             line.color = options.axisZColor;
//             this.add(line);
//          } else {
//             var line = new LineCurve();
//             line.begin.set(x, 0, cellHeight * - height2);
//             line.end.set(x, 0, cellHeight * height2);
//             line.color = options.lineColor;
//             this.add(line);
//          }
//       }
//       // 填充Y轴
//       var line = new LineCurve();
//       line.begin.set(0, 0, 0);
//       line.end.set(0, cellHeight * (height2 + 1), 0);
//       line.color = options.axisYColor;
//       this.add(line);
//    }
}
