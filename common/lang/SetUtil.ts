//============================================================
// <T>集合管理类。</T>
//
// @reference
// @author maocy
// @version 141231
//============================================================
export class SetUtil {
   //===========================================================
   // <T>内容中是否含有指定数据。</T>
   //
   // @param source:Integer 内容
   // @param value:Integer 数据
   // @return Boolean 是否含有
   //===========================================================
   public static contains(source, value) {
      return (source & value) == value;
   }

   //===========================================================
   // <T>内容中是否含有指定数据。</T>
   //
   // @param source:String 内容
   // @param value:String 数据
   // @return Boolean 是否含有
   //===========================================================
   public static containsString(source, value) {
      if ((source != null) && (value != null)) {
         return source.indexOf(value) != -1;
      }
      return false;
   }
}
