import {HttpConnection} from './HttpConnection';
import {HttpContentEnum} from './HttpContentEnum';

//==========================================================
// <T>配置通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
export class JsonConnection extends HttpConnection {
   // 内容
   protected _content: any;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.contentCd = HttpContentEnum.Text;
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
         } else {
            var value = this._inputData = JSON.stringify(input)
            this._contentLength = value.length;
         }
      }
   }

   //==========================================================
   // <T>事件响应处理。</T>
   //==========================================================
   public onConnectionComplete() {
      this._statusFree = true;
      // 解析内容
      var content = null;
      var data = this._outputData;
      if (data) {
         content = this._content = JSON.parse(data);
      }
      // 加载处理
      var event = this._event;
      event.connection = this;
      event.data = data;
      event.content = content;
      this.loadListeners.process(event);
      // 完成处理
      this.completeListeners.process(event);
   }

   //==========================================================
   // <T>获得内容。</T>
   //==========================================================
   public get content(): any {
      return this._content;
   }
}
