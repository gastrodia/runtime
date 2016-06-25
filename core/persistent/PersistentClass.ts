import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {PersistentClassAnnotation} from './PersistentClassAnnotation';

//==========================================================
// <T>实例关联描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160505
//==========================================================
export function PersistentClass(
   dataName: string) {
   return function(type: any): void {
      // 注册描述器
      var annotation = new PersistentClassAnnotation(dataName);
      ClassUtil.registerAnnotation(type, annotation);
   }
}
