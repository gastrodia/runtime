import {MemoryUtil} from '../MemoryUtil';
import {ClassUtil} from '../reflect/ClassUtil';
import {MethodUtil} from '../reflect/MethodUtil';
import {Base} from './Base';
import {ListenerContext} from './ListenerContext';
import {ListenerUtil} from './ListenerUtil';
import {ObjectUtil} from './ObjectUtil';

/**
 * 监听器。
 *
 * @author maocy
 * @version 160306
 */
export class Listener extends Base {
   /** 拥有者 */
   public owner: any;
   /** 参数集合 */
   public attributes: any;
   /** 函数 */
   public callback: Function;

   /**
    * 事件处理。
    *
    * @param sender 发出对象
    * @param parameters 参数集合
    */
   public process(sender: any, parameters: Array<any>): void {
      // 获得调用者
      var owner = this.owner;
      if (!owner) {
         owner = sender;
      }
      // 创建监听环境
      var context: ListenerContext = MemoryUtil.alloc(ListenerContext);
      context.sender = sender;
      context.owner = owner;
      context.callback = this.callback;
      context.attributes = this.attributes;
      context.parameters = parameters;
      // 消息处理
      context.process();
      MemoryUtil.free(context);
      // ListenerUtil.process(context);
   }

   /**
    * 获得字符串信息。
    *
    * @return 字符串信息
    */
   public toString(): string {
      return ClassUtil.shortName(this) + '(owner=' + ClassUtil.shortName(this.owner) + ', callback=' + MethodUtil.shortName(this.callback) + ')';
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this.owner = null;
      this.callback = null;
      ObjectUtil.free(this);
   }
}
