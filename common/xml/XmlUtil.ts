import {PlatformEnum} from '../PlatformEnum';
import {RuntimeUtil} from '../RuntimeUtil';
import {Attributes} from '../lang/Attributes';
import {Fatal} from '../lang/Fatal';
import {StringBuffer} from '../lang/StringBuffer';
import {StringUtil} from '../lang/StringUtil';
import {ClassUtil} from '../reflect/ClassUtil';
import {MethodUtil} from '../reflect/MethodUtil';
import {Node} from './Node';
import {NodeTypeEnum} from './NodeTypeEnum';
import {XmlDocument} from './XmlDocument';

//==========================================================
// <T>配置工具类。</T>
//
// @reference
// @author maocy
// @version 150104
//==========================================================
export class XmlUtil {
   public static httpActiveX = false;
   public static httpVendor = null;
   public static domActiveX = false;
   public static domVendor = null;

   //==========================================================
   // <T>构造配置工具类。</T>
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
         // console.log('Unknown http vendor.');
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
   // <T>格式化文本。</T>
   //
   // @method
   // @param s:string:String 字符串
   // @return String  替换后的字符串
   //==========================================================
   public static formatText(s) {
      if (s != null) {
         s = s.replace(/\\n/g, '\n');
      }
      return s;
   }

   //==========================================================
   // <T>替换字符串中的转义字符。</T>
   //
   // @method
   // @param s:string:FString 字符串
   // @param v:value:String 内容
   // @return FString 字符串
   //==========================================================
   public static buildText(s, v) {
      if (v != null) {
         v = v.toString();
         var c = v.length;
         for (var i = 0; i < c; i++) {
            var ch = v.charAt(i);
            switch (ch) {
               case '<':
                  s.append('&lt;');
                  break;
               case '>':
                  s.append('&gt;');
                  break;
               case '&':
                  s.append('&amp;');
                  break;
               case '\'':
                  s.append('&apos;');
                  break;
               case '"':
                  s.append('&quot;');
                  break;
               case '\r':
                  continue;
               case '\n':
                  s.append('\\n');
                  break;
               default:
                  s.append(ch);
            }
         }
      }
      return s;
   }

   //==========================================================
   // 遍历构建XML节点树
   //
   // @method
   // @param pd:document:TXmlDocument JS系统中的XML文件
   // @param pn:node:TXmlNode 父节点
   // @param pe:element:XmlElement 页面元素
   // @see RXml.fromText
   // @see TXmlDoc.create
   //==========================================================
   public static buildNode(pd, pn, pe) {
      // 建立属性集合
      var xas = null;
      var eas = pe.attributes;
      if (eas) {
         var eac = eas.length;
         if (eac > 0) {
            xas = new Attributes();
            for (var n = 0; n < eac; n++) {
               var ea = eas[n];
               if (ea.nodeName) {
                  xas.set(ea.nodeName, this.formatText(ea.value));
               }
            }
         }
      }
      // 建立文本
      var xt = new StringBuffer();
      xt.append(pe.value);
      var ecs = pe.childNodes
      if (ecs) {
         var ecc = ecs.length;
         for (var n = 0; n < ecc; n++) {
            var en = ecs[n];
            var ect = en.nodeType;
            if (ect == NodeTypeEnum.Text) {
               xt.append(en.nodeValue);
            } else if (ect == NodeTypeEnum.Data) {
               xt.append(en.data);
            }
         }
      }
      // 创建节点
      var xc = pd.create(pe.nodeName, xas, StringUtil.trim(xt.toString()));
      if (pn) {
         pn.push(xc);
      } else {
         pd._root = xc;
      }
      // 创建子节点集合
      if (ecs) {
         var cc = ecs.length;
         for (var n = 0; n < cc; n++) {
            if (ecs[n].nodeType == NodeTypeEnum.Node) {
               this.buildNode(pd, xc, ecs[n]);
            }
         }
      }
   }

   //==========================================================
   // <T>根据页面中的配置节点对象构建配置节点。</T>
   //
   // @method
   // @param p:document:document 嵌在页面中的配置节点
   // @return TXmlNode 配置节点
   //==========================================================
   public static makeNode(p) {
      var o: any = this;
      if (p.documentElement) {
         var d = new XmlDocument();
         o.buildNode(d, null, p.documentElement);
         return d.root();
      } else if (p.tagName == 'SCRIPT') {
         var s = p.textContent;
         if (!s) {
            s = p.text;
         }
         if (s) {
            var d = new XmlDocument();
            var xd = o.makeString(s)
            o.buildNode(d, null, xd.documentElement);
            return d.root();
         }
      }
      return null;
   }

