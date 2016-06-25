import {RuntimeUtil} from '../RuntimeUtil';
import {ClassUtil} from '../reflect/ClassUtil';
import {MethodUtil} from '../reflect/MethodUtil';
import {DateUtil} from './DateUtil';
import {Listeners} from './Listeners';
import {LoggerInfo} from './LoggerInfo';
import {StringBuffer} from './StringBuffer';
import {StringUtil} from './StringUtil';

//==========================================================
// <T>日志工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class LoggerUtil {
   // 日志标志
   public static debugAble: boolean = true;
   public static infoAble: boolean = true;
   public static warnAble: boolean = true;
   public static errorAble: boolean = true;
   public static fatalAble: boolean = true;
   // 标签长度
   private static _labelLength;
   // 日志长度
   private static _logger: LoggerInfo;
   // 输出监听集合
   private static _lsnsOutput: Listeners;

   //==========================================================
   // <T>静态初始化。</T>
   //==========================================================
   public static initialize() {
      this._labelLength = 40;
      this._logger = new LoggerInfo();
      this._lsnsOutput = new Listeners();
   }

   //==========================================================
   // <T>获得输出监听集合。</T>
   //
   // @return 输出监听集合
   //==========================================================
   public static get outputListeners(): Listeners {
      return this._lsnsOutput;
   }

   //==========================================================
   // <T>输出日志信息。</T>
   //
   // @method
   // @param sender:Object 发送者
   // @param message:String 消息
   //==========================================================
   public static output(sender: any, code: string, message: string, parameters: Array<any>): string {
      // 格式化参数
      var result = new StringBuffer();
      result.append(DateUtil.format('yymmdd-hh24miss.ms'));
      result.append(code);
      var formatMessage: string = message;
      var count: number = parameters.length;
      for (var n: number = 0; n < count; n++) {
         var parameter = parameters[n];
         var value = '';
         if (parameter != null) {
            if (typeof (parameter) == 'function') {
               value = MethodUtil.shortName(parameter);
            } else {
               value = parameter.toString();
            }
         }
         formatMessage = formatMessage.replace('{' + (n + 1) + '}', value);
      }
      result.append(formatMessage);
      var outputMessage = result.flush();
      // 日志输出
      var logger: LoggerInfo = this._logger;
      logger.sender = sender;
      logger.message = outputMessage;
      this._lsnsOutput.process(logger);
      // console.trace();
      // 返回内容
      return outputMessage;
   }

   //==========================================================
   //<T>显示一个调试信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static debug(owner: any, message: string, ...parameters: Array<any>) {
      // 检查标志
      if (!this.debugAble) {
         return;
      }
      // 获得函数名称
      var name = null;
      if (owner) {
         name = MethodUtil.shortName(owner.constructor);
      }
      //var caller = RLogger.debug.caller;
      //if (caller) {
      //   name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //   name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      if (owner && owner.hashCode) {
         name += '@' + owner.hashCode;
      }
      //..........................................................
      var code: string = '|D [' + StringUtil.rpad(name, this._labelLength) + '] ';
      this.output(owner, code, message, parameters);
   }

   //==========================================================
   //<T>显示一个提示信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static info(owner: any, message: string, ...parameters: Array<any>) {
      // 检查标志
      if (!this.infoAble) {
         return;
      }
      // 获得函数名称
      var name = null;
      if (owner) {
         name = MethodUtil.shortName(owner.constructor);
      }
      //var caller = RLogger.info.caller;
      //if (caller) {
      //name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      if (owner && owner.hashCode) {
         name += '@' + owner.hashCode;
      }
      //..........................................................
      var code: string = '|I [' + StringUtil.rpad(name, this._labelLength) + '] ';
      this.output(owner, code, message, parameters);
   }

   //==========================================================
   // <T>显示一个警告信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static warn(owner: any, message: string, ...parameters: Array<any>) {
      // 检查标志
      if (!this.warnAble) {
         return;
      }
      // 获得函数名称
      var name = null;
      if (owner) {
         name = MethodUtil.shortName(owner.constructor);
      }
      //var caller = RLogger.warn.caller;
      //if (caller) {
      //   name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //   name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      if (owner && owner.hashCode) {
         name += '@' + owner.hashCode;
      }
      //..........................................................
      var code: string = '|W [' + StringUtil.rpad(name, this._labelLength) + '] ';
      this.output(owner, code, message, parameters);
   }

   //==========================================================
   // <T>显示一个错误信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static error(owner: any, message: string, ...parameters: Array<any>) {
      // 检查标志
      if (!this.errorAble) {
         return;
      }
      // 获得函数名称
      var name = null;
      if (owner) {
         name = MethodUtil.shortName(owner.constructor);
      }
      //var caller = RLogger.error.caller;
      //if (caller) {
      //   name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //   name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      if (owner && owner.hashCode) {
         name += '@' + owner.hashCode;
      }
      //..........................................................
      var code: string = '|E [' + StringUtil.rpad(name, this._labelLength) + '] ';
      this.output(owner, code, message, parameters);
   }

   //==========================================================
   // <T>显示一个例外信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param error:Object 例外对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static fatal(owner: any, error: any, message: string, ...params: Array<any>) {
      // 检查标志
      if (!this.fatalAble) {
         return;
      }
      // 建立函数调用关系的堆栈
      var stack = new StringBuffer();
      var stacks = new Array();
      //var caller = RLogger.fatal.caller;
      //while (caller) {
      //   if (RArray.contains(stacks, caller)) {
      //      break;
      //   }
      //   stacks.push(caller);
      //   caller = caller.caller;
      //}
      var count = stacks.length;
      for (var i = 0; i < count; i++) {
         //caller = stacks[i];
         if (i > 0) {
            stack.appendLine();
         }
         //stack.append('   ' + (count - i) + ': ' + RMethod.shortName(caller));
      }
      // 建立消息信息
      var result = new StringBuffer();
      //result.appendLine(RContext.get('RMessage:fatal'));
      result.appendLine(StringUtil.repeat('-', 60));
      result.append(ClassUtil.dump(owner), ': ');
      if (message) {
         var count = arguments.length;
         for (var i = 3; i < count; i++) {
            var parameter = arguments[i];
            if ('function' == typeof (parameter)) {
               parameter = MethodUtil.shortName(parameter);
            }
            message = message.replace('{' + (i - 2) + '}', parameter);
         }
      }
      result.appendLine(message);
      result.appendLine(StringUtil.repeat('-', 60));
      result.appendLine('Stack:');
      result.append(stack.flush());
      var text = result.flush();
      //o.output(owner, text);
      // 显示信息
      //if (RuntimeUtil.isPlatformPc() && !RuntimeUtil.isRelease()) {
      throw new Error(text);
      //}
   }

   //==========================================================
   //<T>显示一个弹出信息。</T>
   //
   // @method
   // @param owner:Object 消息对象
   // @param message:String 消息内容
   // @param params:Object... 消息参数列表
   //==========================================================
   public static show(owner: any, message: string, ...parameters: Array<any>) {
      // 获得函数名称
      var name = null;
      //var caller = RLogger.show.caller;
      //if (caller) {
      //   name = RMethod.shortName(caller);
      //} else if ((arguments as any).caller) {
      //   name = RMethod.shortName((arguments as any).caller[0]);
      //}
      if (name == null) {
         name = 'unknown';
      } else {
         name = name.replace('_', '.');
      }
      //if ((owner as any).hashCode) {
      //   name += '@' + owner.hashCode();
      //}
      //..........................................................
      var code: string = '|S [' + StringUtil.rpad(name, this._labelLength) + '] ';
      var result = this.output(owner, code, message, parameters);
      //..........................................................
      alert(result);
   }
}
LoggerUtil.initialize();
