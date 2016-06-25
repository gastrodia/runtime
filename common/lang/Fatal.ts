import {MethodUtil} from '../reflect/MethodUtil';
import {ArrayUtil} from './ArrayUtil';
import {StringBuffer} from './StringBuffer';

/**
 * 错误处理类。
 *
 * @author maocy
 * @version 150101
 */
export class Fatal extends Error {
   /** 拥有者 */
   public owner: any;
   /** 消息 */
   public message: string;
   /** 参数 */
   public parameters: Array<any>;
   /** 描述 */
   public description: string;
   /** 错误堆栈 */
   public stack: any;

   /**
    * 构造处理。
    *
    * @param sender 发送者
    * @param message 信息
    * @param parameters 参数集合
    */
   public constructor(owner: any, message: string, ...parameters: Array<any>) {
      // 设置堆栈
      // this.stack = (<any>new Error(message)).stack;
      // 建立描述参数信息
      var count = parameters.length;
      for (var i = 0; i < count; i++) {
         var parameter = parameters[i];
         var value = null;
         if (typeof parameter == 'function') {
            value = MethodUtil.shortName(parameter);
         } else {
            value = parameter;
         }
         

         message = message.replace('{' + (i + 1) + '}', value);
      }
      //..........................................................
      var info: StringBuffer = new StringBuffer();
      // 建立函数调用信息
      var f = Fatal.caller;
      var head = new StringBuffer();
      var stack = new Array();
      while (f) {
         if (ArrayUtil.contains(stack, f)) {
            break;
         }
         stack.push(f);
         f = f.caller;
      }
      var count = stack.length;
      for (var i = 0; i < count; i++) {
         f = stack[i];
         if (i > 0) {
            head.appendLine();
         }
         head.append('   ' + (count - i) + ': ' + MethodUtil.shortName(f));
      }
      info.appendLine(message);
      info.appendLine('------------------------------------------------------------');
      info.append(head);
      var description = info.flush();
      // alert(result);
      //throw new Error(info);
      super(description);
      this.owner = owner;
      this.owner = message;
      this.parameters = parameters;
      this.description = description;
   }

   /**
    * 获得字符串。
    *
    * @return 字符串
    */
   public toString(): string {
      return this.description;
   }
}
