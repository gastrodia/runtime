import {RuntimeUtil} from '../RuntimeUtil';
import {Base} from './Base';
import {StringBuffer} from './StringBuffer';

// =========================================================
// <T>对象集合。</T>
//
// @author maocy
// @version 141230
// =========================================================
export class Objects<T> extends Base {
   // 项目个数
   protected _count: number;
   // 项目集合
   protected _items: Array<T>;

   //==========================================================
   // <T>构建当前对象的实例。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._count = 0;
      this._items = new Array<T>();
   }

   //===========================================================
   // <T>判断集合是否为空。</T>
   //
   // @return 是否为空
   //===========================================================
   public isEmpty(): boolean {
      return (this._count == 0);
   }

   //===========================================================
   // <T>获得总数。</T>
   //
   // @return 总数
   //===========================================================
   public count(): number {
      return this._count;
   }

   //===========================================================
   // <T>获得数据。</T>
   //
   // @return 数据
   //===========================================================
   public items(): Array<T> {
      return this._items;
   }

   //===========================================================
   // <T>判断集合是否含有指定的对象。</T>
   //
   // @param value 对象
   // @return 是否含有
   //===========================================================
   public contains(value: T): boolean {
      return this._items.indexOf(value) != -1;
   }

   //===========================================================
   // <T>查找指定对象在集合中的索引位置，不存在则返回-1。</T>
   //
   // @param value 对象
   // @return 索引位置
   //===========================================================
   public indexOf(value: T): number {
      return this._items.indexOf(value);
   }

   //===========================================================
   // <T>获得集合中第一个对象。</T>
   //
   // @return 第一个对象
   //===========================================================
   public first(): T {
      return this._count ? this._items[0] : null;
   }

   //===========================================================
   // <T>获得集合中最后一个对象。</T>
   //
   // @return 最后一个对象
   //===========================================================
   public last(): T {
      return this._count ? this._items[this._count - 1] : null;
   }

   //===========================================================
   // <T>取得指定索引对应的对象。</T>
   //
   // @param index 索引位置
   // @return 当前位置上的对象
   //===========================================================
   public at(index: number): T {
      return this._items[index];
   }

   //===========================================================
   // <T>取得指定索引对应的对象。</T>
   //
   // @param index 索引位置
   // @return 当前位置上的对象
   //===========================================================
   public getAt(index: number): T {
      return this._items[index];
   }

   //===========================================================
   // <T>取得指定索引对应的对象。</T>
   //
   // @param index 索引位置
   // @return 当前位置上的对象
   //===========================================================
   public get(index: number): T {
      return ((index >= 0) && (index < this._count)) ? this._items[index] : null;
   }

   //===========================================================
   // <T>把对象存储在指定的索引处。</T>
   //
   // @param index 索引位置
   // @param value 对象
   //===========================================================
   public setAt(index: number, value: T): void {
      this._items[index] = value;
   }

   //===========================================================
   // <T>把对象存储在指定的索引处。</T>
   //
   // @param index 索引位置
   // @param value 对象
   //===========================================================
   public set(index: number, value: T): void {
      var items = this._items;
      if ((index >= 0) && (index < this._count)) {
         items[index] = value;
      }
   }

   //===========================================================
   // <T>搜索属性内容相等的对象。</T>
   //
   // @param name 名称
   // @param value 内容
   // @return 对象
   //===========================================================
   public search(name: string, value: any): T {
      var items = this._items;
      var count = this._count;
      for (var i = 0; i < count; i++) {
         var item = items[i];
         var find = item[name];
         if (find == value) {
            return item;
         }
      }
      return null;
   }

   //===========================================================
   // <T>接收集合全部内容。</T>
   //
   // @param values 集合
   //===========================================================
   public assign(values: Objects<T>): void {
      var items = this._items;
      var count = this._count = values.count();
      var valueItems = values.items();
      for (var i = 0; i < count; i++) {
         items[i] = valueItems[i];
      }
   }

   //===========================================================
   // <T>追加集合全部内容。</T>
   //
   // @param values 集合
   //===========================================================
   public append(values: Objects<T>): void {
      var count = values.count();
      for (var i = 0; i < count; i++) {
         this.push(values.at(i));
      }
   }

   //===========================================================
   //<T>把对象插入在指定的索引处。</T>
   //
   // @param index 索引位置
   // @param value 对象
   //===========================================================
   public insert(index: number, value: T): void {
      var count = this._count;
      var items = this._items;
      if ((index >= 0) && (index <= count)) {
         for (var i = count; i > index; i--) {
            items[i] = items[i - 1];
         }
         items[index] = value;
         this._count++;
      }
   }

   //===========================================================
   // <T>弹出首对象。</T>
   //
   // @return 对象
   //===========================================================
   public shift(): T {
      return this.erase(0);
   }

   //===========================================================
   // <T>压入首对象。</T>
   //
   // @param value 对象
   //===========================================================
   public unshift(value: T): void {
      return this.insert(0, value);
   }

   //===========================================================
   // <T>将最后一个对象弹出集合。</T>
   //
   // @return 对象
   //===========================================================
   public pop(): T {
      var value = null;
      if (this._count) {
         value = this._items[--this._count];
      }
      return value;
   }

   //===========================================================
   // <T>把对象追加到集合的最后位置。</T>
   //
   // @param value 对象
   // @return 索引值
   //===========================================================
   public push(value: T): number {
      var index = this._count++;
      this._items[index] = value;
      return index;
   }

   //===========================================================
   // <T>把唯一对象追加到集合的最后位置。</T>
   //
   // @param value 对象
   // @return 索引值
   //===========================================================
   public pushUnique(value: T): void {
      var index = this.indexOf(value);
      if (index == -1) {
         this.push(value);
      }
   }

   //===========================================================
   // <T>在集合中交换两个索引对应的对象。</T>
   //
   // @param left 第一个对象的索引值
   // @param right 第二个对象的索引值
   //===========================================================
   public swap(left: number, right: number): void {
      var count = this._count;
      if ((left >= 0) && (left < count) && (right >= 0) && (right < count) && (left != right)) {
         var items = this._items;
         var value = items[left];
         items[left] = items[right];
         items[right] = value;
      }
   }

   //===========================================================
   // <T>对集合内容进行排序。</T>
   //
   // @param callback 排序函数
   //===========================================================
   public sort(callback: any): void {
      var items = this._items;
      if (items.length != this._count) {
         items.length = this._count;
      }
      // 排序处理
      items.sort(callback);
   }

   //===========================================================
   // <T>移除指定索引的存储对象。</T>
   //
   // @param index 索引位置
   // @return 被删除的对象
   //===========================================================
   public erase(index: number): T {
      var value = null;
      if ((index >= 0) && (index < this._count)) {
         var items = this._items;
         value = items[index];
         var count = --this._count;
         for (var i = index; i < count; i++) {
            items[i] = items[i + 1];
         }
         items[count] = null;
      }
      return value;
   }

   //===========================================================
   // <T>移除所有指定对象。</T>
   //
   // @param value 指定对象
   //===========================================================
   public remove(value: T): void {
      var count = this._count;
      if (count) {
         var index = 0;
         var items = this._items;
         // 移除对象
         for (var i = index; i < count; i++) {
            if (items[i] != value) {
               items[index++] = items[i];
            }
         }
         // 清除尾部
         for (var i = index; i < count; i++) {
            items[i] = null;
         }
         // 设置大小
         this._count = index;
      }
   }

   //==========================================================
   // <T>调用函数处理。</T>
   //
   // @param methodName 函数名称
   // @param parameter1 参数1
   // @param parameter2 参数2
   // @param parameter3 参数3
   // @param parameter4 参数4
   // @param parameter5 参数5
   //==========================================================
   public invoke(methodName: string, parameter1: any, parameter2: any, parameter3: any, parameter4: any, parameter5: any): void {
      var count = this._count;
      var items = this._items;
      for (var i = 0; i < count; i++) {
         var item = items[i];
         var method = item[methodName];
         method.call(item, parameter1, parameter2, parameter3, parameter4, parameter5);
      }
   }

   //===========================================================
   // <T>清除所有内容。</T>
   //===========================================================
   public clear(): void {
      this._count = 0;
   }

   //===========================================================
   // <T>获得数组内容。</T>
   //===========================================================
   public toArray(): Array<T> {
      var array = new Array<T>();
      var count = this._count;
      var items = this._items;
      for (var i = 0; i < count; i++) {
         array.push(items[i]);
      }
      return array;
   }

   //===========================================================
   // <T>释放处理。</T>
   //===========================================================
   public dispose(): void {
      var items = this._items;
      for (var name in items) {
         items[name] = null;
      }
      this._count = 0;
      this._items = null;
   }

   //===========================================================
   // <T>获得运行时信息。</T>
   //
   // @return 运行字符串
   //===========================================================
   public dump(): string {
      var count: number = this._count;
      var result: StringBuffer = new StringBuffer();
      result.append(RuntimeUtil.className(this), ':', count);
      if (count) {
         for (var i = 0; i < count; i++) {
            result.append(' [', this._items[i], ']');
         }
      }
      return result.flush();
   }
}
