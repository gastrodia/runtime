import {ClassUtil} from './ClassUtil';
import {LoggerAnnotation} from './LoggerAnnotation';

//==========================================================
// <T>日志描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function Logger() {
   return function(target, name, descriptor) {
      // 注册描述器
      var annotation: LoggerAnnotation = new LoggerAnnotation(name, descriptor.value);
      ClassUtil.registerAnnotation(target, annotation);
      // 函数跟踪
      var callback = descriptor.value;
      //descriptor.value = function(...parameters: Array<any>) {
      descriptor.value = function() {
         return annotation.invoke(this, (arguments as any));
      }
   }
}
