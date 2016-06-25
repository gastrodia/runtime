import {RuntimeUtil} from '../RuntimeUtil';
import {ClassUtil} from '../reflect/ClassUtil';
import {Fatal} from './Fatal';

//==========================================================
// <T>对象管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class ObjectUtil {
   //==========================================================
   // <T>获得第一个非空对象。</T>
   //
   // @method
   // @param v:values:Object[] 对象集合
   // @return Object 非空对象
   //==========================================================
   public static nvl(...values: Array<any>) {
      var count = values.length;
      for (var n: number = 0; n < count; n++) {
         if (values[n] != null) {
            return values[n];
         }
      }
      return null;
   }

   //==========================================================
   // <T>生成一个克隆对象。</T>
   //
   // @param item 对象
   // @return 克隆对象
   //==========================================================
   public static clone(item: any): any {
      var result = new item.constructor();
      for (var name in item) {
         result[name] = item[name];
      }
      return result;
   }

   //==========================================================
   // <T>生成一个克隆对象。</T>
   //
   // @param item 对象
   // @return 克隆对象
   //==========================================================
   public static deepClone(item: any): any {
      var result = new item.constructor();
      for (var name in item) {
         var value = item[name];
         if (value != null) {
            if (!ClassUtil.isBaseType(value.constructor)) {
               value = this.clone(value);
            }
         }
         result[name] = value;
      }
      return result;
   }

   /**
    * 复制一个对象数据。
    *
    * @param source 来源对象
    * @param target 目标对象
    */
   public static copy(source: any, target: any) {
      if ((source != null) && (target != null)) {
         for (var name in source) {
            target[name] = source[name];
         }
      }
   }

   /**
    * 深层复制一个对象数据。
    *
    * @param source 来源对象
    * @param target 目标对象
    */
   public static deepCopy(source: any, target: any) {
      if ((source != null) && (target != null)) {
         for (var name in source) {
            var value = source[name];
            if (value != null) {
               var clazz = value.constructor;
               if (!ClassUtil.isBaseType(clazz)) {
                  if (target[name] == null) {
                     target[name] = new clazz();
                  }
                  this.copy(value, target[name]);
               }
            }
            target[name] = value;
         }
      }
   }

   //==========================================================
   // <T>释放一个对象。</T>
   // <P>不递归释放，只清空当前层属性。</P>
   //
   // @method
   // @param item:Object 对象
   //==========================================================
   public static free(item): any {
      if (item) {
         if (RuntimeUtil.isDebug()) {
            // 调试模式
            for (var name in item) {
               // 基础类型
               if ((name == '__base') || (name == '__inherits') || (name == '__class')) {
                  item[name] = null;
                  continue;
               }
               // 检查类型
               var value = item[name];
               if (value != null) {
                  if (!ClassUtil.isBaseType(value.constructor)) {
                     throw new Fatal(this, 'Free object is not base object.');
                  }
                  item[name] = null;
               }
            }
         } else {
            // 运行模式
            for (var name in item) {
               item[name] = null;
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>释放一个对象。</T>
   //
   // @method
   // @param item:Object 对象
   // @param flag:Boolean 标志
   //==========================================================
   public static dispose(item, flag: boolean = false) {
      if (item) {
         if (!item.__dispose) {
            item.dispose(flag);
            item.__dispose = true;
         } else {
            throw new Fatal(this, 'Object has disposed.');
         }
      }
      return null;
   }

   //==========================================================
   // <T>释放一个对象。</T>
   // <P>递归释放所有对象。</P>
   //
   // @method
   // @param item:Object 对象
   //==========================================================
   public static release(item) {
      if (item) {
         for (var name in item) {
            var value = item[name];
            if (typeof (value) == 'Object') {
               this.release(value)
            }
            item[name] = null;
         }
      }
      return null;
   }
}
