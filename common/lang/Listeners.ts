import {AssertUtil} from '../AssertUtil';
import {LoggerUtil} from '../lang/LoggerUtil';
import {Base} from './Base';
import {Fatal} from './Fatal';
import {Listener} from './Listener';
import {ObjectUtil} from './ObjectUtil';
import {Types} from './Types';

/**
 * 监听器集合管理的工具类。
 *
 * @author maocy
 * @version 141229
 */
export class Listeners extends Base {
   /** 代码 */
   public code: string;
   /** 发送者 */
   public sender: any;
   /** 监听集合 */
   public listeners: Types<Listener>;

   /**
    * 构造处理。
    *
    * @param sender 发送者
    */
   public constructor(sender?: any) {
      super();
      // 设置属性
      this.sender = sender || this;
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      var listeners = this.listeners;
      if (listeners) {
         return listeners.isEmpty();
      }
      return true;
   }

   /**
    * 查找一个监听器。
    *
    * @param owner 处理对象
    * @param callback 处理函数
    * @return 监听器
    */
   public find(owner: any, callback: Function): Listener {
      var listeners = this.listeners;
      if (listeners) {
         var count = listeners.length;
         for (var i = 0; i < count; i++) {
            var listener = listeners[i];
            if ((listener.owner === owner) && (listener.callback === callback)) {
               return listener;
            }
         }
      }
      return null;
   }

   /**
    * 注册一个监听器。
    *
    * @param owner 处理对象
    * @param callback 处理函数
    * @return 监听器
    */
   public register(owner: any, callback: Function, ...attributes: Array<any>): Listener {
      // 检查是否已经注册
      var listener = this.find(owner, callback);
      if (listener) {
         LoggerUtil.error(this, 'Listener is already register. (owner={1}, process={2})', owner, callback);
         return listener;
      }
      // 注册监听器
      listener = new Listener();
      listener.owner = owner;
      listener.attributes = attributes;
      listener.callback = callback;
      this.push(listener);
      // 返回监听器
      return listener;
   }

   /**
    * 注销一个监听器。
    *
    * @param owner 处理对象
    * @param callback 处理函数
    */
   public unregister(owner: any, callback: Function) {
      // 检查是否已经注册
      var listener = this.find(owner, callback);
      if (!listener) {
         LoggerUtil.error(this, 'Listener is not register. (owner={1}, process={2})', owner, callback);
         return;
      }
      // 注销监听器
      this.remove(listener);
      // 返回监听器
      listener.dispose();
   }

   /**
    * 添加一个监听器对象到当前管理器内。
    *
    * @param listener 监听器对象
    */
   public push(listener: Listener) {
      AssertUtil.debugNotNull(listener);
      AssertUtil.debugNotNull(listener.callback);
      // 增加监听器
      var listeners = this.listeners;
      if (!listeners) {
         listeners = this.listeners = new Types<Listener>();
      }
      listeners.push(listener);
   }

   /**
    * 移除一个监听器对象到当前管理器内。
    *
    * @param listener 监听器对象
    */
   public remove(listener: Listener) {
      // 检查参数
      if (!listener) {
         throw new Fatal(this, 'Listener is null.');
      }
      // 移除监听器
      this.listeners.remove(listener);
   }

   /**
    * 向所有监视器发出调用处理。
    *
    * @param parameters 参数集合
    */
   public process(...parameters: Array<any>) {
      var listeners = this.listeners;
      if (listeners) {
         var count = listeners.length;
         for (var i = 0; i < count; i++) {
            var listener = listeners[i];
            listener.process(this.sender, parameters);
         }
      }
   }

   /**
    * 向所有监视器发出调用处理。
    *
    * @param parameters 参数集合
    */
   public dispatch(...parameters: Array<any>) {
      var listeners = this.listeners;
      if (listeners) {
         var count = listeners.length;
         for (var i = 0; i < count; i++) {
            var listener = listeners[i];
            listener.process(this.sender, parameters);
         }
      }
   }

   /**
    * 清空处理。
    */
   public clear() {
      var listeners = this.listeners;
      if (listeners) {
         listeners.clear();
      }
   }

   /**
    * 释放处理。
    */
   public dispose() {
      var listeners = this.listeners;
      if (listeners) {
         var count = listeners.length;
         for (var i = 0; i < count; i++) {
            var listener = listeners[i];
            listener.dispose();
         }
         this.listeners = ObjectUtil.dispose(listeners);
      }
      super.dispose();
      ObjectUtil.free(this);
   }
}
