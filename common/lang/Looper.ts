import {MemoryUtil} from '../MemoryUtil';
import {RuntimeUtil} from '../RuntimeUtil';
import {Base} from './Base';
import {LooperEntry} from './LooperEntry';
import {StringBuffer} from './StringBuffer';

//==========================================================
// <T>自循环链表。</T>
//
// @tool
// @author maocy
// @version 150110
//==========================================================
export class Looper extends Base {
   // 总数
   _count: number = 0;
   // 记录数
   _recordCount: number = 0;
   // 当前位置
   _current: any = null;

   //==========================================================
   // <T>内部增加一个节点。</T>
   //
   // @method
   // @param entry:SLooperEntry 节点
   //==========================================================
   public innerPush(entry) {
      var o = this;
      var current = o._current;
      if (current) {
         var prior = current.prior;
         entry.prior = prior;
         entry.next = current;
         prior.next = entry;
         current.prior = entry;
      } else {
         entry.prior = entry;
         entry.next = entry;
         o._current = entry;
      }
      o._count++;
   }

   //==========================================================
   // <T>内部移除一个节点。</T>
   //
   // @method
   // @param entry:SLooperEntry 节点
   //==========================================================
   public innerRemove(entry) {
      var o = this;
      // 删除入口
      var prior = entry.prior;
      var next = entry.next;
      prior.next = next;
      next.prior = prior;
      // 设置数据
      o._count--;
      if (o._count > 0) {
         o._current = next;
      } else {
         o._current = null;
      }
      // 释放入口
      MemoryUtil.free(entry);
   }

   //==========================================================
   // <T>内部移除当前节点。</T>
   //
   // @method
   // @return Object 对象
   //==========================================================
   public innerRemoveCurrent() {
      var o = this;
      var value = null;
      if (o._count > 0) {
         // 获得内容
         var current = o._current;
         value = current.value;
         // 移除节点
         o.innerRemove(current);
      }
      return value;
   }

   //==========================================================
   // <T>内部移除指定对象的节点。</T>
   //
   // @method
   // @param value:Object 对象
   //==========================================================
   public innerRemoveValue(value) {
      var o = this;
      if (o._count > 0) {
         // 删除首个对象
         if (o._current.value == value) {
            o.innerRemoveCurrent();
            return;
         }
         // 删除其他对象
         var current = o._current;
         var entry = current.next;
         while (entry != current) {
            if (entry.value == value) {
               o.innerRemove(entry);
               // 重置到原始位置
               o._current = current;
               return;
            }
            entry = entry.next;
         }
      }
   }

   //==========================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return 是否为空
   //==========================================================
   public isEmpty() {
      return this._count == 0;
   }

   //==========================================================
   // <T>获得总数。</T>
   //
   // @method
   // @return Integer 总数
   //==========================================================
   public count() {
      return this._count;
   }

   //==========================================================
   // <T>记录当前刻录点。</T>
   //
   // @method
   //==========================================================
   public record() {
      var o = this;
      o._recordCount = o._count;
   }

   //==========================================================
   // <T>消除当前刻录点。</T>
   //
   // @method
   //==========================================================
   public unrecord(v) {
      this._recordCount = -1;
   }

   //==========================================================
   // <T>判断是否含有指定对象。</T>
   //
   // @method
   // @param value:Object 对象
   // @return Boolean 是否含有
   //==========================================================
   public contains(value) {
      var o = this;
      if (o._current) {
         var entry = o._current;
         var count = o._count;
         for (var i = 0; i < count; i++) {
            if (entry.value == value) {
               return true;
            }
            entry = entry.next;
         }
      }
      return false;
   }

   //==========================================================
   // <T>获得当前对象。</T>
   //
   // @method
   // @return Object 对象
   //==========================================================
   public current() {
      var entry = this._current;
      return entry ? entry.value : null;
   }

   //==========================================================
   // <T>获得下个对象。</T>
   //
   // @method
   // @return Object 对象
   //==========================================================
   public next() {
      var o = this;
      // 移动当前点
      if (o._current) {
         o._current = o._current.next;
      }
      // 检查刻录点（当只有一个元素时，刻录点无效）
      var count = o._recordCount;
      if (count > 0) {
         o._recordCount--;
      } else if (count == 0) {
         return null;
      }
      // 返回内容
      return o._current ? o._current.value : null;
   }

   //==========================================================
   // <T>增加一个对象到尾部。</T>
   //
   // @method
   // @param value:Object 对象
   //==========================================================
   public push(value) {
      var entry = MemoryUtil.alloc(LooperEntry);
      entry.value = value;
      this.innerPush(entry);
   }

   //==========================================================
   // <T>插入一个唯一内容到尾部。</T>
   //
   // @method
   // @param value:Object 对象
   //==========================================================
   public pushUnique(value) {
      var o = this;
      if (!o.contains(value)) {
         o.push(value);
      }
   }

   //==========================================================
   // <T>移除当前的节点，并返回该元素的对象。</T>
   //
   // @method
   // @return Object 对象
   //==========================================================
   public removeCurrent() {
      return this.innerRemoveCurrent();
   }

   //==========================================================
   // <T>移除所有指定对象。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   public remove(p) {
      this.innerRemoveValue(p);
   }

   //==========================================================
   // <T>清除所有内容。</T>
   //
   // @method
   //==========================================================
   public clear() {
      var o = this;
      // 释放所有节点
      var entry = o._current;
      if (entry) {
         entry.prior.next = null;
         while (entry) {
            var next = entry.next;
            MemoryUtil.free(next);
            entry = next;
         }
      }
      // 释放属性
      o._count = 0;
      o._current = null;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.clear();
   }

   //==========================================================
   // <T>获得运行时信息。</T>
   //
   // @method
   // @return String 运行字符串
   //==========================================================
   public dump() {
      var o = this;
      var count = o._count;
      var result: StringBuffer = new StringBuffer();
      result.append(RuntimeUtil.className(this), ': ', count);
      if (count > 0) {
         var entry = o._current;
         for (var i = 0; i < count; i++) {
            result.append(' [', entry.value, ']');
            entry = entry.next;
         }
      }
      return result.flush();
   }
}
