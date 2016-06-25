import {Fatal} from '../common/lang/Fatal';
import {Vector2} from './Vector2';

//============================================================
// <T>二维坐标结构。</T>
//
// @struct
// @author maochunyang
// @version 141230
//============================================================
export class Point2 extends Vector2 {

   //============================================================
   // <T>解析字符串。</T>
   //
   // @param source:String 字符串
   //============================================================
   // public parse(source) {
   //    var o = this;
   //    var items = source.split(',')
   //    if (items.length == 2) {
   //       o.x = parseInt(items[0]);
   //       o.y = parseInt(items[1]);
   //    } else {
   //       throw new Fatal(o, "Parse value failure. (value={1})", source);
   //    }
   // }

   //============================================================
   // <T>解析字符串。</T>
   //
   // @param source:String 字符串
   //============================================================
   public parseFloat(source) {
      var o = this;
      var items = source.split(',')
      if (items.length == 2) {
         o.x = parseFloat(items[0]);
         o.y = parseFloat(items[1]);
      } else {
         throw new Fatal(o, "Parse value failure. (value={1})", source);
      }
   }

   //==========================================================
   // <T>获得克隆对象。</T>
   //
   // @return 克隆对象
   //==========================================================
   public clone() {
      var instance = new Point2();
      instance.x = this.x;
      instance.y = this.y;
      return instance;
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   public toString() {
      return this.x + ',' + this.y;
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   public dispose() {
      this.x = null;
      this.y = null;
   }
}
