import {ObjectBase} from '../lang/ObjectBase';

//==========================================================
// <T>数据观察基类。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class DataViewer extends ObjectBase {
   // 编码
   public endianCd: boolean;
   // 查看器
   protected _viewer: DataView;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(memory?: any) {
      super();
      this.endianCd = false;
   }

   //==========================================================
   // <T>获得有8位有符号整数。</T>
   //
   // @param index 索引位置
   // @return 8位有符号整数
   //==========================================================
   public getInt8(index: number): number {
      return this._viewer.getInt8(index);
   }

   //==========================================================
   // <T>获得有16位有符号整数。</T>
   //
   // @param index 索引位置
   // @return 16位有符号整数
   //==========================================================
   public getInt16(index: number): number {
      return this._viewer.getInt16(index, this.endianCd);
   }

   //==========================================================
   // <T>获得有32位有符号整数。</T>
   //
   // @param index 索引位置
   // @return 32位有符号整数
   //==========================================================
   public getInt32(index: number): number {
      return this._viewer.getInt32(index, this.endianCd);
   }

   //==========================================================
   // <T>获得有64位有符号整数。</T>
   //
   // @param index 索引位置
   // @return 64位有符号整数
   //==========================================================
   public getInt64(index: number): number {
      var result = 0;
      var value1 = this._viewer.getInt32(index, this.endianCd);
      var value2 = this._viewer.getInt32(index + 4, this.endianCd);
      if (this.endianCd) {
         result = value1 << 32 + value2;
      } else {
         result = value2 << 32 + value1;
      }
      return result;
   }

   //==========================================================
   // <T>获得有8位无符号整数。</T>
   //
   // @param index 索引位置
   // @return 8位无符号整数
   //==========================================================
   public getUint8(index: number): number {
      return this._viewer.getUint8(index);
   }

   //==========================================================
   // <T>获得有16位无符号整数。</T>
   //
   // @param index 索引位置
   // @return 16位无符号整数
   //==========================================================
   public getUint16(index: number): number {
      return this._viewer.getUint16(index, this.endianCd);
   }

   //==========================================================
   // <T>获得有32位无符号整数。</T>
   //
   // @param index 索引位置
   // @return 32位无符号整数
   //==========================================================
   public getUint32(index: number): number {
      return this._viewer.getUint32(index, this.endianCd);
   }

   //==========================================================
   // <T>获得有64位无符号整数。</T>
   //
   // @param index 索引位置
   // @return 64位无符号整数
   //==========================================================
   public getUint64(index: number): number {
      var result = 0;
      var value1 = this._viewer.getUint32(index, this.endianCd);
      var value2 = this._viewer.getUint32(index + 4, this.endianCd);
      if (this.endianCd) {
         result = value1 << 32 + value2;
      } else {
         result = value2 << 32 + value1;
      }
      return result;
   }

   //==========================================================
   // <T>获得浮点数。</T>
   //
   // @param index 索引位置
   // @return 浮点数
   //==========================================================
   public getFloat(index: number): number {
      return this._viewer.getFloat32(index, this.endianCd);
   }

   //==========================================================
   // <T>获得双精度浮点数。</T>
   //
   // @param index 索引位置
   // @return 双精度浮点数
   //==========================================================
   public getDouble(index: number): number {
      return this._viewer.getFloat64(index, this.endianCd);
   }

   //==========================================================
   // <T>设置有8位有符号整数。</T>
   //
   // @param index 索引位置
   // @param value 8位有符号整数
   //==========================================================
   public setInt8(index: number, value: number) {
      this._viewer.setInt8(index, value);
   }

   //==========================================================
   // <T>设置有16位有符号整数。</T>
   //
   // @param index 索引位置
   // @param value 16位有符号整数
   //==========================================================
   public setInt16(index: number, value: number) {
      this._viewer.setInt16(index, value, this.endianCd);
   }

   //==========================================================
   // <T>设置有32位有符号整数。</T>
   //
   // @param index 索引位置
   // @param value 32位有符号整数
   //==========================================================
   public setInt32(index: number, value: number) {
      this._viewer.setInt32(index, value, this.endianCd);
   }

   //==========================================================
   // <T>设置有64位有符号整数。</T>
   //
   // @param index 索引位置
   // @param value 64位有符号整数
   //==========================================================
   public setInt64(index: number, value: number) {
      if (this.endianCd) {
         this._viewer.setUint32(index, value >> 32, this.endianCd);
         this._viewer.setUint32(index, value & 0xFFFFFFFF, this.endianCd);
      } else {
         this._viewer.setUint32(index, value & 0xFFFFFFFF, this.endianCd);
         this._viewer.setUint32(index, value >> 32, this.endianCd);
      }
   }

   //==========================================================
   // <T>设置有8位无符号整数。</T>
   //
   // @param index 索引位置
   // @param value 8位无符号整数
   //==========================================================
   public setUint8(index: number, value: number) {
      this._viewer.setUint8(index, value);
   }

   //==========================================================
   // <T>设置有16位无符号整数。</T>
   //
   // @param index 索引位置
   // @param value 16位无符号整数
   //==========================================================
   public setUint16(index: number, value: number) {
      this._viewer.setUint16(index, value, this.endianCd);
   }

   //==========================================================
   // <T>设置有32位无符号整数。</T>
   //
   // @param index 索引位置
   // @param value 32位无符号整数
   //==========================================================
   public setUint32(index: number, value: number) {
      this._viewer.setUint32(index, value, this.endianCd);
   }

   //==========================================================
   // <T>设置有64位无符号整数。</T>
   //
   // @param index 索引位置
   // @param value 64位无符号整数
   //==========================================================
   public setUint64(index: number, value: number) {
      if (this.endianCd) {
         this._viewer.setUint32(index, value >> 32, this.endianCd);
         this._viewer.setUint32(index, value & 0xFFFFFFFF, this.endianCd);
      } else {
         this._viewer.setUint32(index, value & 0xFFFFFFFF, this.endianCd);
         this._viewer.setUint32(index, value >> 32, this.endianCd);
      }
   }

   //==========================================================
   // <T>设置浮点数。</T>
   //
   // @param index 索引位置
   // @param value 浮点数
   //==========================================================
   public setFloat(index: number, value: number) {
      this._viewer.setFloat32(index, value, this.endianCd);
   }

   //==========================================================
   // <T>设置双精度浮点数。</T>
   //
   // @param index 索引位置
   // @param value 双精度浮点数
   //==========================================================
   public setDouble(index: number, value: number) {
      this._viewer.setFloat64(index, value, this.endianCd);
   }
}
