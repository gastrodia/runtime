import {LoggerUtil} from '../../../runtime/common/lang/LoggerUtil';
import {AssertUtil} from '../AssertUtil';
import {Dictionary} from '../lang/Dictionary';
import {ObjectBase} from '../lang/ObjectBase';
import {ObjectUtil} from '../lang/ObjectUtil';
import {ClassUtil} from './ClassUtil';

/**
 * 类工厂。
 *
 * @author maocy
 * @history 150215
 */
export class ClassFactory extends ObjectBase {
   /** 类字典 */
   protected _classes: Dictionary<any>;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      this._classes = new Dictionary<any>();
   }

   /**
    * 判断指定名称是否注册过。
    *
    * @param name 名称
    * @return 是否注册
    */
   public hasRegister(name: string): boolean {
      var clazz = this._classes.get(name);
      return clazz != null;
   }

   /**
    * 注册类对象。
    *
    * @param name 名称
    * @param class 类名称
    */
   public register(name: string, clazz: Function) {
      AssertUtil.debugNull(this._classes.get(name));
      this._classes.set(name, clazz);
   }

   /**
    * 查找当前实例对应的类型。
    *
    * @param instance 实例
    * @return 类型
    */
   public find(instance: any): Function {
      var classes = this._classes;
      var count = classes.count();
      for (var i = 0; i < count; i++) {
         var value = classes.valueAt(i);
         if (instance.constructor === value) {
            return value;
         }
      }
   }

   /**
    * 根据类型查找名称。
    *
    * @param type 类型
    * @return 名称
    */
   public findName(type: Function): string {
      var classes = this._classes;
      var count = classes.count();
      for (var i = 0; i < count; i++) {
         var value = classes.valueAt(i);
         if (type === value) {
            return classes.nameAt(i);
         }
      }
   }

   /**
    * 注销类对象。
    *
    * @param name 名称
    */
   public unregister(name: string) {
      this._classes.set(name, null);
   }

   /**
    * 创建指定名称的类对象实例。
    *
    * @param name 名称
    * @return 实例
    */
   public create(name: string): any {
      var clazz = this._classes.get(name);
      if (!clazz) {
         LoggerUtil.warn(this, 'Create unregister class. (name={1})', name);
         return null;
      }
      return ClassUtil.create(clazz);
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this._classes = ObjectUtil.dispose(this._classes);
      // 父处理
      super.dispose();
   }
}
