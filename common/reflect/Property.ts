import {MemoryUtil} from '../MemoryUtil';
import {AccessEvent} from '../lang/AccessEvent';
import {DataTypeEnum} from '../lang/DataTypeEnum';
import {ClassUtil} from './ClassUtil';
import {PropertyAnnotation} from './PropertyAnnotation';

//==========================================================
// <T>实例关联描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function Property(
   getterName?: string,
   setterName?: string,
   // dataName: String = null,
   // dataCd: DataTypeEnum = DataTypeEnum.Object,
   // dataDefault: any = null,
   // dataClass: any = null,
   // dataConverter: any = null,
   // dataPersistent: any = null,
   dataChanged: string = 'onFieldChanged') {
   return function (target: any, name: string): void {
      // 注册描述器
      //var annotation = new PropertyAnnotation(name, dataName, dataCd, dataDefault, dataClass, dataConverter, dataPersistent);
      var annotation = new PropertyAnnotation(name, null, null, null, null, null, null);
      ClassUtil.registerAnnotation(target.constructor, annotation);
      // 设置属性
      var propertyName: string = '__' + name;
      var descriptor: any = new Object();
      descriptor.get = function () {
         var value = this[propertyName];
         var result = value;
         // 获得内容
         if (getterName) {
            var invoker = this[getterName];
            if (invoker) {
               result = invoker.call(this, value);
            }
         }
         if (result === void 0) {
            //return dataDefault;
            return null;
         }
         return result;
      };
      descriptor.set = function (value: any) {
         // 设置实例内容
         var result = true;
         var oldValue = this[propertyName];
         var newValue = value;
         // 设置内容
         if (setterName) {
            var invoker = this[setterName];
            if (invoker) {
               newValue = invoker.call(this, oldValue, newValue);
            }
         }
         // 函数调用处理
         if (oldValue !== newValue) {
            this[propertyName] = newValue;
            if (!this._disableFieldChanged && dataChanged) {
               var invoker = this[dataChanged];
               if (invoker) {
                  // 执行处理
                  var event = MemoryUtil.alloc(AccessEvent) as AccessEvent;
                  event.name = name;
                  event.oldValue = oldValue;
                  event.newValue = value;
                  // event.result = true;
                  this[dataChanged].call(this, this, event);
                  // 设置结果
                  //result = event.result;
                  //newValue = event.newValue;
                  MemoryUtil.free(event);
               }
            }
            // 变更处理
            // if (result) {
            //    if (oldValue !== newValue) {
            //       this[propertyName] = newValue;
            //    }
            // }
         }
      }
      return descriptor;
   }
}
