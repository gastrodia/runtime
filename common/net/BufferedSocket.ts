import {ObjectUtil} from '../lang/ObjectUtil';
import {Socket} from './Socket';

//==========================================================
// <T>网络端口。</T>
//
// @class
// @author maocy
// @history 15029
//==========================================================
export class BufferedSocket extends Socket {
   //..........................................................
   // @attribute
   protected _bufferSends: Array<string> = new Array<string>();
   protected _bufferReceives: Array<string> = new Array<string>();

   //==========================================================
   // <T>打开处理。</T>
   //
   // @method
   // @param event:Object 事件
   //==========================================================
   public onOpen(event) {
      super.onOpen(event)
      // 逻辑处理
      //o.process();
   }

   //==========================================================
   // <T>错误处理。</T>
   //
   // @method
   // @param event:Object 事件
   //==========================================================
   public ohError(event) {
      var o = this._linker;
   }

   //==========================================================
   // <T>消息处理。</T>
   //
   // @method
   // @param event:Object 事件
   //==========================================================
   public ohMessage(event) {
      var o = this._linker;
   }

   //==========================================================
   // <T>关闭处理。</T>
   //
   // @method
   // @param event:Object 事件
   //==========================================================
   public ohClose(event) {
      var o = this._linker;
      o._connected = false;
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
      //o._bufferSends = new MO.TObjects();
      //o._bufferReceives = new MO.TObjects();
   }

   //==========================================================
   // <T>增加一个发送数据。</T>
   //
   // @method
   // @param message:String 消息
   //==========================================================
   public push(message) {
      this._bufferSends.push(message);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public process() {
      var o = this;
      // 检查是否已经链接
      if (!o._connected) {
         return false;
      }
      // 发送未发送数据
      var sends = o._bufferSends;
      //if (!sends.isEmpty()) {
      //var count = sends.count();
      //for (var i = 0; i < count; i++) {
      //var message = sends.at(i);
      //o.send(message);
      //}
      //sends.clear();
      //}
      return true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._bufferSends = ObjectUtil.dispose(this._bufferSends);
      this._bufferReceives = ObjectUtil.dispose(this._bufferReceives);
      // 父处理
      super.dispose();
   }
}
