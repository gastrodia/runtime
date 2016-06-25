import {Fatal} from '../lang/Fatal';
import {LoggerUtil} from '../lang/LoggerUtil';
import {XmlDocument} from '../xml/XmlDocument';
import {XmlUtil} from '../xml/XmlUtil';
import {HttpConnection} from './HttpConnection';
import {HttpContentEnum} from './HttpContentEnum';

//==========================================================
// <T>配置通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
export class XmlConnection extends HttpConnection {
   // 输入节点
   public _inputNode;
   // 输出节点
   public _outputNode;

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
      var data = this._input;
      if (data) {
         var xml = null;
         if (data.constructor == String) {
            xml = data;
            this._inputNode = null;
         } else if (data.constructor == xml.FXmlNode) {
            var document = new xml.FXmlDocument();
            document.setRoot(data);
            xml = document.xml();
            this._inputNode = data;
         } else if (data.constructor == xml.FXmlDocument) {
            xml = data.xml();
            this._inputNode = data.root();
         } else {
            throw new Fatal(this, 'Unknown send data type.');
         }
         this._inputData = xml;
         this._contentLength = xml.length;
      }
   }

   //==========================================================
   // <T>事件响应处理。</T>
   //==========================================================
   public onConnectionComplete() {
      var handle = this._handle;
      // 获得返回的文档对象
      var element = null;
      if (handle.responseXML) {
         element = handle.responseXML.documentElement;
      } else if (handle.responseXml) {
         element = handle.responseXml.documentElement;
      } else {
         throw new Fatal(this, "Fetch xml data failure.");
      }
      if (!element) {
         return LoggerUtil.fatal(this, 'Read xml error. (url={1})', this.url)
      }
      // 建立文档对象
      var document = new XmlDocument();
      XmlUtil.buildNode(document, null, element);
      var root = this._outputNode = document.root();
      // 完成处理
      this._statusFree = true;
      // 完成处理
      var event = this._event;
      event.connection = this;
      event.document = document;
      event.root = root;
      event.content = root;
      this.loadListeners.process(event);
      event.dispose();
      // 异步处理后清空属性
      if (this.asynchronous) {
         this._input = null;
         this._inputNode = null;
         this._output = null;
         this._outputNode = null;
      }
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @return 内容
   //==========================================================
   public get content(): any {
      return this._outputNode;
   }
}
