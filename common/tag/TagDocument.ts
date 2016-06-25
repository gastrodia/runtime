import {Fatal} from '../lang/Fatal';
import {ObjectBase} from '../lang/ObjectBase';
import {StringBuffer} from '../lang/StringBuffer';
import {StringUtil} from '../lang/StringUtil';
import {ClassUtil} from '../reflect/ClassUtil';
import {NodeTypeEnum} from '../xml/NodeTypeEnum';
import {XmlUtil} from '../xml/XmlUtil';
import {Tag} from './Tag';
import {TagEquals} from './TagEquals';
import {TagFalse} from './TagFalse';
import {TagNotEquals} from './TagNotEquals';
import {TagText} from './TagText';
import {TagTrue} from './TagTrue';
import {TagWrite} from './TagWrite';

//==========================================================
// <T>配置文档。</T>
//
// @tool
// @author maocy
// @version 150104
//==========================================================
export class TagDocument extends ObjectBase {
   // @attribute
   public space: string = null;
   //_root = MO.Class.register(o, MO.AGetter('_root'));
   public root: Tag = null;

   //==========================================================
   // <T>创建一个标签对象。</T>
   //
   // @method
   // @param name  名称
   // @return FTag 标签
   //==========================================================
   public create(p) {
      // 获得名称
      var spaceName = this.space + '_';
      var name = null;
      if (StringUtil.startsWith(p, spaceName)) {
         name = p.substring(spaceName.length);
      } else {
         name = p;
      }
      // 创建节点
      var tag = null;
      switch (name) {
         case 'source':
            tag = ClassUtil.create(Tag);
            break;
         case 'write':
            tag = ClassUtil.create(TagWrite);
            break;
         case 'true':
            tag = ClassUtil.create(TagTrue);
            break;
         case 'false':
            tag = ClassUtil.create(TagFalse);
            break;
         case 'equals':
            tag = ClassUtil.create(TagEquals);
            break;
         case 'notEquals':
            tag = ClassUtil.create(TagNotEquals);
            break;
         default:
            throw new Fatal(this, 'Unknown tag type. (name={1})', name);
      }
      return tag;
   }

   //===========================================================
   // 遍历构建XML节点树
   //
   // @method
   // @param node 父节点
   // @param element:XmlElement 页面元素
   // @see RXml.fromText
   // @see TXmlDoc.create
   //===========================================================
   public loadNode(node, element) {
      // 创建节点
      var tag = this.create(element.nodeName);
      if (node) {
         node.push(tag);
      } else {
         this.root = tag;
      }
      // 建立属性集合
      var elementAttributes = element.attributes;
      if (elementAttributes) {
         var elementCount = elementAttributes.length;
         for (var i: number = 0; i < elementCount; i++) {
            var elementAttribute = elementAttributes[i];
            if (elementAttribute.nodeName) {
               tag.set(elementAttribute.nodeName, XmlUtil.formatText(elementAttribute.value));
            }
         }
      }
      // 建立标签集合
      var elementNodes = element.childNodes
      if (elementNodes) {
         var elementCount = elementNodes.length;
         for (var i: number = 0; i < elementCount; i++) {
            var elementNode = elementNodes[i];
            switch (elementNode.nodeType) {
               case NodeTypeEnum.Text:
                  var tagText: TagText = ClassUtil.create(TagText);
                  tagText.text = elementNode.nodeValue;
                  tag.push(tagText);
                  break;
               case NodeTypeEnum.Data:
                  var tagText: TagText = ClassUtil.create(TagText);
                  tagText.text = elementNode.data;
                  tag.push(tagText);
                  break;
               case NodeTypeEnum.Node:
                  this.loadNode(tag, elementNode);
                  break;
            }
         }
      }
   }

   //==========================================================
   // <T>加载来源。</T>
   //
   // @method
   // @param source:String 来源
   //==========================================================
   public load(source) {
      // 格式化代码
      var value = '<source>' + source + '</source>'
      value = value.replace(new RegExp('<' + this.space + ':', 'g'), '<' + this.space + '_');
      value = value.replace(new RegExp('</' + this.space + ':', 'g'), '</' + this.space + '_');
      value = value.replace(new RegExp('&', 'g'), '&amp;');
      value = value.replace(new RegExp(' < ', 'g'), ' &lt; ');
      value = value.replace(new RegExp(' <= ', 'g'), ' &lt;= ');
      value = value.replace(new RegExp(' > ', 'g'), ' &gt; ');
      value = value.replace(new RegExp(' >= ', 'g'), ' &gt;= ');
      // 解析内容
      var xnode = XmlUtil.makeString(value);
      this.loadNode(null, xnode.firstChild);
   }

   //==========================================================
   // <T>解析处理。</T>
   //
   // @method
   // @param context:FTagContext 环境
   //==========================================================
   public parse(context) {
      context.resetSource();
      this.root.parse(context);
      return context.source();
   }

   //==========================================================
   // <T>获得运行信息。</T>
   //
   // @method
   // @return String 运行信息
   //==========================================================
   public dump() {
      var result = new StringBuffer();
      result.appendLine(ClassUtil.dump(this));
      //r.appendLine(this.root().dump(r));
      return result.flush();
   }
}
