import {Fatal} from '../../common/lang/Fatal';
import {ScopeEnum} from '../../common/lang/ScopeEnum';

// import {SListenerContext} from '../../common/lang/ListenerContext';
// import {FListener} from '../../common/lang/Listener';
// import {FObjects} from '../../common/lang/Objects';
// import {RObject} from '../../common/lang/ObjectUtil';
// import {RListener} from '../../common/lang/ListenerUtil';
// import {RLogger} from '../../common/lang/LoggerUtil';
// import {ALinker} from '../../common/reflect/Linker';
// import {RClass} from '../../common/reflect/ClassUtil';
// import {RMemory} from '../../common/MemoryUtil';
import {Service} from '../../core/Service';
import {EventEnum} from '../EventEnum';
import {MouseEnterEvent} from '../event/MouseEnterEvent';
import {MouseLeaveEvent} from '../event/MouseLeaveEvent';
import {MouseEvent} from '../event/MouseEvent';
//import {FListenerThread} from './FListenerThread';
//import {FThreadConsole} from './FThreadConsole';

//==========================================================
// <T>环境控制台。</T>
//
// @console
// @author maocy
// @version 150606
//==========================================================
export class EventService extends Service {
   // 线程控制台
   //@ALinker(FThreadConsole)
   //public _threadConsole: FThreadConsole = null;
   // 线程对象
   //protected _thread: FListenerThread = null;
   // 处理间隔
   //protected _interval: number = 50;
   // 处理事件集合(对事件中产生的事件排队)
   //public _processEvents = null;
   // 事件集合
   //public _events = null;

   // //==========================================================
   // // <T>检验传入值是否是整型值。</T>
   // //
   // // @method
   // // @param v:value:String 待检验的字符串
   // // @return Boolean 是否整数
   // //==========================================================
   // public static listenerProcess(context: SListenerContext) {
   //    context.process();
   //    RMemory.free(event);
   // }

   // //==========================================================
   // // <T>静态构造处理。</T>
   // //==========================================================
   // public static initialize() {
   //    //var eventConsole = RClass.getInstance(FEventConsole);
   //    //RListener.process = (context: SListenerContext) => {
   //       // eventConsole._events.push(context);
   //    //};
   // }

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this._scopeCd = ScopeEnum.Local;
      // 创建属性
      // this._processEvents = new FObjects<any>();
      // this._events = new FObjects<any>();
      // // 创建线程
      // var thread: FListenerThread = this._thread = RClass.create(FListenerThread);
      // thread.interval = this._interval;
      // thread.processListeners.register(this, this.onProcess);
      // this._threadConsole.start(thread);
      // RLogger.debug(this, 'Add event thread. (thread={1})', RClass.dump(thread));
   }

   //==========================================================
   // <T>事件后台处理。</T>
   //
   // @param context 环境
   // @param parameters 参数集合
   //==========================================================
   public alloc(eventCd: String): any {
      switch (eventCd) {
         case EventEnum.Enter:
            return new MouseEnterEvent();
         case EventEnum.Leave:
            return new MouseLeaveEvent();
         case EventEnum.Click:
         case EventEnum.DoubleClick:
         case EventEnum.MouseDown:
         case EventEnum.MouseMove:
         case EventEnum.MouseUp:
            return new MouseEvent();
         default:
            throw new Fatal(this, 'Unknown event.');
      }
   }

   //==========================================================
   // <T>将一个页面元素和已经注册过的事件相关联。</T>
   // <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
   //    该立即函数的this指针指向当前控件实例。</P>
   // <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
   //    执行时该函数的this指针指向当前控件实例。</P>
   //
   // @method
   // @param name:String 注册过的事件名称
   // @param hTag 页面元素
   // @param method 立即函数
   // @param capture 捕捉
   // @return TEvent 关联的事件对象
   //==========================================================
   public attachEvent(control: any, hTag: any, eventCd: string, method: Function = null, capture: boolean = false) {
      var event: any = this.alloc(eventCd);
      var eventName = null;
      if (event.handle) {
         eventName = 'on' + event.handle;
      } else {
         eventName = 'on' + eventCd.toLowerCase();
      }
      hTag[eventName] = (hEvent) => {
         event.attachEvent(hEvent);
         // 注册调用
         method.call(control, control, event);
         // 监听处理
         control.dispatchEvent(eventCd, event);
      }
      //return MO.Dui.Control.attachEvent(this, name, hTag, method, capture);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放处理
      // this._processEvents = RObject.dispose(this._processEvents);
      // this._events = RObject.dispose(this._events);
      // 父处理
      super.dispose();
   }
}
