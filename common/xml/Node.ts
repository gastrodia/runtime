import {Attributes} from '../lang/Attributes';
import {BooleanUtil} from '../lang/BooleanUtil';
import {Fatal} from '../lang/Fatal';
import {FloatUtil} from '../lang/FloatUtil';
import {IntegerUtil} from '../lang/IntegerUtil';
import {ObjectBase} from '../lang/ObjectBase';
import {Objects} from '../lang/Objects';
import {StringUtil} from '../lang/StringUtil';
import {ClassUtil} from '../reflect/ClassUtil';

//==========================================================
// <T>节点工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
export class Node extends ObjectBase {
   // 名称
   protected _name: string;
   // 内容
   protected _value;
   // 属性集合
   protected _attributes: Attributes;
   // 节点集合
   protected _nodes;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   // @param name 名称
   //==========================================================
   public constructor(name: string = 'Node') {
      super();
      // 设置属性
      this._name = name;
   }

   //==========================================================
   // <T>判断当前节点是否指定名称。</T>
   //
   // @method
   // @param n:name:String 节点名称
   // @return Boolean 是否相等
   //==========================================================
   public isName(n) {
      return StringUtil.equals(this._name, n);
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return String 名称
   //==========================================================
   public name() {
      return this._name;
   }

   //==========================================================
   // <T>设置名称。</T>
   //
   // @method
   // @param p:name:String 名称
   //==========================================================
   public setName(p) {
      this._name = p;
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @return 内容
   //==========================================================
   public value() {
      return this._value;
   }

   //==========================================================
   // <T>设置内容。</T>
   //
   // @param value 内容
   //==========================================================
   public setValue(value) {
      this._value = value;
   }

   //==========================================================
   // <T>是否包含了指定的属性。</T>
   //
   // @param 属性名称
   // @return 是否包含
   //==========================================================
   public contains(name) {
      var attributes = this._attributes;
      return attributes ? attributes.contains(name) : false;
   }

   //==========================================================
   // <T>判断当前节点下是否含有何属性。</T>
   //
   // @return 是否含有
   //==========================================================
   public hasAttribute() {
      var attributes = this._attributes;
      return attributes ? !attributes.isEmpty() : false;
   }

   //==========================================================
   // <T>取得节点的所有属性集合。</T>
   //
   // @return 属性集合
   //==========================================================
   public attributes() {
      var attributes = this._attributes;
      if (!attributes) {
         attributes = this._attributes = new Attributes();
      }
      return attributes;
   }

   //==========================================================
   // <T>判断当前节点下是否有含有子节点。</T>
   //
   // @method
   // @return Boolean 是否含有
   //==========================================================
   public hasNode() {
      var nodes = this._nodes;
      return nodes ? !nodes.isEmpty() : false;
   }

   //==========================================================
   // <T>获得子节点总数。</T>
   //
   // @method
   // @return Integer 节点总数
   //==========================================================
   public nodeCount() {
      var nodes = this._nodes;
      return nodes ? nodes.count() : 0;
   }

   //==========================================================
   // <T>获得指定索引位置的节点。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return TNode 节点
   //==========================================================
   public node(index) {
      var nodes = this._nodes;
      return nodes ? nodes.at(index) : null;
   }

   //==========================================================
   // <T>取得节点集合。</T>
   //
   // @method
   // @return TObjects 节点集合
   //==========================================================
   public nodes() {
      var o = this;
      var nodes = o._nodes;
      if (!nodes) {
         nodes = o._nodes = new Objects();
      }
      return nodes;
   }

   //==========================================================
   // <T>取得属性对应的属性值。</T>
   //
   // @method
   // @param name:String 属性名称
   // @param value:String 属性值
   // @return String 字符串内容
   //==========================================================
   public get(n, v) {
      return this._attributes ? this._attributes.get(n, v) : null;
   }

   //==========================================================
   // <T>取得属性对应的数字属性值。</T>
   //
   // @method
   // @param name:String 属性名称
   // @param defaultValue:String 属性值
   // @return Integer 数字内容
   //==========================================================
   public getInteger(name, defaultValue) {
      return IntegerUtil.parse(this.get(name, defaultValue));
   }

   //==========================================================
   // <T>设置属性对应的属性值。</T>
   //
   // @method
   // @param name:String 属性名称
   // @param value:String 属性值
   //==========================================================
   public set(name, value) {
      if (value != null) {
         this.attributes().set(name, value);
      }
   }

   //==========================================================
   // <T>设置属性对应的非空属性值。</T>
   //
   // @method
   // @param name:String 属性名称
   // @param value:String 属性值
   //==========================================================
   public setNvl(name, value) {
      if (!StringUtil.isEmpty(value)) {
         this.attributes().set(name, value);
      }
   }

   //==========================================================
   // <T>设置属性对应的属性值。</T>
   //
   // @method
   // @param n:name:String 属性名称
   // @param v:value:String 属性值
   //==========================================================
   public setBoolean(n, v) {
      if (v != null) {
         this.attributes().set(n, BooleanUtil.format(v));
      }
   }

   //==========================================================
   // <T>设置属性对应的属性值。</T>
   //
   // @method
   // @param n:name:String 属性名称
   // @param v:value:String 属性值
   //==========================================================
   public setFloat(n, v) {
      if (v != null) {
         this.attributes().set(n, FloatUtil.format(v));
      }
   }

   //==========================================================
   // <T>根据节点名称查找节点。</T>
   //
   // @method
   // @param p:name:String 要添加的节点
   // @return TNode 返回查找到的节点
   //==========================================================
   public find(p) {
      var o = this;
      if (o.hasNode()) {
         var ns = o._nodes;
         var c = ns.count();
         for (var i = 0; i < c; i++) {
            var n = ns.get(i);
            if (n.isName(p)) {
               return n;
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>根据节点名称和属性查找节点。</T>
   //
   // @method
   // @param pn:name:String 属性名称
   // @param pv:value:String 属性值
   // @return TNode 对应的节点
   //==========================================================
   public findNode(pn, pv) {
      var o = this;
      if (o.hasNode()) {
         var ns = o._nodes;
         var nc = ns.count();
         // 检查参数
         var as = arguments;
         var ac = as.length;
         if ((ac - 1) % 2) {
            throw new Fatal(this, 'Attributes is not pair. (length={1})', ac);
         }
         // 查找所有节点
         for (var ni = 0; ni < nc; ni++) {
            var n = ns.get(ni);
            // 检查名称
            if (pn != null) {
               if (!n.isName(pn)) {
                  continue;
               }
            }
            // 检查属性
            var f = true;
            for (var ai = 1; ai < ac; ai += 2) {
               if (n.get(as[ai]) != as[ai + 1]) {
                  f = false;
                  break;
               }
            }
            if (f) {
               return n;
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>根据指定的属性名称和属性值查找节点。</T>
   //
   // @method
   // @param pn:name:String 属性名称
   // @param pv:value:String 属性值
   // @return TNode 对应的节点
   //==========================================================
   public searchNode(pn, pv) {
      var o = this;
      if (o.hasAttribute()) {
         if (o._attributes.get(pn) == pv) {
            return o;
         }
      }
      if (o.hasNode()) {
         var ns = o._nodes;
         var c = ns.count();
         for (var i = 0; i < c; i++) {
            var n = ns.get(n).searchNode(pn, pv);
            if (n != null) {
               return n;
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>给当前节点添加一个子节点。</T>
   //
   // @method
   // @param p:node:TNode 节点
   //==========================================================
   public push(p) {
      var o = this;
      o.nodes().push(p);
   }

   //==========================================================
   // <T>将构建成xml格式的字符串对象转换为字符串。</T>
   //
   // @return String 字符串
   //==========================================================
   public toString(): string {
      return this.dump();
   }

   //==========================================================
   // <T>获取指定节点的内部信息。</T>
   //
   // @param dump:dump:String 输出字符串
   // @param node:node:TNode  指定节点
   // @param space:space:String 间隔空间
   // @return String 调试信息
   //==========================================================
   public innerDump(dump, node, space) {
      if (space == null) {
         space = '';
      }
      dump.append(space, node._name, '(', ClassUtil.shortName(node), ')');
      var attributes = node._attributes;
      if (attributes) {
         var count = attributes.count();
         dump.append(' [', count, ':');
         for (var n = 0; n < count; n++) {
            if (n > 0) {
               dump.append(' ');
            }
            dump.append(attributes.name(n), '=', attributes.value(n));
            if (n < count - 1) {
               dump.append(',');
            }
         }
         dump.append(']');
      }
      if (node._value) {
         var value = node._value.toString();
         if (!StringUtil.isEmpty(value)) {
            dump.append(' {', value.length, ':', value, '}');
         }
      }
      var nodes = node._nodes;
      if (nodes) {
         var count = nodes.count();
         dump.append('\n');
         for (var n = 0; n < count; n++) {
            nodes.get(n).dump(dump, space + '   ');
            if (n < count - 1) {
               dump.append('\n');
            }
         }
      }
      return dump;
   }

   //==========================================================
   //<T>获取指定节点的内部信息。</T>
   //
   // @param dump:dump:String 输出字符串
   // @param space:space:String 间隔空间
   // @return String 调试信息
   //==========================================================
   public dump(d: any = null, space: string = null) {
      return this.innerDump(StringUtil.nvlString(d), this, space);
   }
}
