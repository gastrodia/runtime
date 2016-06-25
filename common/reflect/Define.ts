import {ClassUtil} from './ClassUtil';
import {DefineAnnotation} from './DefineAnnotation';

//==========================================================
// <T>定义描述类。</T>
//
// @author maocy
// @version 160505
//==========================================================
export function Define(
   dataName?: string,
   dataValue?: any) {
   return function(target: any, name: string): void {
      // 注册描述器
      var annotation = new DefineAnnotation(name, dataName, dataValue);
      ClassUtil.registerAnnotation(target.constructor, annotation);
   }
}
