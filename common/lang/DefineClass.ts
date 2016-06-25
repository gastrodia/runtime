export function DefineClass(className){
   return function(clazz){
      clazz.prototype.Class = className
   }
}
