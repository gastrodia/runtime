import {ResultEnum} from '../lang/ResultEnum';
import {Tag} from './Tag';
import {TagContext} from './TagContext';

//==========================================================
// <T>标签输出类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class TagWrite extends Tag {
   //..........................................................
   // @attribute
   public source = null;
   
   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param context  环境
   // @return EResult 处理结果
   //==========================================================
   public onBegin(context: TagContext): ResultEnum {
      var value = context.get(this.source);
      context.write(value);
      return ResultEnum.Skip;
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param v:level:Integer 内容
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
