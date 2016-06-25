import {ResultEnum} from '../../common/lang/ResultEnum';
import {Thread} from './Thread';

//==========================================================
// <T>监听线程。</T>
//
// @class
// @author maocy
// @version 160306
//==========================================================
export class InvokeThread extends Thread {
   // 拥有着
   public owner: any;
   // 回调处理
   public callback: Function;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @param owner 调用者
   // @param callback 回调处理
   //==========================================================
   public constructor(owner: any, callback: Function, interval?: number) {
      super();
      this.owner = owner;
      this.callback = callback;
      if (interval != null) {
         this.interval = interval;
      }
   }

   //==========================================================
   // <T>调用处理。</T>
   //
   // @return 处理结果
   //==========================================================
   public onProcess(): ResultEnum {
      this.callback.call(this.owner);
      return ResultEnum.Success;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放处理
      this.owner = null;
      this.callback = null;
      // 父处理
      super.dispose();
   }
}
