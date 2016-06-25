import {ObjectBase} from '../../common/lang/ObjectBase';

//==========================================================
// <T>图形数据。</T>
//
// @class
// @author maocy
// @history 150308
//==========================================================
export class FloatStream extends ObjectBase {
   public length: number;
   public memory: Float32Array;
   public position: number;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.length = 0;
      this.position = 0;
   }

   //==========================================================
   // <T>设置长度。</T>
   //
   // @method
   // @param length:Integer 长度
   //==========================================================
   public setLength(length) {
      this.length = length;
      this.memory = new Float32Array(length);
   }

   //==========================================================
   // <T>写入4个浮点数。</T>
   //
   // @param value1 浮点数1
   // @param value2 浮点数2
   // @param value3 浮点数3
   // @param value4 浮点数4
   //==========================================================
   public writeFloat4(value1: number, value2: number, value3: number, value4: number) {
      this.memory[this.position++] = value1;
      this.memory[this.position++] = value2;
      this.memory[this.position++] = value3;
      this.memory[this.position++] = value4;
   }

   //==========================================================
   // <T>写入颜色。</T>
   //
   // @param value:SColor4 颜色
   //==========================================================
   public writeColor4(value) {
      this.writeFloat4(value.red, value.green, value.blue, value.alpha);
   }

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   public reset() {
      this.position = 0;
   }

   //==========================================================
   // <T>清空处理。</T>
   //
   // @method
   //==========================================================
   public clear() {
      this.position = 0;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @author maocy
   //==========================================================
   public dispose() {
      this.memory = null;
      // 父处理
      super.dispose();
   }
}
