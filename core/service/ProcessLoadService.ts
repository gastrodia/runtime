import {Looper} from '../../../runtime/common/lang/Looper';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Linker} from '../../common/reflect/Linker';
import {Service} from '../Service';
import {ListenerThread} from './ListenerThread';
import {ProcessLoadable} from './ProcessLoadable';
import {ThreadService} from './ThreadService';

//==========================================================
// <T>处理加载控制台。</T>
//
// @console
// @author maocy
// @history 151226
//==========================================================
export class ProcessLoadService extends Service {
   // 循环器
   protected _looper: Looper;
   // 线程对象
   protected _thread: ListenerThread;
   // 处理间隔
   protected _interval: number;
   // 线程控制台
   @Linker(ThreadService)
   public _threadConsole: ThreadService;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      this._looper = new Looper();
      this._interval = 50;
      // 创建线程
      var thread: ListenerThread = this._thread = ClassUtil.create(ListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.onProcess);
      this._threadConsole.start(thread);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public onProcess() {
      var looper = this._looper;
      looper.record();
      while (looper.next()) {
         var item: ProcessLoadable = looper.current();
         // 开始处理
         if (!item.statusLoading) {
            item.processLoadBegin();
            item.statusLoading = true;
         }
         // 逻辑处理
         if (item.processLoad()) {
            looper.removeCurrent();
            // 处理完成
            item.processLoadEnd();
            item.statusLoading = false;
         }
      }
   }

   //==========================================================
   // <T>增加一个加载处理器。</T>
   //
   // @method
   // @param load:MProcessLoad 进度处理器
   //==========================================================
   public push(load: ProcessLoadable) {
      this._looper.push(load);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      super.dispose();
   }
}
