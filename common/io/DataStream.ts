import {DataTypeEnum} from '../lang/DataTypeEnum';
import {Fatal} from '../lang/Fatal';
import {StringBuffer} from '../lang/StringBuffer';
import {DataViewer} from './DataViewer';

//==========================================================
// <T>数据流基类。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class DataStream extends DataViewer {
   // 数据视图
   public viewer: DataView;
   // 位置
   public position: number = 0;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(memory?: any) {
      super();
      // 设置属性
      this.position = 0;
   }

   //==========================================================
   // <T>关联数据。</T>
   //
   // @param memory 内存
   //==========================================================
   public link(data: any): void {
      // 获得缓冲
      var buffer = null;
      var dataClass = data.constructor;
      if (dataClass == Array) {
         var inputData = new Uint8Array(data);
         buffer = inputData.buffer;
      } else if (dataClass == Uint8Array) {
         buffer = data.buffer;
      } else if (dataClass == ArrayBuffer) {
         buffer = data;
      } else {
         throw new Fatal(this, 'Unknown data type.');
      }
      // 设置视图
      this.viewer = new DataView(buffer);
      this.position = 0;
   }

   //==========================================================
   // <T>测试字符串。</T>
   //
   // @return 字符串
   //==========================================================
   public testString(): string {
      var position = this.position;
      var length = this.viewer.getUint16(position, this.endianCd);
      position += 2;
      var result = new StringBuffer();
      for (var i = 0; i < length; i++) {
         var value = this.viewer.getUint16(position, this.endianCd);
         position += 2;
         result.push(String.fromCharCode(value));
      }
      return result.flush();
   }

   //==========================================================
   // <T>读取布尔值。</T>
   //
   // @method
   // @return Boolean 布尔值
   //==========================================================
   public readBoolean() {
      var value = this.viewer.getInt8(this.position);
      this.position++;
      return value > 0;
   }

   //==========================================================
   // <T>读取有8位有符号整数。</T>
   //
   // @method
   // @return Integer 8位有符号整数
   //==========================================================
   public readInt8() {
      var value = this.viewer.getInt8(this.position);
      this.position++;
      return value;
   }

   //==========================================================
   // <T>读取有16位有符号整数。</T>
   //
   // @method
   // @return Integer 16位有符号整数
   //==========================================================
   public readInt16() {
      var value = this.viewer.getInt16(this.position, this.endianCd);
      this.position += 2;
      return value;
   }

   //==========================================================
   // <T>读取有32位有符号整数。</T>
   //
   // @method
   // @return Integer 32位有符号整数
   //==========================================================
   public readInt32() {
      var value = this.viewer.getInt32(this.position, this.endianCd);
      this.position += 4;
      return value;
   }

   //==========================================================
   // <T>读取有64位有符号整数。</T>
   //
   // @method
   // @return Integer 64位有符号整数
   //==========================================================
   public readInt64() {
      var value1 = this.viewer.getInt32(this.position, this.endianCd);
      this.position += 4;
      var value2 = this.viewer.getInt32(this.position, this.endianCd);
      this.position += 4;
      return value2 << 32 + value1;
   }

   //==========================================================
   // <T>读取有8位无符号整数。</T>
   //
   // @method
   // @return Integer 8位无符号整数
   //==========================================================
   public readUint8() {
      var value = this.viewer.getUint8(this.position);
      this.position += 1;
      return value;
   }

   //==========================================================
   // <T>读取有16位无符号整数。</T>
   //
   // @method
   // @return Integer 16位无符号整数
   //==========================================================
   public readUint16() {
      var value = this.viewer.getUint16(this.position, this.endianCd);
      this.position += 2;
      return value;
   }

   //==========================================================
   // <T>读取有32位无符号整数。</T>
   //
   // @method
   // @return Integer 32位无符号整数
   //==========================================================
   public readUint32() {
      var value = this.viewer.getUint32(this.position, this.endianCd);
      this.position += 4;
      return value;
   }

   //==========================================================
   // <T>读取有64位无符号整数。</T>
   //
   // @method
   // @return Integer 64位无符号整数
   //==========================================================
   public readUint64() {
      var endianCd = this.endianCd;
      var value1 = this.viewer.getUint32(this.position, endianCd);
      this.position += 4;
      var value2 = this.viewer.getUint32(this.position, endianCd);
      this.position += 4;
      var value = 0;
      if (endianCd) {
         value = (value2 << 32) + value1;
      } else {
         value = (value1 << 32) + value2;
      }
      return value;
   }

   //==========================================================
   // <T>读取浮点数。</T>
   //
   // @method
   // @return Number 浮点数
   //==========================================================
   public readFloat() {
      var value = this.viewer.getFloat32(this.position, this.endianCd);
      this.position += 4;
      return value;
   }

   //==========================================================
   // <T>读取双精度浮点数。</T>
   //
   // @method
   // @return Number 双精度浮点数
   //==========================================================
   public readDouble() {
      var value = this.viewer.getFloat64(this.position, this.endianCd);
      this.position += 8;
      return value;
   }

   //==========================================================
   // <T>读取字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public readString() {
      var viewer = this.viewer;
      var endianCd = this.endianCd;
      var position = this.position;
      var length = viewer.getUint16(position, endianCd);
      position += 2;
      var value = new StringBuffer();
      for (var i = 0; i < length; i++) {
         var character = viewer.getUint16(position, endianCd);
         value.push(String.fromCharCode(character));
         position += 2;
      }
      this.position = position;
      return value.flush();
   }

   //==========================================================
   // <T>读取字节数组。</T>
   //
   // @method
   // @param data:ArrayBuffer 数组
   // @param offset:Integer 开始位置
   // @param length:Integer 长度
   // @return Integer 读取长度
   //==========================================================
   public readBytes(data, offset, length) {
      var viewer = this.viewer;
      // 检查长度
      if (length <= 0) {
         return;
      }
      // 暂时不支持开始位置选择
      if (offset != 0) {
         throw new Fatal(this, 'Unsupport.');
      }
      var position = this.position;
      var endianCd = this.endianCd;
      // 8字节复制
      if (length % 8 == 0) {
         var array: any = new Float64Array(data);
         var count = length >> 3;
         for (var i = 0; i < count; i++) {
            array[i] = viewer.getFloat64(position, endianCd);
            position += 8;
         }
         this.position = position;
         return;
      }
      // 4字节复制
      if (length % 4 == 0) {
         var array: any = new Uint32Array(data);
         var count = length >> 2;
         for (var i = 0; i < count; i++) {
            array[i] = viewer.getUint32(position, endianCd);
            position += 4;
         }
         this.position = position;
         return;
      }
      // 2字节复制
      if (length % 2 == 0) {
         var array: any = new Uint16Array(data);
         var count = length >> 1;
         for (var i = 0; i < count; i++) {
            array[i] = viewer.getUint16(position, endianCd);
            position += 2;
         }
         this.position = position;
         return;
      }
      // 逐字节复制
      var array: any = new Uint8Array(data);
      for (var i = 0; i < length; i++) {
         array[i] = viewer.getUint8(position++);
      }
      this.position = position;
   }

   //==========================================================
   // <T>读取类型数据。</T>
   //
   // @method
   // @param dataCd:EDataType 数据类型
   // @return Object 数据
   //==========================================================
   public readData(dataCd): any {
      switch (dataCd) {
         case DataTypeEnum.Int8:
            return this.readInt8();
         case DataTypeEnum.Int16:
            return this.readInt16();
         case DataTypeEnum.Int32:
            return this.readInt32();
         case DataTypeEnum.Int64:
            return this.readInt64();
         case DataTypeEnum.Uint8:
            return this.readUint8();
         case DataTypeEnum.Uint16:
            return this.readUint16();
         case DataTypeEnum.Uint32:
            return this.readUint32();
         case DataTypeEnum.Uint64:
            return this.readUint64();
         case DataTypeEnum.Float32:
            return this.readFloat();
         case DataTypeEnum.Float64:
            return this.readDouble();
         case DataTypeEnum.String:
            return this.readString();
      }
      throw new Fatal(this, 'Unknown data cd. (data_cd={1})', dataCd);
   }

   //==========================================================
   // <T>写入布尔值。</T>
   //
   // @method
   // @return value:Boolean 布尔值
   //==========================================================
   public writeBoolean(value) {
      this.viewer.setInt8(this.position, (value > 0) ? 1 : 0);
      this.position++;
   }

   //==========================================================
   // <T>写入8位有符号整数。</T>
   //
   // @method
   // @return value:Integer 8位有符号整数
   //==========================================================
   public writeInt8(value) {
      this.viewer.setInt8(this.position, value);
      this.position++;
   }

   //==========================================================
   // <T>写入16位有符号整数。</T>
   //
   // @method
   // @return value:Integer 16位有符号整数
   //==========================================================
   public writeInt16(value) {
      this.viewer.setInt16(this.position, value, this.endianCd);
      this.position += 2;
   }

   //==========================================================
   // <T>写入32位有符号整数。</T>
   //
   // @method
   // @return value:Integer 32位有符号整数
   //==========================================================
   public writeInt32(value) {
      this.viewer.setInt32(this.position, value, this.endianCd);
      this.position += 4;
   }

   //==========================================================
   // <T>写入64位有符号整数。</T>
   //
   // @method
   // @return value:Integer 64位有符号整数
   //==========================================================
   public writeInt64(value) {
      this.viewer.setInt32(this.position, value, this.endianCd);
      this.viewer.setInt32(this.position, value >> 32, this.endianCd);
      this.position += 8;
   }

   //==========================================================
   // <T>写入8位无符号整数。</T>
   //
   // @method
   // @return value:Integer 8位无符号整数
   //==========================================================
   public writeUint8(value) {
      this.viewer.setUint8(this.position, value);
      this.position += 1;
   }

   //==========================================================
   // <T>写入16位无符号整数。</T>
   //
   // @method
   // @return value:Integer 16位无符号整数
   //==========================================================
   public writeUint16(value) {
      this.viewer.setUint16(this.position, value, this.endianCd);
      this.position += 2;
   }

   //==========================================================
   // <T>写入32位无符号整数。</T>
   //
   // @method
   // @return value:Integer 32位无符号整数
   //==========================================================
   public writeUint32(value) {
      this.viewer.setUint32(this.position, value, this.endianCd);
      this.position += 4;
   }

   //==========================================================
   // <T>写入64位无符号整数。</T>
   //
   // @method
   // @return value:Integer 64位无符号整数
   //==========================================================
   public writeUint64(value) {
      this.viewer.setUint32(this.position, value, this.endianCd);
      this.viewer.setUint32(this.position, value >> 32, this.endianCd);
      this.position += 8;
   }

   //==========================================================
   // <T>写入浮点数。</T>
   //
   // @method
   // @return value:Number 浮点数
   //==========================================================
   public writeFloat(value) {
      this.viewer.setFloat32(this.position, value, this.endianCd);
      this.position += 4;
   }

   //==========================================================
   // <T>写入双精度浮点数。</T>
   //
   // @method
   // @return value:Number 双精度浮点数
   //==========================================================
   public writeDouble(value) {
      this.viewer.setFloat64(this.position, value, this.endianCd);
      this.position += 8;
   }

   //==========================================================
   // <T>写入字符串。</T>
   //
   // @method
   // @return value:String 字符串
   //==========================================================
   public writeString(value) {
      var viewer: DataView = this.viewer;
      var length = value.length;
      var endianCd = this.endianCd;
      var position = this.position;
      viewer.setUint16(position, length, endianCd);
      position += 2;
      for (var i = 0; i < length; i++) {
         viewer.setUint16(position, value.charCodeAt(i), endianCd);
         position += 2;
      }
      this.position = position;
   }

   //==========================================================
   // <T>写入字节数组。</T>
   //
   // @method
   // @param data:ArrayBuffer 数组
   // @param offset:Integer 开始位置
   // @param length:Integer 长度
   // @return Integer 读取长度
   //==========================================================
   public writeBytes(data, offset, length) {
      var viewer = this.viewer;
      // 检查长度
      if (length <= 0) {
         return;
      }
      // 暂时不支持开始位置选择
      if (offset != 0) {
         throw new Fatal(this, 'Unsupport.');
      }
      var position = this.position;
      var endianCd = this.endianCd;
      // 8字节复制
      if (length % 8 == 0) {
         var array: any = new Float64Array(data);
         var count = length >> 3;
         for (var i = 0; i < count; i++) {
            viewer.setFloat64(position, array[i], endianCd);
            position += 8;
         }
         this.position = position;
         return;
      }
      // 4字节复制
      if (length % 4 == 0) {
         var array: any = new Uint32Array(data);
         var count = length >> 2;
         for (var i = 0; i < count; i++) {
            viewer.setUint32(position, array[i], endianCd);
            position += 4;
         }
         this.position = position;
         return;
      }
      // 2字节复制
      if (length % 2 == 0) {
         var array: any = new Uint16Array(data);
         var count = length >> 1;
         for (var i = 0; i < count; i++) {
            viewer.setUint16(position, array[i], endianCd);
            position += 2;
         }
         this.position = position;
         return;
      }
      // 逐字节复制
      var array: any = new Uint8Array(data);
      for (var i = 0; i < length; i++) {
         viewer.setUint8(position++, array[i]);
      }
      this.position = position;
   }

   //==========================================================
   // <T>写入类型数据。</T>
   //
   // @method
   // @param dataCd:EDataType 数据类型
   // @param value:Object 数据
   //==========================================================
   public writeData(dataCd, value) {
      switch (dataCd) {
         case DataTypeEnum.Int8:
            return this.writeInt8(value);
         case DataTypeEnum.Int16:
            return this.writeInt16(value);
         case DataTypeEnum.Int32:
            return this.writeInt32(value);
         case DataTypeEnum.Int64:
            return this.writeInt64(value);
         case DataTypeEnum.Uint8:
            return this.writeUint8(value);
         case DataTypeEnum.Uint16:
            return this.writeUint16(value);
         case DataTypeEnum.Uint32:
            return this.writeUint32(value);
         case DataTypeEnum.Uint64:
            return this.writeUint64(value);
         case DataTypeEnum.Float32:
            return this.writeFloat(value);
         case DataTypeEnum.Float64:
            return this.writeDouble(value);
         case DataTypeEnum.String:
            return this.writeString(value);
      }
      throw new Fatal(this, 'Unknown data cd. (data_cd={1})', dataCd);
   }
}
