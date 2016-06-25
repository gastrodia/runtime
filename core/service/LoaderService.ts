import {DataContentEnum} from '../../common/lang/DataContentEnum';
import {ListenerContext} from '../../common/lang/ListenerContext';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {Objects} from '../../common/lang/Objects';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {HttpConnection} from '../../common/net/HttpConnection';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Linker} from '../../common/reflect/Linker';
import {Service} from '../Service';
import {HttpService} from './HttpService';
import {JsonService} from './JsonService';
import {ListenerThread} from './ListenerThread';
import {Loader} from './Loader';
import {ThreadService} from './ThreadService';

//==========================================================
// <T>日志控制台。</T>
//
// @class
// @author maocy
// @version 150729
//==========================================================
export class LoaderService extends Service {
   // 加载集合
   protected _loaders: Objects<Loader>;
   // 加载中集合
   protected _processLoaders: Objects<Loader>;
   // 加载上限
   protected _processLimit: number;
   // 线程
   protected _thread: ListenerThread;
   // 间隔
   protected _interval: number;
   // 线程控制台
   @Linker(ThreadService)
   protected _threadConsole: ThreadService;
   // 请求控制台
   @Linker(HttpService)
   protected _httpConsole: HttpService;
   // JSON控制台
   @Linker(JsonService)
   protected _jsonConsole: JsonService;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Global;
      this._processLimit = 8;
      this._interval = 150;
      this._loaders = new Objects<Loader>();
      this._processLoaders = new Objects<Loader>();
      // 创建线程
      var thread: ListenerThread = this._thread = ClassUtil.create(ListenerThread);
      thread.interval = this._interval;
      thread.processListeners.register(this, this.onProcess);
      this._threadConsole.start(thread);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //==========================================================
   public onProcess() {
      var loaders: Objects<Loader> = this._loaders;
      var processLoaders: Objects<Loader> = this._processLoaders;
      var httpConsole: HttpService = this._httpConsole;
      var jsonConsole: JsonService = this._jsonConsole;
      //..........................................................
      // 获取数据
      var processCount: number = processLoaders.count();
      if (!loaders.isEmpty()) {
         for (var n: number = this._processLimit - processCount; n > 0; n--) {
            var loader: Loader = loaders.shift();
            var url: string = loader.url;
            // 加载处理
            var connection: HttpConnection = null;
            if (loader.contentCd == DataContentEnum.Json) {
               connection = jsonConsole.sendAsync(url);
            } else {
               connection = httpConsole.sendAsync(url);
            }
            connection.loadListeners.register(this, this.onLoad, loader);
            // 增加加载中集合
            processLoaders.push(loader);
            // 跳出循环
            if (loaders.isEmpty()) {
               break;
            }
         }
      }
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param connection:FHttpConnection 链接
   //==========================================================
   public onLoad(sender: ListenerContext, event: any): void {
      // 设置资源
      var loader: Loader = sender.attributes[0];
      loader.data = event.content;
      loader.process();
      // var resource = event.connection._resource;
      // // 加载数据
      // var storage = RClass.create(FResourceSingleStorage);
      // storage.setResource(resource);
      // storage.load(data);
      // // 加载资源存储块集合
      // RConsole.find(FResourceDataConsole).load(storage);
      // 移除加载中
      //this._loadingResources.remove(resource);
      this._processLoaders.remove(loader);
   }

   //==========================================================
   // <T>链接处理。</T>
   //
   // @method
   //==========================================================
   public push(loader: Loader) {
      this._loaders.push(loader);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._loaders = ObjectUtil.dispose(this._loaders);
      // 父处理
      super.dispose();
   }
}
