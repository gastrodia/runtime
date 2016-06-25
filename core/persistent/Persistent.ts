import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {PersistentAnnotation} from './PersistentAnnotation';

//==========================================================
// <T>实例关联描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function Persistent(
   dataConverter?: any,
   containerType?: any) {
   return function (target: any, name: string): void {
      // 注册描述器
      var annotation = new PersistentAnnotation(name, dataConverter, containerType);
      ClassUtil.registerAnnotation(target.constructor, annotation);
   }
}
