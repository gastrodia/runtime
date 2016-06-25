import {PlatformEnum} from '../../common/PlatformEnum';
import {Attributes} from '../../common/lang/Attributes';
import {EnumUtil} from '../../common/lang/EnumUtil';
import {Event} from '../../common/lang/Event';
import {Fatal} from '../../common/lang/Fatal';
import {Listeners} from '../../common/lang/Listeners';
import {LoggerUtil} from '../../common/lang/LoggerUtil';
import {StringUtil} from '../../common/lang/StringUtil';
import {Linker} from '../../common/reflect/Linker';
import {Service} from '../../core/Service';
import {EnvironmentService} from '../../core/service/EnvironmentService';
import {BrowserEnum} from '../BrowserEnum';
import {DeviceEnum} from '../DeviceEnum';
import {EventEnum} from '../EventEnum';
import {OrientationEnum} from '../OrientationEnum';
import {SoftwareEnum} from '../SoftwareEnum';
import {ResizeEvent} from '../event/ResizeEvent';
import {BrowserCapability} from './BrowserCapability';

//==========================================================
// <T>设备控制台。</T>
//==========================================================
export class DeviceService extends Service {
   // @attribute
   protected _optionSelect = true;
   // @attribute
   protected _eventResize = new ResizeEvent();
   protected _eventVisibility = new Event();
   protected _eventOrientation = new Event();
   protected _eventUnload = new Event();
   // @attribute
   protected _agent = null;
   protected _capability: BrowserCapability = null;
   protected _defineProperties = null;
   protected _defineEvents = null;
   protected _defineMethods = null;
   // @attribute
   protected _platformCd = PlatformEnum.Unknown;
   protected _deviceCd = DeviceEnum.Unknown;
   protected _softwareCd = SoftwareEnum.Unknown;
   protected _typeCd = BrowserEnum.Unknown;
   protected _orientationCd = OrientationEnum.Horizontal;
   protected _supportHtml5 = false;
   // @html
   protected _hWindow = null;
   protected _hDocument = null;
   protected _hContainer = null;
   // @attribute
   protected _requestAnimationFrame = null;
   protected _cancelAnimationFrame = null;
   // @attribute
   protected _cookies = new Attributes();
   protected _localStorage = null;
   protected _sessionStorage = null;
   // 环境控制台
   @Linker(EnvironmentService)
   protected _environmentConsole: EnvironmentService;
   // 监听器集合
   public loadListeners = new Listeners();
   public loadedListeners = new Listeners();
   public unloadListeners = new Listeners();
   public resizeListeners = new Listeners();
   public visibilityListeners = new Listeners();
   public orientationListeners = new Listeners();
   public deviceErrorListeners = new Listeners();

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._eventVisibility.code = EventEnum.Visibility;
      this._eventOrientation.code = EventEnum.Orientation;
   }

   //==========================================================
   // <T>获得窗口对象。</T>
   //
   // @return 窗口对象
   //==========================================================
   public get htmlWindow() {
      return this._hWindow;
   }

   //==========================================================
   // <T>获得文档对象。</T>
   //
   // @return 文档对象
   //==========================================================
   public get htmlDocument() {
      return this._hDocument;
   }

   //==========================================================
   // <T>获得容器对象。</T>
   //
   // @return 容器对象
   //==========================================================
   public get htmlContainer() {
      return this._hContainer;
   }

   //==========================================================
   // <T>获得信息。</T>
   //
   // @return 信息
   //==========================================================
   public get agent() {
      return this._agent;
   }

   //==========================================================
   // <T>获得浏览器环境信息。</T>
   //
   // @return 浏览器环境信息
   //==========================================================
   public get capability(): BrowserCapability {
      return this._capability;
   }

   //==========================================================
   // <T>获得配置选取。</T>
   //
   // @return 配置选取
   //==========================================================
   public get optionSelect() {
      return this._optionSelect;
   }

   //==========================================================
   // <T>设置配置选取。</T>
   //
   // @method
   // @param select:Boolean 配置选取
   //==========================================================
   public set optionSelect(select) {
      this._optionSelect = select;
      if (this.isBrowser(BrowserEnum.FireFox)) {
         this._hContainer.style.MozUserSelect = select ? '' : 'none';
      }
   }

   //===========================================================
   // <T>返回屏幕方向。</T>
   //
   // @method
   // @return 屏幕方向
   //===========================================================
   public get orientationCd() {
      return this._orientationCd;
   }

   //===========================================================
   // <T>设置屏幕方向。</T>
   //
   // @method
   // @param orientationCd:EOrientation 屏幕方向
   //===========================================================
   public set setOrientationCd(orientationCd) {
      this._orientationCd = orientationCd;
   }

   //===========================================================
   // <T>判断是否指定浏览器。</T>
   //
   // @param browserCd:EBrowser 浏览器类型
   // @return 是否指定浏览器
   //===========================================================
   public isBrowser(browserCd) {
      return this._typeCd == browserCd;
   }

   //===========================================================
   // <T>判断是否横屏。</T>
   //
   // @method
   // @return 是否横屏
   //===========================================================
   public isOrientationHorizontal() {
      return this._orientationCd == OrientationEnum.Horizontal;
   }

   //===========================================================
   // <T>判断是否垂直。</T>
   //
   // @method
   // @return 是否垂直
   //===========================================================
   public isOrientationVertical() {
      return this._orientationCd == OrientationEnum.Vertical;
   }

   //===========================================================
   // <T>判断是否可见。</T>
   //
   // @method
   // @return 是否可见
   //===========================================================
   public isVisibility() {
      var name = this.definePropertyGet('hidden');
      return !window.document[name];
   }

   //==========================================================
   // <T>获得定义属性集合。</T>
   //
   // @method
   // @return Object 定义属性集合
   //==========================================================
   public defineProperties() {
      return this._defineProperties;
   }

   //==========================================================
   // <T>获得定义属性。</T>
   //
   // @method
   // @return String 定义属性
   //==========================================================
   public definePropertyGet(name) {
      return this._defineProperties[name];
   }

   //==========================================================
   // <T>获得定义事件集合。</T>
   //
   // @method
   // @return Object 定义事件集合
   //==========================================================
   public defineEvents() {
      return this._defineEvents;
   }

   //==========================================================
   // <T>获得定义事件。</T>
   //
   // @return 定义事件
   //==========================================================
   public defineEventGet(name) {
      return this._defineEvents[name];
   }

   //==========================================================
   // <T>获得定义函数集合。</T>
   //
   // @method
   // @return Object 定义函数集合
   //==========================================================
   public defineMethods() {
      return this._defineMethods;
   }

   //==========================================================
   // <T>获得定义函数。</T>
   //
   // @method
   // @return String 定义函数名称
   //==========================================================
   public defineMethodGet(name) {
      return this._defineMethods[name];
   }

   //==========================================================
   // <T>测试是否支持HTML5规范。</T>
   //
   // @method
   // @return 是否支持
   //==========================================================
   public supportHtml5() {
      return this._supportHtml5;
   }

   //==========================================================
   // <T>获得事件对象。</T>
   //
   // @param hEvent 事件
   // @return 事件
   //==========================================================
   public findEvent(hEvent) {
      if (!hEvent) {
         hEvent = this._hWindow.event;
      }
      return hEvent;
   }

   //==========================================================
   // <T>日志输出信息。</T>
   //
   // @param sender 发送者
   // @param event 事件
   //==========================================================
   public onLogger(sender, event) {
      //console.log("\r");
      console.log(event.message);
      //console.log("\r");
   }

   //==========================================================
   // <T>关联当前窗口。</T>
   // <P>接管当前窗口对象的各种加载，鼠标，键盘的处理事件。</P>
   //
   // @param hWindow 窗口对象
   //==========================================================
   public setup(hWindow: any) {
      // 设置属性
      var hWindow = this._hWindow = hWindow;
      hWindow.__linker = this;
      var hDocument = this._hDocument = hWindow.document;
      hDocument.__linker = this;
      var hContainer = this._hContainer = hDocument.body;
      hContainer.__linker = this;
      //..........................................................
      // 设置日志
      LoggerUtil.outputListeners.register(this, this.onLogger);
      //..........................................................
      var code = this._agent = window.navigator.userAgent.toString();
      var agent = code.toLowerCase();
      var properties = this._defineProperties = new Object();
      var events = this._defineEvents = new Object();
      var methods = this._defineMethods = new Object();
      var capability = this._capability = new BrowserCapability();
      // 判断设备类型
      if (agent.indexOf("android") != -1) {
         this._typeCd = DeviceEnum.Mobile;
         this._softwareCd = SoftwareEnum.Android;
      }
      // 判断浏览器类型
      if (agent.indexOf("chrome") != -1) {
         this._typeCd = BrowserEnum.Chrome;
      } else if (agent.indexOf("firefox") != -1) {
         this._typeCd = BrowserEnum.FireFox;
      } else if ((agent.indexOf("msie") != -1) || (agent.indexOf("windows") != -1)) {
         this._typeCd = BrowserEnum.Explorer;
      } else if ((agent.indexOf("safari") != -1) || (agent.indexOf("applewebkit") != -1)) {
         this._typeCd = BrowserEnum.Safari;
      } else {
         alert('Unknown browser.\n' + agent);
         return;
      }
      // 是否移动或PC模式
      var platformCd = PlatformEnum.Mobile;
      if (StringUtil.contains(agent, 'android', 'ipad', 'iphone', 'midp', 'rv:1.2.3.4', 'windows ce', 'windows mobile')) {
         platformCd = PlatformEnum.Mobile;
         // this._environmentConsole.registerValue(EConstant.DeviceType, 'mb');
      } else {
         platformCd = PlatformEnum.Pc;
         // this._environmentConsole.registerValue(EConstant.DeviceType, 'pc');
      }
      this._platformCd = platformCd;
      // RRuntime.setPlatformCd(platformCd);
      // 判断浏览器是否需要声音确认
      if (StringUtil.contains(agent, 'android 5.1', 'iphone', 'ipad')) {
         capability.soundConfirm = true;
      }
      // 判断浏览器是否支持画面缩放
      if (StringUtil.contains(agent, 'mqqbrowser')) {
         capability.canvasScale = false;
      }
      // 注册输出接口
      if (this._typeCd == BrowserEnum.Chrome) {
         // RLogger.lsnsOutput.register(this, this.onLog);
      }
      // 输出日志
      LoggerUtil.debug(this, 'Parse browser agent. (platform_cd={1}, type_cd={2})', EnumUtil.decode(PlatformEnum, platformCd), EnumUtil.decode(BrowserEnum, this._typeCd));
      // 是否支持HTML5
      if (hWindow.applicationCache) {
         this._supportHtml5 = true;
      }
      // 检测是否支持声音完成(360浏览器不支持声音完成相应)
      var external: any = hWindow.external;
      if (external) {
         if (external.twGetRunPath) {
            if ((agent.indexOf('360chrome') != -1) || (agent.indexOf('360se') != -1)) {
               capability.soundFinish = false;
            } else {
               var runPath = external.twGetRunPath().toLowerCase();
               if (runPath.indexOf('360se') != -1) {
                  capability.soundFinish = false;
               }
            }
         }
      }
      // 设置浏览器能力
      var pixelRatio = hWindow.devicePixelRatio;
      if (pixelRatio) {
         if (platformCd == PlatformEnum.Mobile) {
            // 强制不要超过3倍
            capability.pixelRatio = Math.min(pixelRatio, 3);
            LoggerUtil.debug(this, 'Parse browser agent. (pixel_ratio={1}, capability_ratio={2})', pixelRatio, capability.pixelRatio);
         }
      }
      if (hWindow.Worker) {
         capability.optionProcess = true;
      }
      if (hWindow.localStorage) {
         capability.optionStorage = true;
      }
      try {
         new Blob(["Test"], { 'type': 'text/plain' });
         capability.blobCreate = true;
      } catch (e) {
         LoggerUtil.warn(this, 'Browser blob not support.');
      }
      // 设置函数
      var visibilityChange = null;
      if (typeof hDocument.hidden !== "undefined") {
         properties['hidden'] = 'hidden';
         events['visibilitychange'] = 'visibilitychange';
      } else if (typeof hDocument.mozHidden !== "undefined") {
         properties['hidden'] = 'mozHidden';
         events['visibilitychange'] = 'mozvisibilitychange';
      } else if (typeof hDocument.msHidden !== "undefined") {
         properties['hidden'] = 'msHidden';
         events['visibilitychange'] = 'msvisibilitychange';
      } else if (typeof hDocument.webkitHidden !== "undefined") {
         properties['hidden'] = 'webkitHidden';
         events['visibilitychange'] = 'webkitvisibilitychange';
      }
      // 计算方向
      this.refreshOrientation();
      LoggerUtil.debug(this, 'Browser connect. (agent={1})', this._agent);
      //..........................................................
      // 关联鼠标事件
      var visibilitychange = this.defineEventGet('visibilitychange');
      if (this.supportHtml5()) {
         hDocument.addEventListener(visibilitychange, this.ohVisibility, true);
      } else {
         hDocument['on' + visibilitychange] = this.ohVisibility;
      }
      hWindow.onorientationchange = this.ohOrientation;
      hContainer.onresize = this.ohResize;
      hContainer.onselectstart = this.ohSelect;
      hContainer.onunload = this.ohUnload;
      // 读取COOKIES
      this._cookies.split(hDocument.cookie, '=', ';');
      // 检测事件
      this._requestAnimationFrame = hWindow.requestAnimationFrame || hWindow.webkitRequestAnimationFrame
         || hWindow.mozRequestAnimationFrame || hWindow.oRequestAnimationFrame || hWindow.msRequestAnimationFrame;
      this._cancelAnimationFrame = hWindow.cancelRequestAnimationFrame || hWindow.webkitCancelAnimationFrame
         || hWindow.webkitCancelRequestAnimationFrame || hWindow.mozCancelAnimationFrame
         || hWindow.mozCancelRequestAnimationFrame || hWindow.msCancelAnimationFrame || hWindow.msCancelRequestAnimationFrame;
   }

   //==========================================================
   // <T>改变大小处理。</T>
   //
   // @method
   // @param event:htmlEvent 事件
   //==========================================================
   public ohResize(hEvent) {
      var linker: DeviceService = (this as any).__linker;
      if (!hEvent) {
         hEvent = linker._hWindow.event;
      }
      // 接收事件
      var event = linker._eventResize;
      event.code = EventEnum.Resize;
      event.attachEvent(hEvent);
      //LoggerUtil.debug(this, 'Screen resize. (size={1}x{2})', event.width, event.height);
      linker.resizeListeners.process(event);
      // var h = linker._hDisablePanel;
      // if (h) {
      //    if ('block' == h.style.display) {
      //       var s = h.style;
      //       var hd = linker.hDocument;
      //       s.pixelLeft = 0;
      //       s.pixelTop = 0
      //       s.pixelWidth = hd.all ? linker._hContainer.scrollWidth : hd.documentElement.scrollWidth;
      //       s.pixelHeight = hd.all ? linker._hContainer.scrollHeight : hd.documentElement.scrollHeight;
      //    }
      // }
      // // 根据窗口大小，不发送重复事件
      // if (linker.oldBodyWidth == linker._hContainer.offsetWidth && linker.oldBodyHeight == linker._hContainer.offsetHeight) {
      //    return;
      // }
      // linker.oldBodyWidth = linker._hContainer.offsetWidth;
      // linker.oldBodyHeight = linker._hContainer.offsetHeight;
      // // 通知所有控件，窗口改变大小
      // linker.onResize();
      // linker.lsnsResize.process(e);
   }
   
   //==========================================================
   // <T>选取处理。</T>
   //
   // @method
   // @param event:htmlEvent 事件
   //==========================================================
   public ohSelect(event) {
      var linker: DeviceService = (this as any).__linker;
      return linker._optionSelect;
   }

   //==========================================================
   // <T>可见性处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohVisibility(hEvent) {
      var linker: DeviceService = (this as any).__linker;
      // 刷新方向
      // var visibility = MO.Window.Browser.isVisibility();
      // // 分发消息
      // var event = linker._eventVisibility;
      // event.visibility = visibility;
      // linker.lsnsVisibility.process(event);
      // RLogger.debug(linker, 'Window visibility changed. (visibility={1})', visibility);
   }

   //==========================================================
   // <T>选取处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohOrientation(hEvent) {
      var linker: DeviceService = (this as any).__linker;
      // 刷新方向
      var orientationCd = linker.refreshOrientation();
      // 分发消息
      var event = linker._eventOrientation;
      // event.orientationCd = orientationCd;
      linker.orientationListeners.process(event);
      LoggerUtil.debug(linker, 'Window orientation changed. (orientation_cd={1})', orientationCd);
   }

   //==========================================================
   // <T>卸载处理处理。</T>
   //
   // @param event 事件
   //==========================================================
   public ohUnload(hEvent) {
      var linker: DeviceService = (this as any).__linker;
      // 释放处理
      var event = linker._eventUnload;
      linker.unloadListeners.process(event);
      // 释放窗口
      linker.dispose();
   }


   //==========================================================
   // <T>设置标题。</T>
   //
   // @param value 标题
   //==========================================================
   public setCaption(value) {
      top.document.title = StringUtil.nvl(value);
   }

   //==========================================================
   // <T>设置状态。</T>
   //
   // @param value 状态
   //==========================================================
   public setStatus(value) {
      window.status = StringUtil.nvl(value);
   }

   //==========================================================
   // <T>请求动画回调。</T>
   //
   // @param callback 回调函数
   // @param interval 调用间隔
   //==========================================================
   public requestAnimationFrame(callback) {
      //var method = this._requestAnimationFrame;
      var method = null;
      if (method) {
         method(callback);
         return true;
      }
      return false;
   }

   //==========================================================
   // <T>取消动画回调。</T>
   //
   // @param callback 回调函数
   //==========================================================
   public cancelRequestAnimationFrame(callback) {
      //var method = this._cancelAnimationFrame;
      var method = null;
      if (method) {
         method(callback);
         return true;
      }
      return false;
   }

   //===========================================================
   // <T>判断是否垂直。</T>
   //
   // @return 是否垂直
   //===========================================================
   public refreshOrientation() {
      var hWindow = this._hWindow;
      var orientation = hWindow.orientation;
      if (orientation != null) {
         if ((orientation == 180) || (orientation == 0)) {
            this._orientationCd = OrientationEnum.Vertical;
         } else if ((orientation == 90) || (orientation == -90)) {
            this._orientationCd = OrientationEnum.Horizontal;
         } else {
            throw new Fatal(this, 'Unknown orientation mode.');
         }
      }
      return this._orientationCd;
   }

   //===========================================================
   // <T>参数编码。</T>
   //
   // @param value 参数
   // @return 编码字符串
   //===========================================================
   public encode(value) {
      return this._hWindow.escape(value);
   }

   //===========================================================
   // <T>参数解码。</T>
   //
   // @param value 参数
   // @return 解码字符串
   //===========================================================
   public decode(value) {
      return this._hWindow.unescape(value);
   }

   //===========================================================
   // <T>URL参数编码。</T>
   //
   // @param url 网络地址
   // @param flag 是否全部
   // @return 编码字符串
   //===========================================================
   public urlEncode(url, flag) {
      if (flag) {
         return encodeURIComponent(url);
      }
      return encodeURI(url);
   }

   //===========================================================
   // <T>URL参数解码。</T>
   //
   // @param url 网络地址
   // @param flag 是否全部
   // @return 解码字符串
   //===========================================================
   public urlDecode(url, flag) {
      if (flag) {
         return decodeURIComponent(url);
      }
      return decodeURI(url);
   }


   //==========================================================
   // <T>设置窗口是否全屏。</T>
   //
   // @param hPanel 页面窗口
   // @param flag 标志
   //==========================================================
   public fullscreen(hPanel, flag) {
      if (flag) {
         // 进入全屏模式
         if (hPanel.requestFullscreen) {
            hPanel.requestFullscreen();
         } else if (hPanel.mozRequestFullScreen) {
            hPanel.mozRequestFullScreen();
         } else if (hPanel.webkitRequestFullScreen) {
            hPanel.webkitRequestFullScreen();
         } else if (hPanel.msRequestFullscreen) {
            hPanel.msRequestFullscreen();
         }
      } else {
         // 退出全屏模式
         if (hPanel.exitFullscreen) {
            hPanel.exitFullscreen();
         } else if (hPanel.mozCancelFullScreen) {
            hPanel.mozCancelFullScreen();
         } else if (hPanel.webkitCancelFullScreen) {
            hPanel.webkitCancelFullScreen();
         } else if (hPanel.msExitFullscreen) {
            hPanel.msExitFullscreen();
         }
      }
   }

   //===========================================================
   // <T>下载数据块。</T>
   //
   // @param fileName 文件名称
   // @param text 文本内容
   //===========================================================
   public static downloadText(fileName, text) {
      // var blob = RBlob.fromText(text);
      // this.downloadBlob(fileName, blob);
   }

   //===========================================================
   // <T>下载数据块。</T>
   //
   // @param fileName 文件名称
   // @param blob 数据块
   //===========================================================
   public static downloadBlob(fileName, blob) {
      var link: any = document.createElement('A');
      var event: any = document.createEvent("MouseEvents");
      event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.dispatchEvent(event);
   }

   //==========================================================
   // <T>释放窗口所有对象。</T>
   //==========================================================
   public dispose() {
      // 设置属性
      var hWindow = this._hWindow;
      var hDocument = this._hDocument;
      var hContainer = this._hContainer;
      // // 关联鼠标事件
      // //if (MO.Window.Browser.supportHtml5()) {
      // hContainer.removeEventListener('mousedown', this.onMouseDown, true);
      // hContainer.removeEventListener('mousemove', this.onMouseMove, true);
      // hContainer.removeEventListener('mouseup', this.onMouseUp, true);
      // hContainer.removeEventListener('mousewheel', this.onMouseWheel, true);
      // hContainer.removeEventListener('keydown', this.onKeyDown, true);
      // hContainer.removeEventListener('keyup', this.onKeyUp, true);
      // hContainer.removeEventListener('keypress', this.onKeyPress, true);
      // hWindow.removeEventListener('orientationchange', this.onOrientation);
      // //} else {
      // hContainer.onmousedown = null;
      // hContainer.onmousemove = null;
      // hContainer.onmouseup = null;
      // hContainer.onmousewheel = null;
      // hContainer.onkeydown = null;
      // hContainer.onkeyup = null;
      // hContainer.onkeypress = null;
      // hWindow.onorientationchange = null;
      // //}
      // hContainer.onresize = null;
      // hContainer.onselectstart = null;
      // hContainer.onunload = null;
      // // @attribute
      // this._localStorage = RObject.dispose(this._localStorage);
      // this._sessionStorage = RObject.dispose(this._sessionStorage);
      // // @attribute
      // this._hWindow = null;
      // this._hDocument = null;
      // this._hContainer = null;
      // // @attribute
      // this._eventMouse = RObject.dispose(this._eventMouse);
      // this._eventKey = RObject.dispose(this._eventKey);
      // this._eventResize = RObject.dispose(this._eventResize);
      // this._eventOrientation = RObject.dispose(this._eventOrientation);
      // this._eventUnload = RObject.dispose(this._eventUnload);
      super.dispose();
   }
}