   //==========================================================
   // <T>根据页面中的配置节点对象构建配置文档。</T>
   //
   // @method
   // @param p:document:document 嵌在页面中的配置节点
   // @return TXmlDocument 配置文档
   //==========================================================
   public static makeDocument(p) {
      var d = new XmlDocument();
      if (p.documentElement) {
         this.buildNode(d, null, p.documentElement);
      }
      return d;
   }

   //==========================================================
   // <T>解包节点字符串。</T>
   //
   // @method
   // @param s:string:String 打包字符串
   // @param n:node:TNode 节点对象
   // @return TNode 节点对象
   //==========================================================
   public static unpack(s, n) {
      var o = this;
      if (StringUtil.isEmpty(s)) {
         return null;
      }
      if (!n) {
         n = new Node();
      }
      var np = new Attributes();
      np.unpack(s);
      n.name = np.get('name');
      n.value = np.get('value');
      if (np.contains('attributes')) {
         n.attributes().unpack(np.get('attributes'));
      }
      if (np.contains('nodes')) {
         //var ns = new sk.common.FStrings();
         //ns.unpack(np.get('nodes'));
         //for (var i = 0; i < ns.count; i++) {
         //   o.unpack(ns.get(i), n.create());
         //}
      }
      return n;
   }

   //==========================================================
   // <T>存储对象。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   // @param item:Object 对象
   //==========================================================
   public static saveObject(xconfig, tag, item) {
      var o = this;
      for (var name in item) {
         var value = item[name];
         if (value != null) {
            var xtag = xconfig.create(tag);
            xtag.set('name', name);
            var typeName = typeof (value);
            switch (typeName) {
               case 'boolean':
               case 'number':
               case 'date':
               case 'string':
                  xtag.setValue(value);
                  break;
               case 'function':
                  xtag.setValue(MethodUtil.shortName(value));
                  break;
               case 'object':
                  o.saveObject(xtag, 'Property', value);
                  break;
               default:
                  throw new Fatal(this, 'Invalid object.');
            }
         }
      }
   }

   // //==========================================================
   // // <T>格式化文本。</T>
   // //
   // // @method
   // // @param s:string:String 字符串
   // // @return String  替换后的字符串
   // //==========================================================
   // public static _formatText(s) {
   //    if (s != null) {
   //       s = s.replace(/\\n/g, '\n');
   //    }
   //    return s;
   // }

   // //==========================================================
   // // <T>替换字符串中的转义字符。</T>
   // //
   // // @method
   // // @param s:string:FString 字符串
   // // @param v:value:String 内容
   // // @return FString 字符串
   // //==========================================================
   // public static buildText(s, v) {
   //    if (v != null) {
   //       v = v.toString();
   //       var c = v.length;
   //       for (var i = 0; i < c; i++) {
   //          var ch = v.charAt(i);
   //          switch (ch) {
   //             case '<':
   //                s.append('&lt;');
   //                break;
   //             case '>':
   //                s.append('&gt;');
   //                break;
   //             case '&':
   //                s.append('&amp;');
   //                break;
   //             case '\'':
   //                s.append('&apos;');
   //                break;
   //             case '"':
   //                s.append('&quot;');
   //                break;
   //             case '\r':
   //                continue;
   //             case '\n':
   //                s.append('\\n');
   //                break;
   //             default:
   //                s.append(ch);
   //          }
   //       }
   //    }
   //    return s;
   // }

