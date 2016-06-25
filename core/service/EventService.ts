import {MemoryUtil} from '../../common/MemoryUtil';
import {Listener} from '../../common/lang/Listener';
import {ListenerContext} from '../../common/lang/ListenerContext';
import {LoggerUtil} from '../../common/lang/LoggerUtil';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {Objects} from '../../common/lang/Objects';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Linker} from '../../common/reflect/Linker';
import {Service} from '../Service';
import {ListenerThread} from './ListenerThread';
import {ThreadService} from './ThreadService';

//==========================================================
// <T>环境控制台。</T>
//
// @console
// @author maocy
// @version 150606
//==========================================================
export class EventService extends Service {
   // 线程控制台
   @Linker(ThreadService)
   public _threadConsole: ThreadService = null;
   // 线程对象
   protected _thread: ListenerThread = null;
   // 处理间隔
   protected _interval: number = 50;
   // 处理事件集合(对事件中产生的事件排队)
   public _processEvents = null;
   // 事件集合
   public _events = null;

   //==========================================================
   // <T>检验传入值是否是整型值。</T>
   //
   // @method
   // @param v:value:String 待检验的字符串
   // @return Boolean 是否整数
   //==========================================================
   public static listenerProcess(context: ListenerContext) {
      context.process();
      MemoryUtil.free(event);
   }

   //==========================================================
   // <T>静态构造处理。</T>
   //==========================================================
   // public static initialize() {
      //var eventConsole = RClass.getInstance(FEventConsole);
      //RListener.process = (context: SListenerContext) => {
         // eventConsole._events.push(context);
      //};
   // }

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      // 创建属性
      this._processEvents = new Objects<any>();
      this._events = new Objects<any>();
      // 创建线程
      var thread: ListenerThread = this._thread = ClassUtil.create(ListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.onProcess);
      this._threadConsole.start(thread);
      LoggerUtil.debug(this, 'Add event thread. (thread={1})', ClassUtil.dump(thread));
   }

   //==========================================================
   // <T>事件后台处理。</T>
   //
   // @param context 环境
   // @param parameters 参数集合
   //==========================================================
   public onProcess(context: ListenerContext, parameters: any) {
      // 检查数据
      var events = this._events;
      if (events.isEmpty()) {
         return;
      }
      // 接收事件
      var processEvents = this._processEvents;
      processEvents.assign(events);
      events.clear();
      // 事件处理
      var count: number = processEvents.count();
      if (count > 0) {
         // 执行事件
         for (var n: number = 0; n < count; n++) {
            var event: any = processEvents.at(n);
            event.process();
            MemoryUtil.free(event);
         }
         // 清除运行队列
         processEvents.clear();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放处理
      this._processEvents = ObjectUtil.dispose(this._processEvents);
      this._events = ObjectUtil.dispose(this._events);
      // 父处理
      super.dispose();
   }
}
