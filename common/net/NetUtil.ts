import {PlatformEnum} from '../PlatformEnum';
import {RuntimeUtil} from '../RuntimeUtil';
import {ClassUtil} from '../reflect/ClassUtil';

//==========================================================
// <T>配置工具类。</T>
//
// @reference
// @author maocy
// @version 150104
//==========================================================
export class NetUtil {
   //..........................................................
   // @attribute
   public static httpActiveX = false;
   public static httpVendor = null;
   public static domActiveX = false;
   public static domVendor = null;

   //==========================================================
   // <T>构造配置工具类。</T>
   //
   // @method
   //==========================================================
   public static initialize() {
      // 检查平台
      if (RuntimeUtil.platformCd == PlatformEnum.NodeJs) {
         return;
      }
      //...........................................................
      var hWindow: any = window;
      var hDocument = hWindow.document;
      var error = null;
      //...........................................................
      // 获得请求方式
      if (hWindow.ActiveXObject && !hWindow.XMLHttpRequest) {
         var vs = ["MSXml2.XmlHTTP", "Microsoft.XmlHTTP", "MSXml.XmlHTTP", "MSXml3.XmlHTTP"];
         var c = vs.length;
         for (var n = 0; n < c; n++) {
            var v = vs[n];
            try {
               var hActiveX = new ActiveXObject(v);
               this.httpActiveX = true;
               this.httpVendor = v;
               break;
            } catch (e) {
               error = e;
            }
         }
      } else if (hWindow.XMLHttpRequest) {
         try {
            var hRequest = new XMLHttpRequest();
            this.httpActiveX = false;
         } catch (e) {
            error = e;
         }
      } else {
         console.log('Unknown http vendor.');
      }
      //...........................................................
      // 获得文档方式
      if (hWindow.ActiveXObject || !hWindow.DOMParser) {
         var vs = ["MSXml2.DOMDocument", "Microsoft.XmlDOM", "MSXml.DOMDocument", "MSXml3.XmlDOM"];
         var c = vs.length;
         for (var n = 0; n < c; n++) {
            var v = vs[n];
            try {
               var hActiveX = new ActiveXObject(v);
               this.domActiveX = true;
               this.domVendor = v;
               break;
            } catch (e) {
               error = e;
            }
         }
      } else if (hWindow.DOMParser && hDocument && hDocument.implementation && hDocument.implementation.createDocument) {
         try {
            var hActiveX = hDocument.implementation.createDocument('', '', null);
            this.domActiveX = false;
         } catch (e) {
            error = e;
         }
      } else {
         alert('Unknown dom vendor.');
      }
   }

   //==========================================================
   // 判断是否是一个节点(TNode)类型
   //
   // @method
   // @param n:Node:TNode 节点对象
   // @return Boolean 返回Boolean类型
   //==========================================================
   public static isNode(n) {
      return ClassUtil.isName(n, 'TNode');
   }

   //==========================================================
   // <T>创建一个配置链接。</T>
   //
   // @method
   // @return 配置链接
   //==========================================================
   public static createConnection() {
      var hConnection = null;
      if (this.httpActiveX) {
         hConnection = new ActiveXObject(this.httpVendor);
      } else {
         hConnection = new XMLHttpRequest();
      }
      // Error
      if (!hConnection) {
         alert('Create xml connection failure. (message=' + hConnection + ')');
      }
      return hConnection;
   }

   //==========================================================
   // <T>创建一个配置文档。</T>
   //
   // @method
   // @return 配置链接
   //==========================================================
   public static createDocument() {
      var hDocument = null;
      if (this.domActiveX) {
         hDocument = new ActiveXObject(this.domVendor);
      } else {
         hDocument = document.implementation.createDocument('', '', null);
      }
      // Error
      if (!hDocument) {
         alert('Create xml document failure. (message=' + hDocument + ')');
      }
      return hDocument;
   }
}
NetUtil.initialize();
