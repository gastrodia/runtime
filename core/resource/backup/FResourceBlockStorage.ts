import {DataStream} from '../../../common/io/DataStream';
import {DataViewer} from '../../../common/io/DataViewer';
import {ClassUtil} from '../../../common/reflect/ClassUtil';
import {FResourceBlockStorageData} from './FResourceBlockStorageData';
import {FResourceStorage} from './FResourceStorage';

//==========================================================
// <T>资源分块存储。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
export class FResourceBlockStorage extends FResourceStorage {
   //..........................................................
   // @attribute
   protected _ready = false;
   protected _dataLength = 0;
   protected _blockSize = 0;
   protected _blockCount = 0;
   //o._blocks = MO.Class.register(o, new MO.AGetter('_blocks'));
   protected _blocks: any = null;
   protected _resource = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      //o._blocks = new MO.TObjects();
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   public testReady() {
      var o = this;
      if (!o._ready) {
         var blocks = o._blocks;
         var count = blocks.count();
         for (var i = 0; i < count; i++) {
            var block = blocks.at(i);
            if (!block.testReady()) {
               return false;
            }
         }
         o._ready = true;
      }
      return o._ready;
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param buffer:ArrayBuffer 数据
   //==========================================================
   public load(buffer) {
      var o = this;
      var resource = o._resource;
      //o._compressLength = buffer.byteLength;
      // 创建读取流
      var view = ClassUtil.create(DataViewer);
      view.setEndianCd(true);
      view.link(buffer);
      // 反序列化数据
      var compressCode = view.readString();
      var length = o._dataLength = view.readInt32();
      var blockSize = o._blockSize = view.readInt32();
      var blockCount = o._blockCount = view.readInt32();
      var blocks = o._blocks;
      for (var i = 0; i < blockCount; i++) {
         // 读取数据
         var size = view.readInt32();
         var blockData = new ArrayBuffer(size);
         view.readBytes(blockData, 0, size);
         // 创建数据块
         var block = ClassUtil.create(FResourceBlockStorageData);
         block._guid = resource.guid();
         block._index = i;
         block.setCompressData(blockData);
         blocks.push(block)
      }
      // 释放资源
      view.dispose();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public complete() {
      var o = this;
      var resource = o._resource;
      // 合并数据流
      var stream = ClassUtil.create(DataStream);
      stream.setEndianCd(true);
      stream.setLength(o._dataLength);
      var blocks = o._blocks;
      var count = blocks.count();
      for (var i = 0; i < count; i++) {
         var block = blocks.at(i);
         var data = block._data;
         stream.writeBytes(data.buffer, 0, data.byteLength);
      }
      // 资源完成处理
      stream.flip();
      //var span = MO.Timer.current() - resource._compressStartTick;
      //MO.Logger.info(o, 'Process resource storage. (guid={1}, block_count={2}, length={3}, total={4}, tick={5})', resource.guid(), count, o._compressLength, o._dataLength, span);
      // 加载资源
      resource.onComplete(stream);
      // 释放数据流
      stream.dispose();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      // 清空属性
      o._resource = null;
      // 是否所有存储块
      var blocks = o._blocks;
      if (blocks) {
         var count = blocks.count();
         for (var i = 0; i < count; i++) {
            var block = blocks.at(i);
            block.dispose();
         }
         //o._blocks = MO.Lang.Object.dispose(blocks);
      }
      // 父处理
      super.dispose();
   }
}
