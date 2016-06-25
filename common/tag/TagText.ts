import {ResultEnum} from '../lang/ResultEnum';
import {StringUtil} from '../lang/StringUtil';
import {Tag} from './Tag';
import {TagContext} from './TagContext';

//==========================================================
// <T>标签类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class TagText extends Tag {
   public text: string = null;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param context  环境
   // @return EResult 处理结果
   //==========================================================
   public onBegin(context: TagContext): ResultEnum {
      var text = this.text;
      if (context.trimLeft) {
         if (StringUtil.startsWith(text, '\r')) {
            text = text.substring(1);
         }
         if (StringUtil.startsWith(text, '\n')) {
            text = text.substring(1);
         }
      }
      if (context.trimRight) {
         if (StringUtil.endsWith(text, '\r')) {
            text = text.substring(0, text.length - 1);
         }
         if (StringUtil.endsWith(text, '\n')) {
            text = text.substring(0, text.length - 1);
         }
      }
      context.write(text);
      return ResultEnum.Skip;
   }

   //==========================================================
   //<T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString(): string {
      return '{' + this.text + '}';
   }
}
