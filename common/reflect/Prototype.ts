//==========================================================
// <T>原型描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function Prototype() {
   return function(target: any, name: string, descriptor?: any): any {
      // 获得调用
      var invoker = target[name];
      if (invoker instanceof Function) {
         // 生成函数
         descriptor.value = invoker();
      }
   }
}
