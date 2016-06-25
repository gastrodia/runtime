import {AssertUtil} from '../AssertUtil';
import {RuntimeUtil} from '../RuntimeUtil';
import {Base} from './Base';
import {StringBuffer} from './StringBuffer';

//==========================================================
// <T>名称和内容的关联保存表的工具类。</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
export class HashMap<N, V> extends Base {
   // 总数
   protected _count: number;
   // 对照表
   protected _table: any;
   // 名称集合
   protected _names: Array<N>;
   // 内容集合
   protected _values: Array<V>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._count = 0;
      this._table = new Object();
      this._names = new Array<N>();
      this._values = new Array<V>();
   }

   //==========================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //==========================================================
   public isEmpty(): boolean {
      return this._count == 0;
   }

   //==========================================================
   // <T>获得总数。</T>
   //
   // @method
   // @return 总数
   //==========================================================
   public count(): number {
      return this._count;
   }

   //==========================================================
   // <T>判断是否含有指定的名称。</T>
   //
   // @method
   // @param name:String 名称
   // @return Boolean 是否含有
   //==========================================================
   public contains(name: N): boolean {
      if (name != null) {
         var index = this._table[name.toString().toLowerCase()]
         if (index != null) {
            return true;
         }
      }
      return false;
   }

   //==========================================================
   // <T>判断是否含有指定的内容。</T>
   //
   // @method
   // @param value:Object 内容
   // @return Boolean 是否含有
   //==========================================================
   public containsValue(value: V): boolean {
      var index: number = this.indexOfValue(value);
      return (index != -1);
   }

   //==========================================================
   // <T>查找指定名称在表中的索引位置，不存在则返回-1。</T>
   //
   // @method
   // @param name:String 名称
   // @return Integer 索引位置
   //==========================================================
   public indexOf(name: N): number {
      if (name != null) {
         var index = this._table[name.toString().toLowerCase()];
         if (index != null) {
            return index;
         }
      }
      return -1;
   }

   //==========================================================
   // <T>查找指定对象在表中的第一次出现的索引位置，不存在则返回-1。</T>
   //
   // @method
   // @param value:Object 内容
   // @return Integer 索引位置
   //==========================================================
   public indexOfValue(value: V): number {
      var o = this;
      var count = o._count;
      if (count > 0) {
         var values = o._values;
         for (var i = 0; i < count; i++) {
            if (values[i] == value) {
               return i;
            }
         }
      }
      return -1;
   }

   //==========================================================
   // <T>查找第一个内容。</T>
   //
   // @method
   // @return Object 内容
   //==========================================================
   public first(): V {
      var o = this;
      if (o._count > 0) {
         return o._values[0];
      }
      return null;
   }

   //==========================================================
   // <T>查找最后一个内容。</T>
   //
   // @method
   // @return Object 内容
   //==========================================================
   public last(): V {
      var o = this;
      if (o._count > 0) {
         return o._values[o._count - 1];
      }
      return null;
   }

   //==========================================================
   // <T>根据索引位置获得名称。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return String 名称
   //==========================================================
   public nameAt(index): N {
      return this._names[index];
   }

   //==========================================================
   // <T>根据索引位置获得名称。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return String 名称
   //==========================================================
   public name(index): N {
      return ((index >= 0) && (index < this._count)) ? this._names[index] : null;
   }

   //==========================================================
   // <T>根据索引位置获得内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return Object 内容
   //==========================================================
   public at(index): V {
      return this._values[index];
   }

   //==========================================================
   // <T>根据索引位置获得内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return Object 内容
   //==========================================================
   public valueAt(index): V {
      return this._values[index];
   }

   //==========================================================
   // <T>根据索引位置获得内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return Object 内容
   //==========================================================
   public value(index): V {
      return ((index >= 0) && (index < this._count)) ? this._values[index] : null;
   }

   //==========================================================
   // <T>根据索引位置设置内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @param value:Object 内容
   //==========================================================
   public setValueAt(index: number, value: V): any {
      this._values[index] = value;
   }

   //==========================================================
   // <T>根据索引位置设置内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @param value:Object 内容
   //==========================================================
   public setValue(index: number, value: V): any {
      if ((index >= 0) && (index < this._count)) {
         this._values[index] = value;
      }
   }

   //==========================================================
   // <T>根据名称查找内容。</T>
   // <P>如果内容不存在，返回默认内容。</P>
   //
   // @method
   // @param name:String 名称
   // @param defaultValue:Object 默认内容
   // @return Object 内容
   //==========================================================
   public get(name: any, defaultValue: V = null): V {
      if (name != null) {
         var index = this._table[name.toString().toLowerCase()];
         if (index != null) {
            return this._values[index];
         }
      }
      return defaultValue;
   }

   //==========================================================
   // <T>根据名称设置内容。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:Object 默认内容
   // @return Object 内容
   //==========================================================
   public set(name: any, value: V): void {
      AssertUtil.debugNotNull(name);
      var nameString: any = name.toString();
      var code: any = nameString.toLowerCase();
      var index = this._table[code];
      if ((index == null) || (index >= this._count)) {
         index = this._count++;
         this._names[index] = nameString;
         this._table[code] = index;
      }
      this._values[index] = value;
   }

   //==========================================================
   // <T>根据名称设置非空内容。</T>
   //
   // @param name 名称
   // @param value 默认内容
   // @return 内容
   //==========================================================
   public setNvl(name: N, value: V): void {
      if (value) {
         this.set(name, value);
      }
   }

   //==========================================================
   // <T>将当前表内容全部置为另一个表的全部内容。</T>
   //
   // @param map 表
   //==========================================================
   public assign(map: HashMap<N, V>): void {
      this.clear();
      this.append(map);
   }

   //==========================================================
   // <T>在当前表中追加另一个表的全部内容。</T>
   //
   // @param map 表
   //==========================================================
   public append(map: HashMap<N, V>): void {
      if (map) {
         var count = map.count();
         for (var i = 0; i < count; i++) {
            var name = map.name(i);
            var value = map.value(i);
            this.set(name, value);
         }
      }
   }

   //==========================================================
   // <T>在索引位置插入一个新的名称和内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @param name:String 名称
   // @param value:Object 内容
   //==========================================================
   public insert(index: number, name: N, value: V): void {
      var count = this._count;
      if ((index >= 0) && (index <= count)) {
         var names = this._names;
         var values = this._values;
         for (var i = count; i > index; i--) {
            names[i] = names[i - 1];
            values[i] = values[i - 1];
         }
         names[index] = name;
         values[index] = value;
         this._count++;
         this.rebuild();
      }
   }

   //==========================================================
   // <T>删除索引位置的内容。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return Object 删除的内容
   //==========================================================
   public remove(index: number): void {
      var value = null;
      var count = this._count;
      if ((index >= 0) && (index < count)) {
         var names = this._names;
         var values = this._values;
         value = values[index];
         for (var i = index; i < count; i++) {
            names[i] = names[i + 1];
            values[i] = values[i + 1];
         }
         this._count--;
         this.rebuild();
      }
      return value;
   }

   //==========================================================
   // <T>删除指定名称的内容。</T>
   //
   // @method
   // @param name:String 名称
   // @return Object 删除的内容
   //==========================================================
   public removeName(name: N): void {
      var index = this.indexOf(name);
      if (index != -1) {
         return this.remove(index);
      }
      return null;
   }

   //==========================================================
   // <T>删除指定的内容。</T>
   //
   // @method
   // @param value:Object 内容
   //==========================================================
   public removeValue(value: V): void {
      var index = 0;
      var count = this._count;
      var names = this._names;
      var values = this._values;
      for (var i = 0; i < count; i++) {
         var find = values[i];
         if (find != value) {
            if (index != i) {
               names[index] = names[i];
               values[index] = find;
            }
            index++;
         }
      }
      this._count = index;
      this.rebuild();
   }

   //==========================================================
   // <T>根据对象内名称数组和内容数组重新建立对照表。</T>
   //
   // @method
   //==========================================================
   public rebuild(): void {
      // 清除对照表数据
      var table = this._table;
      for (var name in table) {
         delete table[name];
      }
      // 重建对照表数据
      var count = this._count;
      var names = this._names;
      for (var i = 0; i < count; i++) {
         var code = (names[i] as any).toLowerCase();
         table[code] = i;
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
   public invoke(methodName, parameter1, parameter2, parameter3, parameter4, parameter5): void {
      var count = this._count;
      var values = this._values;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         var method = value[methodName];
         method.call(value, parameter1, parameter2, parameter3, parameter4, parameter5);
      }
   }

   //==========================================================
   // <T>清除所有内容。</T>
   //
   // @method
   //==========================================================
   public clear(): void {
      this._count = 0;
      // 清除对照表数据
      var table = this._table;
      for (var name in table) {
         delete table[name];
      }
   }

   //==========================================================
   // <T>获得数组的内部信息。</T>
   //
   // @method
   // @return String 信息字符串
   //==========================================================
   public toString(): string {
      var result: StringBuffer = new StringBuffer();
      var count = this._count;
      var names = this._names;
      var values = this._values;
      for (var i = 0; i < count; i++) {
         var name = names[i];
         var value = values[i];
         result.append(name, '=', value);
      }
      return result.flush();
   }

   //==========================================================
   // <T>释放所有内容。</T>
   //
   // @method
   // @param flag:Boolean 标志
   //==========================================================
   public dispose(flag: boolean = false): void {
      var count = this._count;
      // 清除对照表数据
      var table = this._table;
      if (table) {
         for (var name in table) {
            table[name] = null;
         }
         this._table = null;
      }
      // 清空名称集合
      var names = this._names;
      if (names) {
         for (var i = 0; i < count; i++) {
            names[i] = null;
         }
         this._names = null;
      }
      // 清空数据集合
      var values = this._values;
      if (values) {
         for (var i = 0; i < count; i++) {
            if (flag) {
               RuntimeUtil.dispose(values[i]);
            }
            values[i] = null;
         }
         this._values = null;
      }
      // 清空属性
      this._count = 0;
   }
}
