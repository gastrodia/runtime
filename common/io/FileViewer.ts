import {Event} from '../lang/Event';
import {Listeners} from '../lang/Listeners';
import {LoggerUtil} from '../lang/LoggerUtil';
import {ObjectBase} from '../lang/ObjectBase';

//==========================================================
// <T>文件读取器。</T>
//
// @class
// @author maocy
// @version 150401
//==========================================================
export class FileViewer extends ObjectBase {
   // 准备好
   public ready: boolean;
   // 文件名称
   public fileName: string;
   // 长度
   public length: number;
   // 数据
   public data: any;
   // 加载状态
   // public statusLoading: boolean;
   // 加载监听器集合
   public loadListeners: Listeners;
   // 读取器
   protected _reader: FileReader;

   //==========================================================
   // <T>加载中处理。</T>
   //==========================================================
   public ohLoad() {
      //var o = this.__linker;
      //LoggerUtil.error(linker, 'Load file failure. (error={1])', reader.error);
   }

   //==========================================================
   // <T>开始加载处理。</T>
   //==========================================================
   public ohLoadStart() {
      //var o = this.__linker;
      //LoggerUtil.error(linker, 'Load file failure. (error={1])', reader.error);
   }

   //==========================================================
   // <T>加载进度响应处理。</T>
   //==========================================================
   public ohProgress() {
      //var o = this.__linker;
      //LoggerUtil.error(linker, 'Load file failure. (error={1])', reader.error);
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //==========================================================
   public ohLoadEnd() {
      var linker = (this as any).__linker;
      var reader = linker._reader;
      if (reader.error) {
         LoggerUtil.error(linker, 'Load file failure. (error={1])', reader.error);
      } else {
         // 设置属性
         var length = linker.length = reader.result.byteLength;
         var data = linker.data = reader.result;
         this.ready = true;
         // 完成处理
         var event:any = new Event(linker);
         event.fileName = linker.fileName;
         event.dataLength = length;
         event.data = data;
         linker.loadListeners.process(event);
         event.dispose();
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 创建读取器
      this.length = 0;
      var reader = this._reader = new FileReader();
      (reader as any).__linker = this;
      reader.onload = this.ohLoad;
      reader.onprogress = this.ohProgress;
      reader.onloadstart = this.ohLoadStart;
      reader.onloadend = this.ohLoadEnd;
      this.loadListeners = new Listeners();
   }

   //==========================================================
   // <T>加载文件数据。</T>
   //
   // @param file 文件数据
   //==========================================================
   public loadFile(file) {
      this.fileName = file.name;
      this.length = file.size;
      var reader = this._reader;
      reader.readAsArrayBuffer(file);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      var reader = this._reader;
      (reader as any).__linker = null;
      reader.onloadstart = null;
      reader.onload = null;
      reader.onloadend = null;
      reader.onprogress = null;
      this._reader = null;
      this.fileName = null;
      this.data = null;
      // 父处理
      super.dispose();
   }
}
