import {Objects} from '../../common/lang/Objects';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {Linker} from '../../common/reflect/Linker';
import {Service} from '../Service';
import {InvokeThread} from './InvokeThread';
import {Moniter} from './Moniter';
import {ThreadService} from './ThreadService';
import {ThreadStatusEnum} from './ThreadStatusEnum';

//==========================================================
// <T>定时器控制台。</T>
//
// @console
// @author maocy
// @version 150105
//==========================================================
export class MoniterService extends Service {
   // 定时器集合
   protected _moniters: Objects<Moniter>;
   // 调用线程
   protected _invokeThread: InvokeThread;
   // 线程集合
   @Linker(ThreadService)
   protected _threadService: ThreadService;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this._scopeCd = ScopeEnum.Global;
      //this._invokeThread = new InvokeThread(this, this.process);
      // this._threadService.start(this._invokeThread);
   }

   //==========================================================
   // <T>获得定时器集合。</T>
   //
   // @return 定时器集合
   //==========================================================
   public get moniter(): Objects<Moniter> {
      return this._moniters;
   }

   //==========================================================
   // <T>增加一个定时器。</T>
   //
   // @param moniter 定时器
   //==========================================================
   public push(moniter: Moniter) {
      this._moniters.push(moniter);
      // this._threadService.push(moniter);
   }

   // //==========================================================
   // // <T>启动一个新线程。</T>
   // //
   // // @method
   // // @param thread:FThread 线程
   // //==========================================================
   // public start(moniter: Moniter) {
   //    moniter.start();
   //    this._moniters.push(moniter);
   //    this._threadService.push(moniter);
   // }

   // //==========================================================
   // // <T>处理一个线程,。</T>
   // //
   // // @method
   // // @param thread 线程
   // //==========================================================
   // public process(thread: Thread) {
   //    if (thread) {
   //       var statusCd = thread.statusCd;
   //       switch (statusCd) {
   //          case ThreadStatusEnum.Sleep:
   //             break;
   //          case ThreadStatusEnum.Active:
   //             thread.process(this._interval);
   //             break;
   //          case ThreadStatusEnum.Finish:
   //             this._moniters.remove(thread);
   //             thread.dispose();
   //             break;
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>处理所有线程,。</T>
   // //
   // // @method
   // //==========================================================
   // public processAll() {
   //    // 激活处理
   //    if (this._active) {
   //       var threads: Objects<Thread> = this._moniters;
   //       var count: number = threads.count();
   //       //try{
   //       for (var n: number = 0; n < count; n++) {
   //          var thread: Thread = threads.at(n);
   //          this.process(thread);
   //       }
   //       //}catch(error){
   //       //   MO.Logger.fatal(o, error, 'Thread process failure. (thread_count={1})', count);
   //       //}
   //    }
   //    // 安装下一帧处理
   //    //if (o._requestFlag) {
   //    //MO.Window.requestAnimationFrame(o.ohInterval);
   //    //}
   // }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      //if (this._requestFlag) {
      //MO.Window.cancelRequestAnimationFrame(o.ohInterval);
      //} else {
      //var hIntervalId = o._hIntervalId;
      //if (hIntervalId) {
      //MO.Window.htmlWindow().clearInterval(hIntervalId);
      //o._hIntervalId = null;
      //}
      //}
      //o._threads = MO.Lang.Object.dispose(o._threads);
      // 父处理
      super.dispose();
   }
}
