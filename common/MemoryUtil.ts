import {AssertUtil} from './AssertUtil';
import {MemoryPool} from './MemoryPool';

/**
 * 内存管理类。
 *
 * @author maocy
 * @version 141229
 */
export class MemoryUtil {
   /** 缓冲池 */
   protected static _pools: any = new Object();

   /**
    * 收集一个类对象的实例。
    *
    * @param clazz 类函数
    * @return 实例
    */
   public static alloc(clazz: Function): any {
      // 获得类名
      AssertUtil.debugNotNull(clazz);
      var prototype = clazz.prototype;
      // 获得缓冲池
      var pool = prototype.__pool as MemoryPool;
      if (!pool) {
         pool = prototype.__pool = new MemoryPool();
         pool.type = clazz;
      }
      // 创建对象
      var value = pool.alloc();
      return value;
   }

   /**
    * 释放一个实例。
    *
    * @param value:Object 实例
    */
   public static free(value) {
      AssertUtil.debugNotNull(value);
      var pool = value.__pool;
      AssertUtil.debugNotNull(pool);
      pool.free(value);
   }

   /**
    * 强制释放当前内存中所有对象实例。
    */
   public static refresh() {
      eval('CollectGarbage()');
   }
}
