import {Event} from '../lang/Event';
import {ObjectBase} from '../lang/ObjectBase';
import {ObjectUtil} from '../lang/ObjectUtil';

//==========================================================
// <T>网络端口。</T>
//
// @class
// @author maocy
// @history 15029
//==========================================================
export class Socket extends ObjectBase {
   // @attribute
   //_url              = MO.Class.register(o, new MO.AGetSet('_url'));
   protected _url = null;
   //_stoped           = MO.Class.register(o, new MO.AGetter('_stoped'), true);
   protected _stoped = true;
   protected //_connected        = MO.Class.register(o, new MO.AGetter('_connected'), false);
   protected _connected = false;
   //_handle           = MO.Class.register(o, new MO.AGetter('_handle'));
   protected _handle = null;
   protected _linker = null;
   // @attribute
   protected _eventOpen = null;
   protected _eventSend = null;
   protected _eventReceive = null;
   protected _eventClose = null;
   protected _eventError = null;
   // @attribute
   //protected _listenersOpen    = MO.Class.register(o, new MO.AListener('_listenersOpen'));
   //protected _listenersSend    = MO.Class.register(o, new MO.AListener('_listenersSend'));
   //protected _listenersReceive = MO.Class.register(o, new MO.AListener('_listenersReceive'));
   //protected _listenersClose   = MO.Class.register(o, new MO.AListener('_listenersClose'));
   //protected _listenersError   = MO.Class.register(o, new MO.AListener('_listenersError'));

   //==========================================================
   // <T>打开处理。</T>
   //
   // @method
   // @param event:Event 事件信息
   //==========================================================
   public onOpen(event) {
      var o = this;
      o._connected = true;
      //o.processOpenListener(event);
   }

   //==========================================================
   // <T>打开处理。</T>
   //
   // @method
   // @param hEvent:HtmlEvent 页面事件
   //==========================================================
   public ohOpen(hEvent) {
      var o = this._linker;
      var event = o._eventOpen;
      o.onOpen(event);
   }

   //==========================================================
   // <T>接收数据处理。</T>
   //
   // @method
   // @param event:Event 事件信息
   //==========================================================
   public onReveive(event) {
      var o = this;
      //o.processReceiveListener(event);
   }

   //==========================================================
   // <T>接收数据处理。</T>
   //
   // @method
   // @param hEvent:HtmlEvent 页面事件
   //==========================================================
   public ohReceive(hEvent) {
      var o = this._linker;
      var event = o._eventReceive;
      event.message = hEvent.data;
      o.onReveive(event);
   }

   //==========================================================
   // <T>关闭处理。</T>
   //
   // @method
   // @param event:Event 事件信息
   //==========================================================
   public onClose(event) {
      var o = this;
      // 分发消息
      o._connected = false;
      //o.processCloseListener(o._eventClose);
      // 释放链接
      o._handle = null;
   }

   //==========================================================
   // <T>关闭处理。</T>
   //
   // @method
   // @param hEvent:HtmlEvent 页面事件
   //==========================================================
   public ohClose(hEvent) {
      var o = this._linker;
      var event = o._eventClose;
      o.onClose(event);
   }

   //==========================================================
   // <T>错误处理。</T>
   //
   // @method
   // @param event:Event 事件信息
   //==========================================================
   public onError(event) {
      var o = this;
      // 分发消息
      var event = o._eventError;
      //o.processErrorListener(event);
      // 释放链接
      o._handle = null;
   }

   //==========================================================
   // <T>错误处理。</T>
   //
   // @method
   // @param hEvent:HtmlEvent 页面事件
   //==========================================================
   public ohError(hEvent) {
      this._linker.onError(event);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._eventOpen = new Event(this);
      this._eventSend = new Event(this);
      this._eventReceive = new Event(this);
      this._eventClose = new Event(this);
      this._eventError = new Event(this);
   }

   //==========================================================
   // <T>链接处理。</T>
   //
   // @method
   // @param url:String 网络地址
   //==========================================================
   public connect(uri) {
      var o = this;
      // 获得地址
      //var url = o._url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
      var url = o._url = uri;
      // 链接服务器
      var handle = o._handle = new WebSocket(url);
      //handle._linker = o;
      handle.onopen = o.ohOpen;
      handle.onmessage = o.ohReceive;
      handle.onclose = o.ohClose;
      handle.onerror = o.ohError
      // 设置属性
      o._stoped = false;
   }

   //==========================================================
   // <T>发送数据处理。</T>
   //
   // @method
   // @param message:String 消息
   //==========================================================
   public send(message) {
      var o = this;
      // 纷发消息
      var event = o._eventSend;
      event.message = message;
      //o.processSendListener(event);
      // 发送内容
      o._handle.send(message);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public process() {
      var o = this;
      if (!o._stoped) {
         if (!o._handle) {
            o.connect(o._url);
         }
      }
   }

   //==========================================================
   // <T>断开处理。</T>
   //
   // @method
   //==========================================================
   public disconnect() {
      var o = this;
      var handle = o._handle;
      if (handle) {
         handle.close();
         o._handle = null;
      }
      // 设置属性
      o._stoped = true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._eventOpen = ObjectUtil.dispose(this._eventOpen);
      this._eventSend = ObjectUtil.dispose(this._eventSend);
      this._eventReceive = ObjectUtil.dispose(this._eventReceive);
      this._eventClose = ObjectUtil.dispose(this._eventClose);
      this._eventError = ObjectUtil.dispose(this._eventError);
      this._handle = null;
      // 父处理
      super.dispose();
   }
}
