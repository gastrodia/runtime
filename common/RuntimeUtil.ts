import {PlatformEnum} from './PlatformEnum';
import {ProcessEnum} from './ProcessEnum';

//==========================================================
// <T>运行库。</T>
//
// @reference
// @author maocy
// @version 141226
//==========================================================
export class RuntimeUtil {
   //..........................................................
   // 版本
   public static version: string = '0.1.0';
   // 模式
   public static processCd: ProcessEnum = ProcessEnum.Release;
   // 平台
   public static platformCd: PlatformEnum = PlatformEnum.Pc;
   // 编号集合
   protected static _ids: any = new Object();
   // 实例集合
   protected static _instances = new Array<any>();

   //==========================================================
   // <T>测试是否调试模式。</T>
   //
   // @method
   // @return 是否调试模式
   //==========================================================
   public static isDebug() {
      return this.processCd == ProcessEnum.Debug;
   }

   //==========================================================
   // <T>测试是否运行模式。</T>
   //
   // @method
   // @return 是否运行模式
   //==========================================================
   public static isRelease() {
      return this.processCd == ProcessEnum.Release;
   }

   //==========================================================
   // <T>测试是否PC平台模式。</T>
   //
   // @method
   // @return 是否PC平台模式
   //==========================================================
   public static isPlatformPc() {
      return this.platformCd == PlatformEnum.Pc;
   }

   //==========================================================
   // <T>测试是否移动平台模式。</T>
   //
   // @method
   // @return 是否移动平台模式
   //==========================================================
   public static isPlatformMobile() {
      return this.platformCd == PlatformEnum.Mobile;
   }

   //==========================================================
   // <T>空函数调用。</T>
   //
   // @method
   //==========================================================
   public static empty() {
   }

   //==========================================================
   // <T>获得非空对象。</T>
   //
   // @param value 对象
   // @param defaultValue 默认对象
   // @return 非空对象
   //==========================================================
   public static nvl(value, defaultValue) {
      return (value != null) ? value : defaultValue;
   }

   //==========================================================
   // <T>获得下一个编号。</T>
   //
   // @param code 代码
   // @return Integer 编号
   //==========================================================
   public static nextId(code: string) {
      var id = this._ids[code] as number;
      if (id == null) {
         id = this._ids[code] = 0;
      } else {
         this._ids[code] = ++id;
      }
      return id;
   }

   //==========================================================
   // <T>获得对象的唯一编号。</T>
   //
   // @param instance 对象实例
   // @return 索引
   //==========================================================
   public static codeOf(instance: any): number {
      var instances = this._instances;
      var count = instances.length as number;
      for (var i = 0; i < count; i++) {
         if (instances[i] === instance) {
            return i;
         }
      }
      instances[count] = instance;
      return count;
   }

   //==========================================================
   // <T>获得实例的唯一编号。</T>
   //
   // @param instance 对象实例
   // @return 编号
   //==========================================================
   public static instanceCode(instance: any): number {
      var code = null;
      if (instance) {
         code = instance.hashCode;
         if (!code) {
            code = this.codeOf(instance);
         }
      }
      return code;
   }

   //==========================================================
   // <T>从字符串中截取开始字符串到结束字符串中间的部分字符串。</T>
   // <P>开始字符串不存在的话，从字符串开始位置截取。</P>
   // <P>结束字符串不存在的话，截取到字符串的最终位置。</P>
   //
   // @param value 字符传对象
   // @param begin 起始字符串
   // @param end 结束字符串
   // @return 截取后的部分字符串
   //==========================================================
   public static subString(value: string, begin: string, end: string) {
      // 检查变量
      if (value == null) {
         return value;
      }
      // 计算左侧位置
      var left = 0;
      if (begin != null) {
         var find = value.indexOf(begin);
         if (find != -1) {
            left = find + begin.length;
         }
      }
      // 计算右侧位置
      var right = value.length;
      if (end != null) {
         var find = value.indexOf(end, left);
         if (find != -1) {
            right = find;
         }
      }
      // 截取字符串
      if (left >= right) {
         return '';
      }
      return value.substring(left, right);
   }

