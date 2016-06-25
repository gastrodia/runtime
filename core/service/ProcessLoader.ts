import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {ProcessLoadable} from './ProcessLoadable';

//==========================================================
// <T>材质。</T>
//
// @author maocy
// @history 160323
//==========================================================
export class ProcessLoader extends ObjectBase implements ProcessLoadable {
   // 状态
   public statusLoading: boolean;
   // 准备好
   public ready: boolean;

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @param 是否准备好
   //==========================================================
   public testReady(): boolean {
      return this.ready;
   }

   //==========================================================
   // <T>处理加载开始。</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoadBegin(): boolean {
      this.statusLoading = true;
      return true;
   }

   //==========================================================
   // <T>处理加载</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoad(): boolean {
      return true;
   }

   //==========================================================
   // <T>处理加载结束。</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoadEnd(): boolean {
      this.statusLoading = false;
      return true;
   }
}
