import {AssertUtil} from './AssertUtil';

/**
 * 内存缓冲节点。
 *
 * @author maocy
 * @version 150523
 */
class MemoryPoolEntry {
   // 下一个节点
   public next: MemoryPoolEntry;
   // 内容
   public value: any;

   /**
    * 释放处理。
    */
   public dispose() {
      // 释放内容
      var value = this.value;
      if (value) {
         value.__pool = null;
         value.dispose();
      }
      // 释放属性
      this.next = null;
      this.value = null;
   }
}

/**
 * 内存对象池。
 *
 * @author maocy
 * @version 150523
 */
export class MemoryPool {
   /** 未使用节点 */
   protected static _entryUnused: MemoryPoolEntry;

   /**
    * 收集一个缓冲节点。
    *
    * @return 节点
    */
   public static entryAlloc(): MemoryPoolEntry {
      var entry: MemoryPoolEntry = null;
      var unused = this._entryUnused;
      if (unused) {
         entry = unused;
         this._entryUnused = unused.next;
      } else {
         entry = new MemoryPoolEntry();
      }
      return entry;
   }

   /**
    * 释放一个缓冲节点。
    *
    * @param entry 节点
    */
   public static entryFree(entry: MemoryPoolEntry): void {
      AssertUtil.debugNotNull(entry);
      entry.next = this._entryUnused;
      this._entryUnused = entry;
   }

   // 未使用节点
   protected _unused: MemoryPoolEntry;
   // 类型
   public type: Function;
   // 创建个数
   public createCount: number;
   // 收集个数
   public allocCount: number;
   // 自由个数
   public freeCount: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.createCount = 0;
      this.allocCount = 0;
      this.freeCount = 0;
   }

   /**
    * 收集一个自由对象。
    *
    * @return 对象
    */
   public alloc(): any {
      var value: any = null;
      var unused = this._unused;
      if (unused) {
         value = unused.value;
         this._unused = unused.next;
         // 释放节点
         MemoryPool.entryFree(unused);
      } else {
         value = new (this.type as any)();
         value.__pool = this;
         this.createCount++;
      }
      this.allocCount++;
      value.__used = true;
      return value;
   }

   /**
    * 释放一个自由对象。
    *
    * @param 对象
    */
   public free(value: any): void {
      AssertUtil.debugNotNull(value);
      AssertUtil.debugNotNull(value.__pool);
      AssertUtil.debugTrue(value.__used);
      // 释放资源
      if (value.free) {
         value.free();
      }
      value.__used = false;
      // 放回缓冲池
      var entry = MemoryPool.entryAlloc() as MemoryPoolEntry;
      entry.value = value;
      entry.next = this._unused;
      this._unused = entry;
      this.freeCount++;
   }

   /**
    * 释放当前实例。
    */
   public dispose() {
      var entry = this._unused;
      while (entry) {
         var current = entry;
         entry = current.next;
         current.dispose();
         // 释放节点
         MemoryPool.entryFree(current);
      }
   }
}
