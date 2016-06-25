import {Fatal} from '../lang/Fatal';
import {ObjectBase} from '../lang/ObjectBase';
import {Objects} from '../lang/Objects';
import {ResultEnum} from '../lang/ResultEnum';
import {StringBuffer} from '../lang/StringBuffer';
import {StringUtil} from '../lang/StringUtil';
import {ClassUtil} from '../reflect/ClassUtil';

//==========================================================
// <T>标签类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class Tag extends ObjectBase {
   //..........................................................
   // @attribute
   protected _name: string;
   protected _children: Objects<Tag>;
   protected _trimLeft: boolean;
   protected _trimRight: boolean;

   //==========================================================
   // <T>构建处理。</T>
   //==========================================================
   public constructor() {
      super();
      this._name = 'Tag';
   }

   //==========================================================
   // <T>开始处理。</T>
   //
   // @param context 环境
   // @return 处理结果
   //==========================================================
   public onBegin(context) {
      return ResultEnum.Continue;
   }

   //==========================================================
   // <T>结束处理。</T>
   //
   // @param context 环境
   // @return 处理结果
   //==========================================================
   public onEnd(context) {
      return ResultEnum.Continue;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @return 名称
   //==========================================================
   public name() {
      return this._name;
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @param name 名称
   // @param value 内容
   //==========================================================
   public set(name, value) {
      throw new Fatal(this, 'Unknown attribute name. (name={1}, value={2})', name, value);
   }

   //==========================================================
   // <T>增加一个子标签。</T>
   //
   // @method
   // @param tag 子标签
   //==========================================================
   public push(tag) {
      var children = this._children;
      if (!children) {
         children = this._children = new Objects<Tag>();
      }
      children.push(tag);
   }

   //==========================================================
   // <T>解析处理。</T>
   //
   // @param context 环境
   //==========================================================
   public parse(context) {
      // 开始处理
      var resultCd = this.onBegin(context);
      if (resultCd == ResultEnum.Continue) {
         // 子标签处理
         var children = this._children;
         if (children) {
            var count = children.count();
            for (var i = 0; i < count; i++) {
               var child = children.get(i);
               resultCd = child.parse(context);
               if (resultCd == ResultEnum.Cancel) {
                  return resultCd;
               }
               context._trimLeft = child._trimLeft;
               context._trimRight = child._trimRight;
            }
         }
         return this.onEnd(context);
      }
      return resultCd;
   }

   //==========================================================
   //<T>获得字符串。</T>
   //
   // @return 字符串
   //==========================================================
   public toString(): string {
      return null;
   }

   //==========================================================
   //<T>获取运行时信息。</T>
   //
   // @method
   // @param ps:source:TString 信息
   // @param pt:tag:FTag 标签
   // @param pl:level:Integer 级别
   //==========================================================
   public innerDump(ps, pt, pl) {
      ps.appendRepeat('   ', pl);
      ps.append(ClassUtil.dump(pt));
      // 追加属性
      var s = pt.toString();
      if (!StringUtil.isEmpty(s)) {
         ps.append(' [', s, ']');
      }
      // 追加子标签
      var children = pt._children;
      if (children) {
         ps.append('\n');
         var count = children.count();
         for (var i = 0; i < count; i++) {
            var child = children.get(i);
            this.innerDump(ps, child, pl + 1);
            if (i < count - 1) {
               ps.append('\n');
            }
         }
      }
   }

   //==========================================================
   //<T>获取运行时信息。</T>
   //
   // @method
   // @return String 运行信息
   //==========================================================
   public dump() {
      var result = new StringBuffer();
      this.innerDump(result, this, 0);
      return result.flush();
   }
}
