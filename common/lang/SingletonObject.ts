/**
 * 单件基类。
 *
 * @author maocy
 * @version 150603
 */
export class SingletonObject {
   // 标志
   protected static _singleton: boolean = true;
   // 实例
   protected static _instance: any = null;

   /**
    * 获得实例。
    *
    * @return 实例
    */
   public static instance(): any {
      var instance = this._instance;
      if (!instance) {
         instance = this._instance = new (this as any).constructor();
      }
      return instance;
   }
}
