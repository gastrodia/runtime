import {Fatal} from '../lang/Fatal';
import {ObjectBase} from '../lang/ObjectBase';
import {StringBuffer} from '../lang/StringBuffer';
import {ClassUtil} from '../reflect/ClassUtil';
import {XmlNode} from '../xml/XmlNode';

//==========================================================
// <T>配置文档。</T>
//
// @tool
// @author maocy
// @version 150104
//==========================================================
export class XmlDocument extends ObjectBase {
   // @attribute
   protected _root: XmlNode = null;

   //==========================================================
   // <T>创建一个节点对象。</T>
   //
   // @method
   // @param n:name:String 节点名称
   // @param a:attributes:TAttributes 节点属性
   // @param v:value:String 节点名称
   // @return TXmlNode 节点对象
   //==========================================================
   public create(n, a, v) {
      var r: any = new XmlNode();
      r._name = n;
      r._attributes = a;
      r._value = v;
      return r;
   }

   //==========================================================
   // <T>获得文档的根节点。</T>
   // <P>如果文档的根节点不存在，则创建一个新的根节点。</P>
   //
   // @method
   // @return TXmlNode 根节点
   //==========================================================
   public root() {
      var o = this;
      var r: any = o._root;
      if (!r) {
         r = o._root = new XmlNode();
         r._name = 'Configuration';
      }
      return r;
   }

   //==========================================================
   // <T>设置文档的根节点。</T>
   //
   // @method
   // @param p:node:TXmlNode 根节点
   //==========================================================
   public setRoot(p) {
      var o = this;
      if (!o._root) {
         o._root = p;
      } else {
         throw new Fatal(o, 'Root node is already exists.');
      }
   }

   //==========================================================
   // <T>获得配置字符串。</T>
   //
   // @method
   // @return String 配置字符串
   //==========================================================
   public xml() {
      var xml = new StringBuffer();
      xml.append("<?xml version='1.0' encoding='UTF-8'?>");
      this.root().innerXml(xml, 0);
      return xml.flush();
   }

   //==========================================================
   // <T>获得内部调试信息。</T>
   //
   // @method
   // @return String 调试信息
   //==========================================================
   public dump() {
      var o = this;
      var r = new StringBuffer();
      r.appendLine(ClassUtil.shortName(o));
      o.root().dump(r);
      return r.flush();
   }
}
