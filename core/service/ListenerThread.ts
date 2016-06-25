import {Listeners} from '../../common/lang/Listeners';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ResultEnum} from '../../common/lang/ResultEnum';
import {Thread} from './Thread';

//==========================================================
// <T>监听线程。</T>
//
// @class
// @author maocy
// @version 160306
//==========================================================
export class ListenerThread extends Thread {
   // 处理监听集合
   public processListeners: Listeners;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.processListeners = new Listeners(this);
   }

   //==========================================================
   // <T>调用处理。</T>
   //
   // @return 处理结果
   //==========================================================
   public onProcess(): ResultEnum {
      this.processListeners.process();
      return ResultEnum.Success;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放处理
      this.processListeners = ObjectUtil.dispose(this.processListeners);
      // 父处理
      super.dispose();
   }
}
