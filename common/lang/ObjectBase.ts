import {Class} from '../reflect/Class';
import {ClassUtil} from '../reflect/ClassUtil';
import {Base} from './Base';

//==========================================================
// <T>所有可继承对象的基类。</T>
// <P>支持类的判断、获取内部运行信息的功能。</P>
//
// @class
// @author maocy
// @version 141230
//==========================================================
export class ObjectBase extends Base {
   // 类对象
   protected __class: Class;

   //==========================================================
   // <T>获取当前实例的信息。</T>
   //
   // @return 信息字符串
   //==========================================================
   public getClass(): Class {
      var clazz = this.__class;
      if (!clazz) {
         clazz = this.__class = ClassUtil.get(this.constructor);
      }
      return clazz;
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @param flag 全部释放标志
   //==========================================================
   public dispose(flag: boolean = false): void {
      this.__class = null;
      // 父处理
      super.dispose(flag);
   }
}
