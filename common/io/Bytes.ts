import {DataViewer} from './DataViewer';

//==========================================================
// <T>字节数组。</T>
//
// @author maocy
// @history 150105
//==========================================================
export class Bytes extends DataViewer {
   // 内存
   protected _memory: ArrayBuffer;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(memory?: any) {
      super();
      if (!memory) {
         memory = new (ArrayBuffer as any)();
      }
      this.link(memory)
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @param data 数组
   //==========================================================
   public link(data: ArrayBuffer): void {
      this._memory = data;
      this._viewer = new DataView(data);
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this._memory = null;
      this._viewer = null;
      super.dispose();
   }
}
