import {ObjectBase} from '../../common/lang/ObjectBase';
import {ResultEnum} from '../../common/lang/ResultEnum';
import {ThreadStatusEnum} from './ThreadStatusEnum';

//==========================================================
// <T>线程。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
export abstract class Thread extends ObjectBase {
   // 名称
   public name: string;
   // 延时
   public delay: number;
   // 间隔
   public interval: number;
   // 状态
   public statusCd: ThreadStatusEnum;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.delay = 0;
      this.interval = 100;
      this.statusCd = ThreadStatusEnum.Sleep;
   }

   //==========================================================
   // <T>启动处理。</T>
   //
   // @method
   //==========================================================
   public start() {
      this.statusCd = ThreadStatusEnum.Active;
   }

   //==========================================================
   // <T>停止处理。</T>
   //
   // @method
   //==========================================================
   public stop() {
      this.statusCd = ThreadStatusEnum.Finish;
   }

   //==========================================================
   // <T>调用处理。</T>
   //
   // @return 处理结果
   //==========================================================
   public abstract onProcess(): ResultEnum;

   //==========================================================
   // <T>调用处理。</T>
   //
   // @param interval:integer 调用间隔
   //==========================================================
   public process(interval: number) {
      if (this.delay <= 0) {
         this.onProcess();
      } else {
         this.delay -= interval;
      }
   }
}
