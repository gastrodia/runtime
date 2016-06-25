import {RuntimeUtil} from '../RuntimeUtil';
import {HashMap} from './HashMap';
import {StringBuffer} from './StringBuffer';

//==========================================================
// <T>名称和内容的关联保存表的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class Dictionary<V> extends HashMap<string, V> {
   //==========================================================
   // <T>按照名称排序。</T>
   //
   // @method
   //==========================================================
   public sortByName(comparer, parameters) {
      RuntimeUtil.pairSort(this._names, this._values, 0, this._count, comparer, parameters);
      this.rebuild();
   }

   //==========================================================
   // <T>将内部所有名称关联成一个字符串。</T>
   //
   // @method
   // @param split:String 分隔符
   // @return String 字符串
   //==========================================================
   public joinName(split) {
      var source = new StringBuffer();
      var count = this._count;
      for (var i: number = 0; i < count; i++) {
         if (i > 0) {
            source.append(split);
         }
         source.append(this._names[i]);
      }
      return source.flush();
   }

   //==========================================================
   // <T>获得数组的内部信息。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public dump(): string {
      var o = this;
      var result: StringBuffer = new StringBuffer();
      var count = o._count;
      result.append(RuntimeUtil.className(o), ': ', count);
      if (count > 0) {
         var names = o._names;
         var values = o._values;
         result.append(' {\n');
         for (var i = 0; i < count; i++) {
            result.append('   ', names[i], '=[', values[i], ']\n');
         }
         result.append('}');
      }
      return result.flush();
   }
}
