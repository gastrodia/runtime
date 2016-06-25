import {Base} from './Base';

//==========================================================
// <T>字符串操作的工具类</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
export class StringBuffer extends Base {
   // 个数
   protected _count: number;
   // 内存 
   protected _memory: Array<string>;

   //==========================================================
   // <T>构建当前对象的实例。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._count = 0;
      // 内存 
      this._memory = new Array<string>();
   }

   //==========================================================
   // <T>判断字符串内容是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //==========================================================
   public isEmpty(): boolean {
      return this._count == 0;
   }

   //==========================================================
   // <T>接收字符串集合。</T>
   //
   // @method
   //==========================================================
   public assign(...values: Array<any>): void {
      this.clear();
      this.appendArray(values, 0, values.length);
   }

   //==========================================================
   // <T>追加字符串集合。</T>
   //
   // @method
   //==========================================================
   public append(...values: Array<any>): void {
      this.appendArray(values, 0, values.length);
   }

   //==========================================================
   // <T>追加字符串集合。</T>
   //
   // @method
   // @param values:Array 字符串集合
   // @param offset:Integer 位置
   // @param count:Integer 总数
   //==========================================================
   public appendArray(values: Array<any>, offset: number, count: number): void {
      var memory: Array<string> = this._memory;
      for (var i: number = 0; i < count; i++) {
         var value: string = values[offset++];
         if (value != null) {
            memory[this._count++] = value;
         }
      }
   }

   //==========================================================
   // <T>追加重复字符串。</T>
   //
   // @method
   // @param value:String 字符串
   // @param count:Integer 次数
   //==========================================================
   public appendRepeat(value, count): void {
      var memory: Array<string> = this._memory;
      for (var i = 0; i < count; i++) {
         memory[this._count++] = value;
      }
   }

   //==========================================================
   // <T>追加一行字符串的内容到当前字符串内。</T>
   //
   // @method
   // @param values:String... 字符串
   //==========================================================
   public appendLine(...values: Array<any>): void {
      this.appendArray(values, 0, values.length);
      this._memory[this._count++] = '\r\n';
   }

   //==========================================================
   // <T>将字符串的内容加在当前字符串末尾。</T>
   // <P>被追加的内容不做任何转换，放在当前字符串的末尾。</P>
   //
   // @method
   // @param values:Object... 字符串
   //==========================================================
   public push(...values: Array<any>): void {
      this.appendArray(values, 0, values.length);
   }

   //==========================================================
   // <T>清除字符串内容。</T>
   //
   // @method
   //==========================================================
   public clear(): void {
      this._count = 0;
   }

   //==========================================================
   // <T>将当前字符串对象转换为字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString(): string {
      var memory: Array<string> = this._memory;
      if (memory.length != this._count) {
         memory = memory.slice(0, this._count);
      }
      return memory.join('');
   }

   //==========================================================
   // <T>获得字符串内容，释放所有内容。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public flush(): string {
      var result: string = this.toString();
      this.dispose();
      return result;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose(flag: boolean = false): void {
      // 清空内存
      var memory: Array<string> = this._memory;
      if (memory) {
         var count = memory.length;
         for (var i: number = 0; i < count; i++) {
            memory[i] = null;
         }
         this._memory = null;
      }
      // 清空属性
      this._count = 0;
      // 父处理
      super.dispose(flag);
   }
}
