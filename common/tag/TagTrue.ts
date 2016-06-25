import {BooleanUtil} from '../lang/BooleanUtil';
import {ResultEnum} from '../lang/ResultEnum';
import {Tag} from './Tag';
import {TagContext} from './TagContext';

//==========================================================
// <T>标签判断真类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class TagTrue extends Tag {
   public trimLeft = true;
   public source = null;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param p:context:FTagContext 环境
   // @return EResult 处理结果
   //==========================================================
   public onBegin(context: TagContext): ResultEnum {
      var result = false;
      var ns = this.source.split('|');
      var c = ns.length;
      for (var i: number = 0; i < c; i++) {
         var n = ns[i]
         var v = context.get(n);
         if (BooleanUtil.parse(v)) {
            result = true;
            break;
         }
      }
      return result ? ResultEnum.Continue : ResultEnum.Skip;
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @method
   // @param name  名称
   // @param level  内容
   //==========================================================
   public set(name, value) {
      switch (name) {
         case 'source':
            this.source = value;
            return;
      }
      super.set(name, value);
   }


   //==========================================================
   //<T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString() {
      return 'source=' + this.source;
   }
}
