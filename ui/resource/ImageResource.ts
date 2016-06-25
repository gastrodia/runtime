import {AssertUtil} from '../../common/AssertUtil';
import {MemoryUtil} from '../../common/MemoryUtil';
import {Event} from '../../common/lang/Event';
import {Listeners} from '../../common/lang/Listeners';
import {LoggerUtil} from '../../common/lang/LoggerUtil';
import {ObjectBase} from '../../common/lang/ObjectBase';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {Linker} from '../../common/reflect/Linker';
import {EnvironmentService} from '../../core/service/EnvironmentService';
import {Size2} from '../../math/Size2';
import {HtmlUtil} from '../util/HtmlUtil';

//==========================================================
// <T>图片。</T>
//
// @class
// @author maocy
// @history 150105
//==========================================================
export class ImageResource extends ObjectBase {
   // 准备好
   public ready: boolean;
   // 尺寸
   public size: Size2;
   // 地址
   public url: string;
   // 句柄
   public handle: HTMLImageElement;
   // 加载监听器
   public loadListeners: Listeners;
   // 环境服务
   @Linker(EnvironmentService)
   public _environmentService: EnvironmentService;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.size = new Size2();
      this.loadListeners = new Listeners(this);
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this.ready;
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //==========================================================
   public ohLoad(hEvent) {
      var self: ImageResource = (this as any).__linker;
      var hImage = self.handle;
      self.size.set(hImage.naturalWidth, hImage.naturalHeight);
      self.ready = true;
      // 处理加载事件
      var event: Event = MemoryUtil.alloc(Event);
      event.sender = self;
      self.loadListeners.process(event);
      MemoryUtil.free(event);
      LoggerUtil.info(self, 'Load image success. (url={1}, size={2})', self.url, self.size);
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //==========================================================
   public ohError(hEvent) {
      var self = (this as any).__linker;
      var url = self._url;
      LoggerUtil.error(self, 'Load image failure. (url={1})', url);
      debugger
   }

	/**
    * 加载网络地址资源。
    *
	 * @param uri 网络地址
	 * @return 同步对象
	 */
   public loadUrl(uri: string): Promise<any> {
      AssertUtil.debugNotEmpty(uri);
      var url = this.url = this._environmentService.parseUrl(uri);
      // 创建图片
      var hImage = this.handle;
      if (!hImage) {
         hImage = this.handle = new Image();
         (hImage as any).__linker = this;
         hImage.onload = this.ohLoad;
         hImage.onerror = this.ohError;
      }
      // 加载图片
      hImage.src = url;
      var self = this as any;
      var promise = new Promise(function (resolve, reject) {
          self.resolve = resolve;
          self.reject = reject;
      });
      return promise;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 清空属性
      this.size = ObjectUtil.dispose(this.size);
      this.loadListeners = ObjectUtil.dispose(this.loadListeners);
      this.handle = HtmlUtil.dispose(this.handle);
      // 父处理
      super.dispose();
   }
}
