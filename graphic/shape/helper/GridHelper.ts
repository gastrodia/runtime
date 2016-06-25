import {Vector3} from '../../../math/Vector3';
import {LinesActor} from '../../actor/LinesActor';
import {Lines} from '../../core/Lines';

/**
 * 网格帮助器配置级别。
 */
export class GridHelperOptionsLevel {
   // 步长
   public step: number;
   // 颜色
   public color: number;

   /**
    * 构造处理。
    */
   public constructor(step: number = 1, color: number = 0x808080) {
      this.step = step;
      this.color = color;
   }
}

/**
 * 网格帮助器配置信息。
 */
export class GridHelperOptions {
   // 尺寸
   public size: number;
   // 高度
   public height: number;
   // 级别集合
   public levels: Array<GridHelperOptionsLevel>;

   /**
    * 构造处理。
    */
   public constructor(size: number = 10) {
      this.size = size;
      this.height = 0.01;
      this.levels = new Array<GridHelperOptionsLevel>();
   }
}

/**
 * 网格帮助器。
 */
export class GridHelper extends LinesActor {
   // 配置信息
   public options: GridHelperOptions;
   // 曲线信息
   public lines: Lines;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置参数
      this.options = new GridHelperOptions();
      this.lines = new Lines();
   }

   /**
    * 建立处理。
    */
   public build() {
      var options = this.options;
      var lines = this.lines;
      var size = options.size;
      var sizeHalf = size * 0.5;
      var height = options.height;
      var levels = options.levels;
      var levelCount = levels.length;
      var positions = lines.positions;
      var colors = lines.colors;
      var xs = new Array<number>();
      var ys = new Array<number>();
      for (var j = 0; j < levelCount; j++) {
         var level = levels[j];
         var step = level.step;
         var color = level.color;
         var count = size / step;
         var y = -height - height * j;
         if (step == 0) {
            // 绘制横线
            positions.push(new Vector3(-sizeHalf, y, 0));
            positions.push(new Vector3(sizeHalf, y, 0));
            colors.push(color);
            colors.push(color);
            xs.push(0);
            // 绘制纵线
            positions.push(new Vector3(0, y, -sizeHalf));
            positions.push(new Vector3(0, y, sizeHalf));
            colors.push(color);
            colors.push(color);
            ys.push(0);
         } else {
            // 绘制横线
            for (var i = 0; i <= count; i++) {
               var p = -size * 0.5 + step * i;
               if (xs.indexOf(p) == -1) {
                  positions.push(new Vector3(-sizeHalf, y, p));
                  positions.push(new Vector3(sizeHalf, y, p));
                  colors.push(color);
                  colors.push(color);
                  xs.push(p);
               }
            }
            // 绘制纵线
            for (var i = 0; i <= count; i++) {
               var p = -size * 0.5 + step * i;
               if (ys.indexOf(p) == -1) {
                  positions.push(new Vector3(p, y, -sizeHalf));
                  positions.push(new Vector3(p, y, sizeHalf));
                  colors.push(color);
                  colors.push(color);
                  ys.push(p);
               }
            }
         }
      }
   }
}
