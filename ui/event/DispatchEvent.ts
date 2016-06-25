import {EventInvokeEnum} from '../EventInvokeEnum';

//==========================================================
// <T>事件处理类。</T>
//
// @tool
// @param owner:Object 拥有者
// @param invokeName:String 函数名称
// @param clazz:Function 类名称
// @author maocy
// @version 141231
//==========================================================
export class DispatchEvent {

   public owner: any;
   public invoke: string;
   public invokeCd: EventInvokeEnum;
   public clazz: Function;
   public parameters: any;

   public constructor() {
   }

   //==========================================================
   // <T>测试是否是事件前处理。</T>
   // 
   // @return Boolean 事件前处理
   //==========================================================
   public isBefore() {
      return this.invokeCd == EventInvokeEnum.Before;
   }

   //==========================================================
   // <T>测试是否是事件后处理。</T>
   // 
   // @return Boolean 事件后处理
   //==========================================================
   public isAfter() {
      return this.invokeCd == EventInvokeEnum.After;
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.owner = null;
      this.invoke = null;
      this.clazz = null;
      this.invokeCd = null;
   }

   //==========================================================
   // <T>获取事件对象的运行信息。</T>
   // 
   // @method
   // @return String 运行信息
   //==========================================================
   public dump() {
      //return MO.Class.dump(this) + ':owner=' + this.owner + ',type=' + this.type + '.invoke=' + MO.Method.name(this.invoke);
   }
}
