import {AssertUtil} from '../AssertUtil';
import {ScopeEnum} from '../lang/ScopeEnum';
import {ClassUtil} from './ClassUtil';

//==========================================================
// <T>实例关联描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function Linker(clazz: Function, scopeCd: ScopeEnum = ScopeEnum.Global, factory: any = null) {
   return function(target, name): any {
      AssertUtil.debugNotNull(clazz);
      // 设置描述器
      var descriptor: any = new Object();
      descriptor.get = function() {
         // 获得实例对象
         return ClassUtil.getInstance(clazz);
      };
      descriptor.set = function(value) {
         // 设置实例内容
         ClassUtil.setInstance(clazz, value);
      };
      return descriptor;
   }
}
