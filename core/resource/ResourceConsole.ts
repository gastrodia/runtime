import {DataContentEnum} from '../../common/lang/DataContentEnum';
import {Dictionary} from '../../common/lang/Dictionary';
import {ScopeEnum} from '../../common/lang/ScopeEnum';

// import {FError} from '../../common/lang/Fatal';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
// import {RString} from '../../common/lang/StringUtil';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Linker} from '../../common/reflect/Linker';
import {ListenerThread} from '../service/ListenerThread';
import {ThreadService} from '../service/ThreadService';
import {EnvironmentService} from '../service/EnvironmentService';
import {LoaderService} from '../service/LoaderService';
import {Service} from '../Service';
// import {RConsole} from '../RConsole';
// import {FEnvironmentConsole} from '../service/EnvironmentService';
// import {FResourceSingleStorage} from './FResourceSingleStorage';
// import {FResourceBlockStorage} from './FResourceBlockStorage';
// import {FResourcePackage} from './FResourcePackage';
// import {FResourceDataConsole} from './FResourceDataConsole';
import {Resource} from './Resource';
import {ResourcePackage} from './ResourcePackage';
import {ResourceLoader} from './ResourceLoader';

//==========================================================
// <T>资源控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
export class ResourceConsole extends Service {
   // // @attribute
   // protected _factory = null;
   // protected _types = null;
   // 资源包集合
   protected _packages: Dictionary<ResourcePackage> = null;
   // protected _resources = null;
   // // @attribute
   // protected _loadResources = null;
   // protected _loadingResources = null;
   // protected _processStorages = null;
   // 线程
   protected _thread: ListenerThread = null;
   protected _interval: number = 150;
   // protected _loadLimit = 8;
   // 线程控制台
   @Linker(ThreadService)
   protected _threadConsole: ThreadService;
   // 环境控制台
   @Linker(EnvironmentService)
   protected _environmentConsole: EnvironmentService;
   // 加载控制台
   @Linker(LoaderService)
   protected _loaderConsole: LoaderService;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._scopeCd = ScopeEnum.Global;
      //_factory = RClass.create(MO.FClassFactory);
      //_types = new common.lang.FDictionary();
      this._packages = new Dictionary<ResourcePackage>();
      //_resources = new common.lang.FDictionary();
      //_loadResources = new common.lang.FObjects();
      //_loadingResources = new common.lang.FObjects();
      //_processStorages = new common.lang.FLooper();
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
      // //var httpConsole = RConsole.find(common.net.FHttpConsole);
      // var httpConsole = null;
      // //..........................................................
      // // 获取数据
      // var loadResources = this._loadResources;
      // var loadingResources = this._loadingResources;
      // var pc = loadingResources.count();
      // if (!loadResources.isEmpty()) {
      //    for (var i = this._loadLimit - pc; i > 0; i--) {
      //       var resource = loadResources.shift();
      //       var sourceUrl = resource.sourceUrl();
      //       // 加载处理
      //       var connection = httpConsole.send(sourceUrl);
      //       connection._resource = resource;
      //       if (resource._dataCompress) {
      //          if (resource._dataBlock) {
      //             connection.addLoadListener(this, this.onBlockLoad);
      //          } else {
      //             connection.addLoadListener(this, this.onLoad);
      //          }
      //       } else {
      //          connection.addLoadListener(this, this.onComplete);
      //       }
      //       resource._dataLoad = true;
      //       // 增加加载中集合
      //       loadingResources.push(resource);
      //       // 跳出循环
      //       if (loadResources.isEmpty()) {
      //          break;
      //       }
      //    }
      // }
      // //..........................................................
      // // 处理存储集合
      // var storages = this._processStorages;
      // storages.record();
      // while (storages.next()) {
      //    var storage = storages.current();
      //    if (storage.testReady()) {
      //       storages.removeCurrent();
      //       // 完成处理
      //       storage.complete();
      //       storage.dispose();
      //    }
      // }
      // MO.Logger.info(o, 'onProcess', 'Process resource. (loading={1}, process={2}, pool={3})', o._loadingResources.count(), o._processingResources.count(), o._pipelinePool.dump());
   }

   // //==========================================================
   // // <T>加载事件完成后，响应的处理。</T>
   // //
   // // @method
   // // @param resource:FResource 资源
   // // @param data:ArrayBuffer 数据
   // //==========================================================
   // public onComplete(resource, data) {
   //    var o = this;
   //    resource._data = null;
   //    o._loadingResources.remove(resource);
   //    resource.onComplete(data);
   // }

   // //==========================================================
   // // <T>加载事件完成后，响应的处理。</T>
   // //
   // // @method
   // // @param connection:FHttpConnection 链接
   // //==========================================================
   // public onLoad(event) {
   //    var o = this;
   //    // 设置资源
   //    var data = event.content;
   //    var resource = event.connection._resource;
   //    // 加载数据
   //    var storage = RClass.create(FResourceSingleStorage);
   //    storage.setResource(resource);
   //    storage.load(data);
   //    // 加载资源存储块集合
   //    RConsole.find(FResourceDataConsole).load(storage);
   //    // 移除加载中
   //    o._loadingResources.remove(resource);
   //    o._processStorages.push(storage);
   // }

   // //==========================================================
   // // <T>加载事件完成后，响应的处理。</T>
   // //
   // // @method
   // // @param connection:FHttpConnection 链接
   // //==========================================================
   // public onBlockLoad(event) {
   //    var o = this;
   //    var data = event.content;
   //    // 获得资源
   //    var resource = event.connection._resource;
   //    resource._compressLength = data.byteLength;
   //    //resource._compressStartTick = MO.Timer.current();
   //    // 加载数据
   //    var storage = RClass.create(FResourceBlockStorage);
   //    storage.setResource(resource);
   //    storage.load(data);
   //    // 加载资源存储块集合
   //    var dataConsole = RConsole.find(FResourceDataConsole);
   //    var blocks = storage.blocks();
   //    var count = blocks.count();
   //    for (var i = 0; i < count; i++) {
   //       var block = blocks.at(i);
   //       dataConsole.load(block);
   //    }
   //    // 移除加载中
   //    o._loadingResources.remove(resource);
   //    o._processStorages.push(storage);
   // }

   // //==========================================================
   // // <T>注册资源类型。</T>
   // //
   // // @method
   // // @return FResourceType 资源类型
   // //==========================================================
   // public registerType(type) {
   //    var o = this;
   //    var code = type.code();
   //    return o._types.set(code, type);
   // }

   // //==========================================================
   // // <T>获得类工厂。</T>
   // //
   // // @method
   // // @return FClassFactory 类工厂
   // //==========================================================
   // public factory() {
   //    return this._factory;
   // }

   // //==========================================================
   // // <T>加载资源对象。</T>
   // //
   // // @method
   // // @param resource:FResource 资源对象
   // //==========================================================
   // public load(resource) {
   //    var o = this;
   //    var guid = resource.guid();
   //    if (RString.isEmpty(guid)) {
   //       guid = resource.code();
   //    }
   //    // 检查编号
   //    var resources = o._resources;
   //    if (resources.contains(guid)) {
   //       throw new FError(o, 'Resource is already loaded. (guid={1})', guid);
   //    }
   //    resources.set(guid, resource);
   //    // 放入队列
   //    o._loadResources.push(resource);
   //    // 设置标志
   //    resource._dataLoad = true;
   // }

   // //==========================================================
   // // <T>加载资源包。</T>
   // //
   // // @method
   // // @param resourcePackage:资源包 资源对象
   // //==========================================================
   // public loadPackage(resourcePackage) {
   //    var o = this;
   // }

   //==========================================================
   // <T>根据URL地址加载资源。</T>
   //
   // @method
   // @param contentCd 内容类型
   // @param content 内容
   // @param uri 网络地址
   //==========================================================
   public loadContent(contentCd: DataContentEnum, content: Resource, url: string): void {
      // 创建加载器
      var loader: ResourceLoader = ClassUtil.create(ResourceLoader);
      loader.contentCd = contentCd;
      loader.url = url;
      loader.content = content;
      this._loaderConsole.push(loader);
   }

   //==========================================================
   // <T>根据URL地址加载资源包。</T>
   //
   // @method
   // @param uri:String 资源对象
   //==========================================================
   public loadPackageByUrl(uri): ResourcePackage {
      // 查找资源包
      var resourcePackages: Dictionary<ResourcePackage> = this._packages;
      var resourcePackage: ResourcePackage = resourcePackages.get(uri);
      if (!resourcePackage) {
         // 解析地址
         var url: string = this._environmentConsole.parse(uri);
         // 创建资源包
         resourcePackage = ClassUtil.create(ResourcePackage);
         resourcePackages.set(uri, resourcePackage);
         // 创建加载器
         var loader: ResourceLoader = ClassUtil.create(ResourceLoader);
         loader.url = url;
         loader.content = resourcePackage;
         this._loaderConsole.push(loader);
      }
      return resourcePackage;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 设置变量
      // this._factory = RObject.dispose(this._factory);
      // this._types = RObject.dispose(this._types);
      this._packages = ObjectUtil.dispose(this._packages);
      // this._resources = RObject.dispose(this._resources);
      // this._loadResources = RObject.dispose(this._loadResources);
      // this._loadingResources = RObject.dispose(this._loadingResources);
      // this._processStorages = RObject.dispose(this._processStorages);
      // 父处理
      super.dispose();
   }
}
