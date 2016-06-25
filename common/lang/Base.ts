import {RuntimeUtil} from '../RuntimeUtil';

/**
 * 所有可继承对象的基类。
 * 支持类的判断、获取内部运行信息的功能。
 *
 * @author maocy
 * @version 141230
 */
export class Base {
   /** 哈希值序列 */
   protected static __nextHash: number = 1;
   /** 哈希值 */
   protected __hashCode: number;
   /** 释放标志 */
   protected __dispose: boolean;

   /**
    * 构建当前对象的实例。
    */
   public constructor() {
      this.__dispose = false;
   }

   /**
    * 获取哈希值。
    *
    * @return 哈希值
    */
   public get hashCode(): number {
      var hashCode = this.__hashCode;
      if (!hashCode) {
         hashCode = this.__hashCode = Base.__nextHash++;
      }
      return hashCode;
   }

   /**
    * 获取当前实例的信息。
    *
    * @return 信息字符串
    */
   public toString(): string {
      return RuntimeUtil.dump(this);
   }

   /**
    * 释放当前实例。
    *
    * @param flag 全部释放标志
    */
   public dispose(flag?: boolean): void {
      this.__dispose = true;
   }
}
