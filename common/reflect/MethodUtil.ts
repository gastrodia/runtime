import {RuntimeUtil} from '../RuntimeUtil';

//==========================================================
// <T>对象类的函数处理的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class MethodUtil {
   //==========================================================
   // <T>获得函数的字符串名称。</T>
   //
   // @param value 函数对象
   // @return 字符串名称
   //==========================================================
   public static shortName(value: any): string {
      var result: string = null;
      if (value) {
         if (typeof (value) == 'function') {
            if (value.__shortName) {
               return value.__shortName;
            } else {
               result = value.__shortName = RuntimeUtil.className(value);
            }
         }
      }
      return result;
   }

   // @attribute
   /*static _virtuals: any = new Object();
   static _properties: any = new Object();

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public static construct() {
      (this.empty as any).__empty = true;
      (this.emptyTrue as any).__empty = true;
      (this.emptyFalse as any).__empty = true;
   }

   //==========================================================
   // <T>测试对象是否是为函数。</T>
   //
   // @method
   // @param value:Object 函数对象
   // @return Boolean 否是为函数
   //==========================================================
   public static isFunction(value) {
      return typeof (value) == 'function';
   }

   //==========================================================
   // <T>测试对象是否是为空函数。</T>
   //
   // @method
   // @param value:Object 函数对象
   // @return Boolean 否是为空函数
   //==========================================================
   public static isEmpty(value) {
      return (value && value.__empty);
   }

   //==========================================================
   // <T>测试对象是否是为虚函数。</T>
   //
   // @method
   // @param value:Object 函数对象
   // @return Boolean 否是为虚函数
   //==========================================================
   public static isVirtual(value) {
      return (value && value.__virtual);
   }

   //==========================================================
   // <T>获得含有参数信息的函数的字符串名称。</T>
   //
   // @method
   // @param value:Function 函数对象
   // @return String 字符串名称
   //==========================================================
   public static fullName(value) {
      if (value && (value.constructor == Function)) {
         if (value.__fullname) {
            return value.__fullname;
         }
         var source = value.toString();
         var name = value.__fullname = RString.mid(source, 'function ', ')') + ')';
         return name;
      }
      return null;
   }

   //==========================================================
   // <T>没有返回值的空函数定义。</T>
   //
   // @method
   //==========================================================
   public static empty() {
   }

   //==========================================================
   // <T>返回值为真的空函数定义。</T>
   //
   // @method
   // @return Boolean 真值
   //==========================================================
   public static emptyTrue() {
      return true;
   }

   //==========================================================
   // <T>返回值为假的空函数定义。</T>
   //
   // @method
   // @return Boolean 假值
   //==========================================================
   public static emptyFalse() {
      return false;
   }

   //==========================================================
   // <T>空调用。</T>
   //
   // @method
   // @return Boolean 假值
   //==========================================================
   public static emptyCall() {
   }

   //==========================================================
   // <T>创建一个虚函数。</T>
   //
   // @method
   // @param value:Object 对象实例
   // @param name:String 函数名称
   // @return Function 虚函数
   //==========================================================
   public static virtual(value, name) {
      var o = this;
      var method = null;
      var code = RClass.shortName(value) + '.' + name;
      var virtuals = o._virtuals;
      if (virtuals[code]) {
         method = virtuals[code];
      } else {
         // 创建函数对象
         var source = 'throw new Error(\'Virtual method be called.(' + code + ')\');';
         method = new Function(source);
         method.__virtual = true;
         method.__name = code;
         virtuals[code] = method;
      }
      return method;
   }

   //==========================================================
   // <T>创建一个虚函数。</T>
   //
   // @method
   // @param clazz:TClass 类对象
   // @param name:String 函数名称
   // @return Function 虚函数
   //==========================================================
   public static makeVirtual(clazz, name) {
      var o = this;
      var method = null;
      var code = clazz.name + '.' + name;
      var virtuals = o._virtuals;
      if (virtuals[code]) {
         method = virtuals[code];
      } else {
         // 创建函数对象
         var source = 'throw new Error(\'Virtual method be called.(' + code + ')\');';
         method = new Function(source);
         method.__virtual = true;
         method.__name = code;
         virtuals[code] = method;
      }
      return method;
   }

   //==========================================================
   // <T>创建或获得一个属性获取函数。</T>
   //
   // @method
   // @param name:String 变量名称
   // @param methodName:String 函数名称
   // @return Function 函数
   //==========================================================
   public static makePropertyGet(name, methodName) {
      var o = this;
      var code = name + '|' + methodName;
      var method = null;
      if (o._properties[code]) {
         method = o._properties[code];
      } else {
         // 创建函数对象
         var source = 'return this.' + name + ';';
         method = new Function(source);
         o._properties[code] = method;
      }
      return method;
   }

   //==========================================================
   // <T>创建或获得一个属性设置函数。</T>
   //
   // @method
   // @param name:String 变量名称
   // @param methodName:String 函数名称
   // @return Function 函数
   //==========================================================
   public static makePropertySet(name, methodName) {
      var o = this;
      var code = name + '|' + methodName;
      var method = null;
      if (o._properties[code]) {
         method = o._properties[code];
      } else {
         // 创建函数对象
         var source = 'this.' + name + '=value;';
         method = new Function('value', source);
         o._properties[code] = method;
      }
      return method;
   }*/

   //==========================================================
   // <T>结构回收处理。</T>
   //==========================================================
   public static structFree() {
      for (var name in this) {
         if (name.indexOf('__') == 0) {
            continue;
         }
         var value: any = this[name];
         if (value != null) {
            if (value.constructor != Function) {
               this[name] = null;
            }
         }
      }
   }

   //==========================================================
   // <T>结构释放处理。</T>
   //==========================================================
   public static structDispose() {
      for (var name in this) {
         var value: any = this[name];
         if (value != null) {
            if (!Object.prototype.isPrototypeOf(value)) {
               this[name] = null;
            }
         }
      }
   }
}
