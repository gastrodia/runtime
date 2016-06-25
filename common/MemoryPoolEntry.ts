//==========================================================
// <T>内存缓冲节点。</T>
//
// @struct
// @author maocy
// @version 150523
//==========================================================
export class MemoryPoolEntry {
   // 下一个节点
   public next: MemoryPoolEntry ;
   // 内容
   public value: any;

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
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