   //==========================================================
   // <T>安全获得对象实例的类型名称，不产生任何例外。</T>
   //
   // @param value 对象实例
   // @param safe 安全名称
   // @return 类型名称字符串
   //==========================================================
   public static typeOf(instance: any, safe: any = null) {
      // 空对象的情况
      if (instance == null) {
         return 'Null';
      }
      try {
         // 实例判断
         if (instance.__class) {
            return 'Instance';
         }
         // 普通数据类型
         var type = instance.constructor;
         if (type == Boolean) {
            return 'Boolean';
         }
         if (type == Number) {
            return 'Number';
         }
         if (type == String) {
            return 'String';
         }
         if (type == Function) {
            return 'Function';
         }
         if (Array.isArray(instance)) {
            return 'Array';
         }
         // 页面对象的情况
         if (instance.tagName) {
            return 'Html';
         }
         if (type.constructor == Function) {
            return 'Instance';
         }
         // 普通对象的情况
         for (var name in instance) {
            return 'Object';
         }
      } catch (exception) {
         return safe;
      }
      // 未知类型的情况
      return 'Unknown';
   }

   //==========================================================
   // <T>获得对象实例的类名称。</T>
   //
   // @param value 函数对象
   // @return 类名称
   //==========================================================
   public static className(value: any, cache?: boolean): string {
      var result: string = null;
      if (value) {
         var name = null;
         // 如果对象是函数的情况
         if (typeof value == 'function') {
            // 缓冲获得
            if (cache) {
               name = value.__spaceName;
               if (name) {
                  return name;
               }
            }
            name = value.__className;
            if (name) {
               return name;
            }
            // 获得名称
            var source = value.toString();
            var start = 0;
            if (source.indexOf('function ') == 0) {
               start = 9;
            } else if (source.indexOf('class ') == 0) {
               start = 6;
            } else {
               start = source.indexOf(' class ');
               if (start != -1) {
                  start += 7;
               }
            }
            var end = source.indexOf(' extends ');
            if (end == -1) {
               var end1 = source.indexOf('(');
               var end2 = source.indexOf('{');
               if ((end1 != -1) && (end2 != -1)) {
                  end = Math.min(end1, end2);
               } else if (end1 != -1) {
                  end = end1;
               } else if (end2 != -1) {
                  end = end2;
               }
            }
            var className = source.substring(start, end).trim();
            return className;
         }
         // 如果对象是普通对象的情况
         return this.className(value.constructor, cache);
      }
      return null;
   }

   //==========================================================
   // <T>正序排列比较器。</T>
   //
   // @param source 来源对象
   // @param target 目标对象
   // @param parameters 参数对象
   //==========================================================
   private static sortComparerAsc(source: any, target: any, parameters: any): number {
      if (source > target) {
         return 1;
      } else if (source < target) {
         return -1;
      } else {
         return 0;
      }
   }

   //==========================================================
   // <T>倒序排列比较器。</T>
   //
   // @param source 来源对象
   // @param target 目标对象
   // @param parameters 参数对象
   //==========================================================
   private static sortComparerDesc(source: any, target: any, parameters: any): number {
      if (source > target) {
         return -1;
      } else if (source < target) {
         return 1;
      } else {
         return 0;
      }
   }

   //==========================================================
   // <T>对值对快速排序。</T>
   //
   // @param names 名称数组
   // @param values 内容数组
   // @param begin 开始位置
   // @param end 结束位置
   // @param comparer 比较器
   // @param parameters 参数
   //==========================================================
   private static pairSortMid(names: Array<any>, values: Array<any>, begin: number, end: number, comparer: Function, parameters: any): number {
      var name = names[begin];
      var value = null;
      if (values) {
         value = values[begin];
      }
      while (begin < end) {
         while ((begin < end) && (comparer(names[end], name, parameters) >= 0)) {
            end--;
         }
         names[begin] = names[end];
         if (values) {
            values[begin] = values[end];
         }
         while ((begin < end) && (comparer(names[begin], name, parameters) <= 0)) {
            begin++;
         }
         names[end] = names[begin];
         if (values) {
            values[end] = values[begin];
         }
      }
      names[begin] = name;
      if (values) {
         values[begin] = value;
      }
      return begin;
   }

   //==========================================================
   // <T>对值对快速排序。</T>
   //
   // @param names 名称数组
   // @param values 内容数组
   // @param begin 开始位置
   // @param end 结束位置
   // @param comparer 比较器
   // @param parameters 参数
   //==========================================================
   private static pairSortSub(names: Array<any>, values: Array<any>, begin: number, end: number, comparer: Function, parameters: any): void {
      if (begin < end) {
         var mid: number = this.pairSortMid(names, values, begin, end, comparer, parameters);
         this.pairSortSub(names, values, begin, mid - 1, comparer, parameters);
         this.pairSortSub(names, values, mid + 1, end, comparer, parameters);
      }
   }

