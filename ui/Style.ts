// import {AccessEnum} from '../lang/AccessEnum';
// import {DataTypeEnum} from '../lang/DataTypeEnum';
// import {AccessEvent} from '../lang/AccessEvent';
// import {PropertyAnnotation} from './PropertyAnnotation';
// import {MemoryUtil} from '../MemoryUtil';
// import {ClassUtil} from './ClassUtil';

//==========================================================
// <T>实例关联描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function Style(styleName: String) {
   return function(target: any, name: string): void {
      // 注册描述器
      // var annotation: PropertyAnnotation = new PropertyAnnotation(name, dataName, dataCd, dataDefault, dataClass);
      // ClassUtil.registerAnnotation(target.constructor, annotation);
      // // 设置属性
      // var propertyName: string = '__' + name;
      // var descriptor: any = new Object();
      // descriptor.get = function() {
      //    // 获得实例对象
      //    var value = this[propertyName];
      //    if (value === void 0) {
      //       return dataDefault;
      //    }
      //    return value;
      // };
      // descriptor.set = function(value: any) {
      //    // 设置实例内容
      //    var result: boolean = true;
      //    var resultValue: any = value;
      //    var oldValue: any = this[propertyName];
      //    if (dataChanged) {
      //       // 执行注册函数
      //       var invoker = this[dataChanged];
      //       if (invoker) {
      //          var event: AccessEvent = MemoryUtil.alloc(AccessEvent);
      //          event.field = name;
      //          event.oldValue = oldValue;
      //          event.value = value;
      //          event.result = true;
      //          this[dataChanged].call(this, this, event);
      //          result = event.result;
      //          resultValue = event.value;
      //          MemoryUtil.free(event);
      //       }
      //    }
      //    if (result) {
      //       if (oldValue !== resultValue) {
      //          this[propertyName] = resultValue;
      //       }
      //    }
      // };
      // return descriptor;
   }
}
