import {Attributes} from '../lang/Attributes';
import {Event} from '../lang/Event';
import {Fatal} from '../lang/Fatal';
import {Listeners} from '../lang/Listeners';
import {LoggerUtil} from '../lang/LoggerUtil';
import {ObjectBase} from '../lang/ObjectBase';
import {ObjectUtil} from '../lang/ObjectUtil';
import {NetUtil} from '../net/NetUtil';
import {HttpContentEnum} from './HttpContentEnum';
import {HttpMethodEnum} from './HttpMethodEnum';
import {HttpStatusEnum} from './HttpStatusEnum';

//==========================================================
// <T>页面通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
export class HttpConnection extends ObjectBase {
   // 异步标志
   public asynchronous: boolean;
   // 函数类型
   public methodCd: HttpMethodEnum;
   // 内容类型
   public contentCd: HttpContentEnum;
   // 网络地址
   public url: string;
   // 头信息集合
   protected _heads;
   // 属性集合
   protected _attributes;
   // 输入内容
   protected _input;
   // 输入数据
   protected _inputData;
   // 输出内容
   protected _output;
   // 输出数据
   protected _outputData;
   // 关联器
   protected _linker;
   // 关联句柄
   protected _handle;
   // 内容长度
   protected _contentLength: number;
   // 自由状态
   protected _statusFree: boolean;
   // 事件信息
   protected _event;
   // 加载监听器
   public loadListeners: Listeners;
   // 完成监听器
   public completeListeners: Listeners;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.asynchronous = true;
      this.methodCd = HttpMethodEnum.Get;
      this.contentCd = HttpContentEnum.Binary;
      this._heads = new Attributes();
      this._attributes = new Attributes();
      this._event = new Event(this);
      this._contentLength = 0;
      this._statusFree = true;
      this.loadListeners = new Listeners();
      this.completeListeners = new Listeners();
      // 创建链接
      var handle = this._handle = NetUtil.createConnection();
      handle._linker = this;
      handle.onreadystatechange = this.onConnectionReady;
   }

   //==========================================================
   // <T>响应链接发送处理。</T>
   //==========================================================
   public onConnectionSend() {
      var input = this._input;
      if (input) {
         if (input.constructor == String) {
            this._inputData = input;
            this._contentLength = input.length;
         } else if (input.constructor == ArrayBuffer) {
            this._inputData = input;
            this._contentLength = input.byteLength;
         } else {
            throw new Fatal(this, 'Unknown send data type.');
         }
      }
   }

   //==========================================================
   // <T>响应链接准备处理。</T>
   //==========================================================
   public onConnectionReady() {
      var linker: HttpConnection = this._linker;
      if (linker.asynchronous) {
         var handle = linker._handle;
         if (handle.readyState == HttpStatusEnum.Loaded) {
            if (handle.status == 200) {
               linker.setOutputData();
               linker.onConnectionComplete();
            } else {
               LoggerUtil.fatal(linker, 'Connection failure. (url={1})', linker.url);
            }
         }
      }
   }

   //==========================================================
   // <T>响应链接完成处理。</T>
   //==========================================================
   public onConnectionComplete() {
      this._statusFree = true;
      // 加载处理
      var event = this._event;
      event.connection = this;
      event.content = this._outputData;
      // 设置属性
      var attributes = this._attributes;
      var count = attributes.count();
      for (var i = 0; i < count; i++) {
         var name = attributes.name(i);
         var value = attributes.value(i);
         event[name] = value;
      }
      this.loadListeners.process(event);
      // 完成处理
      this.completeListeners.process(event);
   }

   //==========================================================
   // <T>获得头信息。</T>
   //
   // @param name 名称
   // @return 内容
   //==========================================================
   public header(name) {
      return this._heads.get(name);
   }

   //==========================================================
   // <T>设置头信息。</T>
   //
   // @param name 名称
   // @param value 内容
   //==========================================================
   public setHeader(name, value) {
      this._heads.set(name, value);
   }

   //==========================================================
   // <T>设置头信息集合。</T>
   //==========================================================
   public setHeaders() {
      var handle = this._handle;
      // 传输格式
      if (this.contentCd == HttpContentEnum.Binary) {
         // 二进制内容
         //if (MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)) {
         //   handle.setRequestHeader('Accept-Charset', 'x-user-defined');
         //   handle.responseType = 'arraybuffer';
         //} else {
         handle.overrideMimeType('text/plain; charset=x-user-defined');
         if (this.asynchronous) {
            handle.responseType = 'arraybuffer';
         }
         //}
      } else {
         // 文本内容
         handle.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      }
      // 设置自定义头信息
      var heads = this._heads;
      var count = heads.count();
      if (count > 0) {
         // 设置头信息
         for (var i = 0; i < count; i++) {
            var headName = heads.name(i);
            var headValue = heads.value(i);
            handle.setRequestHeader(headName, headValue);
         }
      }
      // 数据长度
      //if (!MO.Window.Browser.isBrowser(MO.EBrowser.Chrome)) {
      //   var contentLength = o._contentLength;
      //   if (contentLength > 0) {
      //      handle.setRequestHeader('content-length', contentLength);
      //   }
      //}
   }

   //==========================================================
   // <T>设置接收信息。</T>
   //==========================================================
   public setOutputData() {
      var handle = this._handle;
      // 传输格式
      if (this.contentCd == HttpContentEnum.Binary) {
         this._outputData = handle.response;
      } else {
         this._outputData = handle.responseText;
      }
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @return 内容
   //==========================================================
   public get content(): any {
      return this._outputData;
   }

   //==========================================================
   // <T>重置处理。</T>
   //==========================================================
   public reset() {
      // 重置链接
      this._handle.abort()
      // 清空属性
      this._attributes.clear();
      // 清空监听器
      this.loadListeners.clear();
      this.completeListeners.clear();
   }

   //==========================================================
   // <T>同步发送页面请求。</T>
   //==========================================================
   protected sendSync() {
      var handle = this._handle;
      handle.open(this.methodCd, this.url, false);
      this.setHeaders();
      handle.send(this._inputData);
      this.setOutputData();
      this.onConnectionComplete();
      LoggerUtil.info(this, 'Send http sync request. (method={1}, url={2})', this.methodCd, this.url);
   }

   //==========================================================
   // <T>异步发送页面请求。</T>
   //==========================================================
   protected sendAsync() {
      var handle = this._handle;
      handle.open(this.methodCd, this.url, true);
      this.setHeaders();
      handle.send(this._inputData);
      LoggerUtil.info(this, 'Send http asynchronous request. (method={1}, url={2})', this.methodCd, this.url);
   }

   //==========================================================
   // <T>发送页面请求。</T>
   //
   // @param url 发送地址
   // @param data 发送数据
   //==========================================================
   public send(url, data?: any) {
      // 设置参数
      this.url = url;
      this._input = data;
      // 设置状态
      this.methodCd = (data != null) ? HttpMethodEnum.Post : HttpMethodEnum.Get;
      this._statusFree = false;
      // 发送信息
      this.onConnectionSend();
      if (this.asynchronous) {
         this.sendAsync();
      } else {
         this.sendSync();
      }
      return this.content;
   }

   //==========================================================
   // <T>发送页面请求。</T>
   //
   // @param url 发送地址
   // @param data 发送数据
   //==========================================================
   public fetch(url, data?: any) {
      this.asynchronous = false;
      // 设置参数
      return this.send(url, data);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._heads = ObjectUtil.dispose(this._heads);
      this._attributes = ObjectUtil.dispose(this._attributes);
      this._event = ObjectUtil.dispose(this._event);
      this._input = null;
      this._inputData = null;
      this._output = null;
      this._outputData = null;
      var handle = this._handle;
      if (handle) {
         handle.onreadystatechange = null;
         this._handle = null;
      }
      // 父处理
      super.dispose();
   }
}
