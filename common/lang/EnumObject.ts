//============================================================
// <T>枚举基类。</T>
//
// @reference
// @author maocy
// @version 150730
//============================================================
export class EnumObject {
   //============================================================
   // <T>获得显示内容。</T>
   //
   // @method
   // @param value:Object 内容
   // @param defaultValue:String 缺省内容
   // @return String 显示内容
   //============================================================
   public static toDisplay(value: any, defaultValue: string): string {
      for (var name in this) {
         var nameValue: String = this[name];
         if (nameValue.constructor != Function) {
            if (nameValue == value) {
               return name;
            }
         }
      }
      return defaultValue;
   }

   //============================================================
   // <T>获得数据内容。</T>
   //
   // @method
   // @param value:Object 描述
   // @param defaultValue:Object 缺省描述
   // @return Object 数据内容
   //============================================================
   public static toValue(value: string, defaultValue: any): any {
      var lowerValue = value.toLowerCase();
      for (var name in this) {
         var nameValue = this[name];
         if (nameValue.constructor != Function) {
            if (name.toLowerCase() == lowerValue) {
               return this[name];
            }
         }
      }
      return defaultValue;
   }
}
