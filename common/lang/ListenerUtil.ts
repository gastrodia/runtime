import {MemoryUtil} from '../MemoryUtil';
import {ListenerContext} from './ListenerContext';

//==========================================================
// <T>监听器的工具类。</T>
//
// @reference
// @author maocy
// @version 160306
//==========================================================
export class ListenerUtil {

   //==========================================================
   // <T>匹配监听代码和发送代码是否符合规范。</T>
   //
   // @param listenerCode 监听代码
   // @param code 代码
   // @return 是否复合规范
   //==========================================================
   public static match(listenerCode: string, code: String): boolean {
      if (listenerCode == '*' || code == '*') {
         return true;
      }
      return listenerCode == code;
   }

   //==========================================================
   // <T>检验传入值是否是整型值。</T>
   //
   // @param value 待检验的字符串
   // @return Boolean 是否整数
   //==========================================================
   public static process(context: ListenerContext) {
      context.process();
      MemoryUtil.free(context);
   }
}
