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
export class TagEquals extends Tag {
   //..........................................................
   // @attribute
   public trimLeft = true;
   public source = null;
   public value = null;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param context  环境
   // @return EResult 处理结果
   //==========================================================
   public onBegin(context: TagContext): ResultEnum {
      var resource = false;
      var s = context.get(this.source);
      var vs = this.value.split('|');
      var c = vs.length;
      for (var i = 0; i < c; i++) {
         var v = vs[i]
         if (s == v) {
            resource = true;
            break;
         }
      }
      return resource ? ResultEnum.Continue : ResultEnum.Skip;
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @method
   // @param name 名称
   // @param level 内容
   //==========================================================
   public set(name, value) {
      switch (name) {
         case 'source':
            this.source = value;
            return;
         case 'value':
            this.value = value;
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
      return 'source=' + this.source + ', value=' + this.value;
   }
}
