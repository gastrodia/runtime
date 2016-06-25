/**
 * 类型数组。
 *
 * @author maocy
 * @version 160513
 */
export class Types<T> extends Array<T> {

   /**
    * 判断数组是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      return this.length == 0;
   }

   /**
    * 获得总数。
    *
    * @param value 内容
    */
   public get count(): number {
      return this.length;
   }

   /**
    * 判断数组是否含有指定的对象。
    *
    * @param value 内容
    */
   public contains(value: T): boolean {
      return this.indexOf(value) != -1;
   }

   /**
    * 获得集合中第一个对象。
    *
    * @return 第一个对象
    */
   public get(index: number): T {
      var count = this.length;
      var index = index % count;
      if (index >= 0) {
         return this[index];
      }
      return this[count + index];
   }

   /**
    * 追加一个数组。
    *
    * @param array 数组
    * @return 数组
    */
   public append(array: Array<T>): Types<T> {
      var count = array.length;
      for (var i = 0; i < count; i++) {
         var value = array[i];
         this.push(value);
      }
      return this;
   }

   /**
    * 追加一个唯一数组。
    *
    * @param array 数组
    * @return 数组
    */
   public appendUnique(array: Array<T>): Types<T> {
      var count = array.length;
      for (var i = 0; i < count; i++) {
         var value = array[i];
         this.pushUnique(value);
      }
      return this;
   }

   /**
    * 获得集合中第一个对象。
    *
    * @return 第一个对象
    */
   public get first(): T {
      return this.length ? this[0] : null;
   }

   /**
    * 获得集合中最后一个对象。
    *
    * @return 最后一个对象
    */
   public get last(): T {
      return this.length ? this[this.length - 1] : null;
   }

   /**
    * 增加一个唯一的数据。
    *
    * @param value 数据
    */
   public pushUnique(value: T) {
      if (this.indexOf(value) == -1) {
         this.push(value);
      }
   }

   /**
    * 移除指定对象的存储对象。
    *
    * @param value 指定对象
    */
   public remove(value: T) {
      var index = 0;
      var count = this.length;
      for (var i = 0; i < count; i++) {
         if (this[i] != value) {
            this[index++] = this[i];
         }
      }
      this.length = index;
   }

   /**
    * 清除数组的所有内容。
    */
   public clear() {
      this.length = 0;
   }

   // //==========================================================
   // // <T>查找指定对象在数组中的索引位置，不存在则返回-1。</T>
   // //
   // // @method
   // // @param value:Object 对象
   // // @return Integer 索引位置
   // //==========================================================
   // public indexOf(value: any): number {
   //    var count: number = this._length;
   //    for (var n: number = 0; n < count; n++) {
   //       if (this._memory[n] == value) {
   //          return n;
   //       }
   //    }
   //    return -1;
   // }

   // //==========================================================
   // // <T>取得指定索引对应的对象。</T>
   // //
   // // @method
   // // @param index:Integer 索引位置
   // // @return 当前位置上的对象
   // //==========================================================
   // public get(index) {
   //    return ((index >= 0) && (index < this._length)) ? this._memory[index] : null;
   // }

   // //==========================================================
   // // <T>把对象存储在指定的索引处。</T>
   // //
   // // @param index 索引位置
   // // @param value 对象
   // //==========================================================
   // public set(index, value) {
   //    if ((index >= 0) && (index < this._length)) {
   //       this._memory[index] = value;
   //    }
   // }

   // //==========================================================
   // // <T>把对象追加到数组的最后位置。</T>
   // //
   // // @param values 对象
   // //==========================================================
   // public push(...params: Array<any>): void {
   //    var count: number = params.length;
   //    for (var n: number = 0; n < count; n++) {
   //       this._memory[this._length++] = params[n];
   //    }
   // }

   // //==========================================================
   // // <T>在数组中交换两个索引对应的对象。</T>
   // //
   // // @method
   // // @param left:Integer 第一个对象的索引值
   // // @param right:Integer 第二个对象的索引值
   // //==========================================================
   // public swap(left, right) {
   //    var count = this._length;
   //    if ((left >= 0) && (left < count) && (right >= 0) && (right < count) && (left != right)) {
   //       var memory = this._memory;
   //       var value = memory[left];
   //       memory[left] = memory[right];
   //       memory[right] = value;
   //    }
   // }

   // //==========================================================
   // // <T>对数组内容进行排序。</T>
   // //
   // // @method
   // //==========================================================
   // public sort() {
   //    this._memory.sort();
   // }

   // //==========================================================
   // // <T>移除指定索引的存储对象。</T>
   // //
   // // @method
   // // @param index:Integer 索引位置
   // // @return Object 被删除的对象
   // //==========================================================
   // public erase(index) {
   //    var value = null;
   //    var count = this._length;
   //    if ((index >= 0) && (index < count)) {
   //       value = this._memory[index];
   //       for (var i = index; i < count; i++) {
   //          this._memory[i] = this._memory[i + 1];
   //       }
   //       this._length--;
   //    }
   //    return value;
   // }

   // //==========================================================
   // // <T>将数组内项目为空的位置全部删除。</T>
   // //==========================================================
   // public compress(): void {
   //    var index: number = 0;
   //    var count: number = this._length;
   //    var memory = this._memory;
   //    for (var i = 0; i < count; i++) {
   //       var value = memory[i];
   //       if (value != null) {
   //          memory[index++] = value;
   //       }
   //    }
   //    this._length = index;
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //==========================================================
   // public dispose() {
   //    this._length = 0;
   //    this._memory = null;
   // }

   // //==========================================================
   // // <T>获得数组的内部信息。</T>
   // //
   // // @return 信息字符串
   // //==========================================================
   // public dump(): string {
   //    var result: StringBuffer = new StringBuffer();
   //    var count: number = this._length;
   //    result.append(RuntimeUtil.className(this), ':', count);
   //    if (count > 0) {
   //       var memory = this._memory;
   //       for (var n: number = 0; n < count; n++) {
   //          result.append(' [', memory[n], ']');
   //       }
   //    }
   //    return result.flush();
   // }
}