   // //==========================================================
   // // 遍历构建XML节点树
   // //
   // // @method
   // // @param pd:document:TXmlDocument JS系统中的XML文件
   // // @param pn:node:TXmlNode 父节点
   // // @param pe:element:XmlElement 页面元素
   // // @see RXmlUtil.fromText
   // // @see TXmlDoc.create
   // //==========================================================
   // public static buildNode(pd, pn, pe) {
   //    // 建立属性集合
   //    var xas = null;
   //    var eas = pe.attributes;
   //    if (eas) {
   //       var eac = eas.length;
   //       if (eac > 0) {
   //          xas = new FAttributes();
   //          for (var n = 0; n < eac; n++) {
   //             var ea = eas[n];
   //             if (ea.nodeName) {
   //                xas.set(ea.nodeName, this.formatText(ea.value));
   //             }
   //          }
   //       }
   //    }
   //    // 建立文本
   //    var xt = new FString();
   //    xt.append(pe.value);
   //    var ecs = pe.childNodes
   //    if (ecs) {
   //       var ecc = ecs.length;
   //       for (var n = 0; n < ecc; n++) {
   //          var en = ecs[n];
   //          var ect = en.nodeType;
   //          if (ect == MO.ENodeType.Text) {
   //             xt.append(en.nodeValue);
   //          } else if (ect == MO.ENodeType.Data) {
   //             xt.append(en.data);
   //          }
   //       }
   //    }
   //    // 创建节点
   //    var xc = pd.create(pe.nodeName, xas, RString.trim(xt.toString()));
   //    if (pn) {
   //       pn.push(xc);
   //    } else {
   //       pd._root = xc;
   //    }
   //    // 创建子节点集合
   //    if (ecs) {
   //       var cc = ecs.length;
   //       for (var n = 0; n < cc; n++) {
   //          if (ecs[n].nodeType == ENodeType.Node) {
   //             this.buildNode(pd, xc, ecs[n]);
   //          }
   //       }
   //    }
   // }

   //==========================================================
   // <T>加载一个配置字符串。</T>
   //
   // @method
   // @param n:Node:TNode 节点对象
   // @return Boolean 返回Boolean类型
   //==========================================================
   public static makeString(source: string): any {
      var xconfig = null;
      // 判断浏览器的类型
      if (this.domActiveX) {
         xconfig = new ActiveXObject(this.domVendor);
         xconfig.async = false;
         xconfig.loadXML(source);
      } else {
         var p = new DOMParser();
         xconfig = p.parseFromString(source, 'text/xml');
      }
      return xconfig;
   }

   // //==========================================================
   // // <T>根据页面中的配置节点对象构建配置节点。</T>
   // //
   // // @method
   // // @param p:document:document 嵌在页面中的配置节点
   // // @return TXmlNode 配置节点
   // //==========================================================
   // public static makeNode(p) {
   //    var o = this;
   //    if (p.documentElement) {
   //       var d = new MO.TXmlDocument();
   //       o.buildNode(d, null, p.documentElement);
   //       return d.root();
   //    } else if (p.tagName == 'SCRIPT') {
   //       var s = p.textContent;
   //       if (!s) {
   //          s = p.text;
   //       }
   //       if (s) {
   //          var d = new MO.TXmlDocument();
   //          var xd = o.makeString(s)
   //          o.buildNode(d, null, xd.documentElement);
   //          return d.root();
   //       }
   //    }
   //    return null;
   // }

   // //==========================================================
   // // <T>根据页面中的配置节点对象构建配置文档。</T>
   // //
   // // @method
   // // @param p:document:document 嵌在页面中的配置节点
   // // @return TXmlDocument 配置文档
   // //==========================================================
   // public static makeDocument(p) {
   //    var d = new MO.TXmlDocument();
   //    if (p.documentElement) {
   //       this.buildNode(d, null, p.documentElement);
   //    }
   //    return d;
   // }

   // //==========================================================
   // // <T>解包节点字符串。</T>
   // //
   // // @method
   // // @param s:string:String 打包字符串
   // // @param n:node:TNode 节点对象
   // // @return TNode 节点对象
   // //==========================================================
   // public static unpack(s, n) {
   //    var this = this;
   //    if (MO.Lang.String.isEmpty(s)) {
   //       return null;
   //    }
   //    if (!n) {
   //       n = new MO.TNode();
   //    }
   //    var np = new MO.TAttributes();
   //    np.unpack(s);
   //    n.name = np.get('name');
   //    n.value = np.get('value');
   //    if (np.contains('attributes')) {
   //       n.attributes().unpack(np.get('attributes'));
   //    }
   //    if (np.contains('nodes')) {
   //       var ns = new MO.TStrings();
   //       ns.unpack(np.get('nodes'));
   //       for (var i = 0; i < ns.count; i++) {
   //          this.unpack(ns.get(i), n.create());
   //       }
   //    }
   //    return n;
   // }
}
XmlUtil.initialize();
