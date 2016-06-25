import {AssertUtil} from '../../common/AssertUtil';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {TimerUtil} from '../../common/lang/TimerUtil';
import {Types} from '../../common/lang/Types';
import {Service} from '../Service';
import {ServiceUtil} from '../ServiceUtil';
import {Thread} from './Thread';
import {ThreadStatusEnum} from './ThreadStatusEnum';

//==========================================================
// <T>线程控制台。</T>
//
// @console
// @author maocy
// @version 150105
//==========================================================
export class ThreadService extends Service {
   // 激活标志
   protected _active: boolean;
   // 执行间隔
   protected _interval: number;
   // 线程集合
   protected _threads: Types<Thread>;
   // 句柄
   protected _hHandle;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Global;
      this._active = true;
      this._interval = 5;
      this._threads = new Types<Thread>();
      // 设置回调
      this._hHandle = window.setInterval(this.ohInterval, this._interval);
   }

   //==========================================================
   // <T>获得线程集合。</T>
   //
   // @return 线程集合
   //==========================================================
   public get threads(): Types<Thread> {
      return this._threads;
   }

   //==========================================================
   // <T>间隔回调处理。</T>
   //==========================================================
   public ohInterval() {
      var threadConsole = ServiceUtil.find(ThreadService) as ThreadService;
      // RLogger.debug(threadConsole, 'Frame start ----------------------------');
      threadConsole.processAll();
   }

   //==========================================================
   // <T>增加一个新线程。</T>
   //
   // @param thread 线程
   //==========================================================
   public push(thread: Thread) {
      AssertUtil.debugFalse(this._threads.contains(thread));
      this._threads.push(thread);
   }

   //==========================================================
   // <T>启动一个新线程。</T>
   //
   // @param thread 线程
   //==========================================================
   public start(thread: Thread) {
      AssertUtil.debugNotNull(thread);
      AssertUtil.debugFalse(this._threads.contains(thread));
      thread.start();
      this._threads.push(thread);
   }

   //==========================================================
   // <T>处理一个线程,。</T>
   //
   // @method
   // @param thread 线程
   //==========================================================
   public process(thread: Thread) {
      if (thread) {
         var statusCd = thread.statusCd;
         switch (statusCd) {
            case ThreadStatusEnum.Sleep:
               break;
            case ThreadStatusEnum.Active:
               thread.process(this._interval);
               break;
            case ThreadStatusEnum.Finish:
               this._threads.remove(thread);
               thread.dispose();
               break;
         }
      }
   }

   //==========================================================
   // <T>处理所有线程,。</T>
   //
   // @method
   //==========================================================
   public processAll() {
      // 激活处理
      if (this._active) {
         var threads = this._threads;
         var count = threads.count;
         //try{
         for (var i = 0; i < count; i++) {
            var thread = threads[i];
            this.process(thread);
         }
         //}catch(error){
         //   MO.Logger.fatal(o, error, 'Thread process failure. (thread_count={1})', count);
         //}
      }
      // 更新计时器
      TimerUtil.update();
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      var hHandle = this._hHandle;
      if (hHandle) {
         window.clearInterval(hHandle);
         this._hHandle = null;
      }
      this._threads = ObjectUtil.dispose(this._threads);
      // 父处理
      super.dispose();
   }
}