   //==========================================================
   // <T>对值对快速排序。</T>
   //
   // @param names 名称数组
   // @param values 内容数组
   // @param offset 位置
   // @param count 总数
   // @param comparer 比较器
   // @param parameters 参数
   //==========================================================
   public static pairSort(names: Array<any>, values: Array<any>, offset: number, count: number, comparer: Function, parameters: any): void {
      var begin = offset;
      var end = offset + count - 1;
      this.pairSortSub(names, values, begin, end, this.nvl(comparer, this.sortComparerAsc), parameters);
   }

   //==========================================================
   // <T>命名空间初始化处理。</T>
   //
   // @param item 对象
   // @param space 空间名称
   //==========================================================
   protected static namespaceInitialize(item: any, space: string): void {
      for (var name in item) {
         // 检查名称
         if (name.indexOf('_') == 0) {
            continue;
         }
         // 获得内容
         var value = item[name];
         if (value != null) {
            // 检查是否已经设置过
            // if (value.__spaceName != null) {
            //    continue;
            // }
            // 设置类型名称
            var typeName: string = typeof value;
            if ((typeName == 'object') || (typeName == 'function')) {
               // 设置名称
               var spaceName: string = space + '.' + name;
               value.__className = name;
               value.__spaceName = spaceName;
               // 节点处理
               if (typeName == 'object') {
                  this.namespaceInitialize(value, spaceName);
               }
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>命名空间构造处理。</T>
   //
   // @param item 对象
   //==========================================================
   protected static namespaceConstructor(item: any): void {
      for (var name in item) {
         // 检查名称
         if (name.indexOf('_') == 0) {
            continue;
         }
         // 获得内容
         var value = item[name];
         if (value != null) {
            // 检查是否已经设置过
            if (value.__staticConstructor) {
               continue;
            }
            // 设置类型名称
            var typeName = typeof value;
            if ((typeName == 'object') || (typeName == 'function')) {
               // 节点处理
               if (typeName == 'object') {
                  this.namespaceConstructor(value);
               }
               // 执行处理
               if (value.staticConstructor) {
                  value.__staticConstructor = true;
                  value.staticConstructor();
               }
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>命名空间初始化处理。</T>
   //
   // @param item 对象
   // @param space 空间名称
   //==========================================================
   public static namespace(item: any, space: string): void {
      item.__className = space;
      item.__spaceName = space;
      this.namespaceInitialize(item, space);
      // this.namespaceConstructor(item);
   }

   //==========================================================
   // <T>获得一个实例的调试信息。</T>
   // <P>调试信息的格式：类型名称<辅助信息>@唯一代码:内容。</P>
   //
   // @param value 数据内容
   // @return 调试信息
   //==========================================================
   public static dump(instance: any): string {
      var result: string = null;
      // 对象为空的情况
      if (instance == null) {
         result = '@null';
      }
      // 对象为一般实例的情况
      var typeName = this.typeOf(instance);
      switch (typeName) {
         case 'Boolean':
            // 数字的情况
            return 'Boolean:' + instance;
         case 'Number':
            // 数字的情况
            return 'Number:' + instance;
         case 'String':
            // 字符串的情况
            return 'String<' + instance.length + '>:' + instance;
         case 'Function':
            // 字符串的情况
            return 'Function<' + this.className(instance, true) + '>@' + this.instanceCode(instance);
         case 'Html':
            // HTML对象的情况
            return 'Html<' + instance.tagName + '>@' + this.instanceCode(instance);
         case 'Instance':
            // HTML对象的情况
            return this.className(instance, true) + '@' + this.instanceCode(instance);
         default:
            // 其他情况
            return typeName + '@' + this.instanceCode(instance);
      }
   }

   //==========================================================
   // <T>释放一个对象。</T>
   //
   // @param item 对象
   // @param flag 标志
   //==========================================================
   public static dispose(item: any, flag: boolean = false): void {
      if (item) {
         if (!item.__dispose) {
            item.dispose(flag);
            item.__dispose = true;
         } else {
            throw new Error('Object has disposed.');
         }
      }
      return null;
   }
}
