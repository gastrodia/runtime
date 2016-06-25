import {Listener} from './Listener';
import {ListenerUtil} from './ListenerUtil';
import {Listeners} from './Listeners';
import {ObjectBase} from './ObjectBase';
import {ObjectUtil} from './ObjectUtil';

/**
 * 监听器集合类型。
 */
type ListenersType = {
   [key: string]: Listeners
};

/**
 * 事件分发器。
 */
export class Dispatcher extends ObjectBase {
   // 监听器集合字典
   protected _listenerss: ListenersType;

   /**
    * 注册一个监听器。
    *
    * @param code 代码
    * @param owner 拥有者
    * @param method 函数
    * @return 监听器
    */
   public addListener(code: any, owner: any, method: Function): Listener {
      // 获得监听器集合对象
      var listenerss = this._listenerss;
      if (!listenerss) {
         listenerss = this._listenerss = new Object() as ListenersType;
      }
      // 获得监听器集合
      var listeners = listenerss[code];
      if (!listeners) {
         listeners = new Listeners(this);
         listenerss[code] = listeners;
      }
      // 增加jian'si'qi检查重复
      var listener = listeners.register(owner, method);
      return listener;
   }

   // //==========================================================
   // // <T>设置一个监听器。</T>
   // //
   // // @param code 代码
   // // @param owner 拥有者
   // // @param method 函数
   // // @return 监听器
   // //==========================================================
   // public setListener(code, owner, method): Listener {
   //    var listenerss = this._listenerss;
   //    if (listenerss) {
   //       var listeners = listenerss.get(code);
   //       if (listeners) {
   //          listeners.clear();
   //       }
   //    }
   //    return this.addListener(code, owner, method)
   // }

   /**
    * 注销一个监听器。
    *
    * @param code 代码
    * @param owner 拥有者
    * @param method 函数
    * @return 监听器
    */
   public removeListener(code: any, owner: any, method: Function) {
      var listenerss = this._listenerss;
      if (listenerss) {
         var listeners = listenerss[code];
         if (listeners) {
            listeners.unregister(owner, method);
         }
      }
   }

   /**
    * 监听一个监听器。
    *
    * @param dispatcher 分发器
    * @param code 代码
    * @param method 函数
    * @return 监听器
    */
   public listen(dispatcher: Dispatcher, code: any, method: Function): Listener {
      return dispatcher.addListener(code, this, method);
   }

   /**
    * 注销一个监听器。
    *
    * @param dispatcher 分发器
    * @param code 代码
    * @param method 函数
    * @return 监听器
    */
   public unlisten(dispatcher: Dispatcher, code: any, method: Function) {
      return dispatcher.removeListener(code, this, method);
   }

   /**
    * 模拟socket.io的封装，提供一个简单的on,emit封装。
    *
    * @param dispatcher 分发器
    * @param code 代码
    * @param method 函数
    * @return 监听器
    */
   public on(code: any, callback: Function) {
      this.addListener(code, null, callback);
   }

   /**
    * 清空一类监听器。
    *
    * @param code 代码
    */
   public clearListeners(code: string) {
      var listenerss = this._listenerss;
      if (listenerss) {
         var listeners = listenerss[code];
         if (listeners) {
            listeners.clear();
         }
      }
   }

   /**
    * 清空全部监听器。
    */
   public clearAllListeners() {
      var listenerss = this._listenerss;
      if (listenerss) {
         for (var name in listenerss) {
            var listeners = listenerss[name];
            listeners.clear();
         }
      }
   }

   /**
    * 分发事件处理。
    *
    * @param code 代码
    * @param p1 参数1
    * @param p2 参数2
    * @param p3 参数3
    * @param p4 参数4
    * @param p5 参数5
    */
   public onDispatchEvent(code: any, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any): boolean {
      return true;
   }

   /**
    * 分发事件处理。
    *
    * @param code 代码
    * @param p1 参数1
    * @param p2 参数2
    * @param p3 参数3
    * @param p4 参数4
    * @param p5 参数5
    */
   public dispatchEvent(code: any, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any) {
      // 分发处理
      var result = this.onDispatchEvent(code, p1, p2, p3, p4, p5);
      // 监听处理
      if (result) {
         var listenerss = this._listenerss;
         if (listenerss) {
            for (var listenersCode in listenerss) {
               if (ListenerUtil.match(listenersCode, code)) {
                  var listeners = listenerss[listenersCode];
                  listeners.process(p1, p2, p3, p4, p5);
               }
            }
         }
      }
   }

   /**
    * 分发事件处理。
    *
    * @param code 代码
    * @param p1 参数1
    * @param p2 参数2
    * @param p3 参数3
    * @param p4 参数4
    * @param p5 参数5
    */
   public emit(code: any, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any) {
      this.dispatchEvent(code, p1, p2, p3, p4, p5);
   }

   /**
    * 释放处理。
    */
   public dispose() {
      // 释放属性
      this._listenerss = ObjectUtil.dispose(this._listenerss, true);
      // 父处理
      super.dispose();
   }
}
