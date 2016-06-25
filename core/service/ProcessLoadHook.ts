import {ProcessLoadable} from './ProcessLoadable';
import {ProcessLoader} from './ProcessLoader';

//==========================================================
// <T>材质。</T>
//
// @author maocy
// @history 160323
//==========================================================
export class ProcessLoadHook extends ProcessLoader implements ProcessLoadable {
   // 拥有着
   public owner: any;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @param owner 拥有着
   //==========================================================
   public constructor(owner?: any) {
      super();
      // 设置属性
      this.owner = owner;
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @param 是否准备好
   //==========================================================
   public testReady(): boolean {
      var owner = this.owner;
      if (owner.testReady) {
         return owner.testReady();
      }
      return super.testReady();
   }

   //==========================================================
   // <T>处理加载开始。</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoadBegin(): boolean {
      var owner = this.owner;
      if (owner.processLoadBegin) {
         return owner.processLoadBegin();
      }
      return super.processLoadBegin();
   }

   //==========================================================
   // <T>处理加载</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoad(): boolean {
      var owner = this.owner;
      if (owner.processLoad) {
         return owner.processLoad();
      }
      return super.processLoad();
   }

   //==========================================================
   // <T>处理加载结束。</T>
   //
   // @param 处理结果
   //==========================================================
   public processLoadEnd(): boolean {
      var owner = this.owner;
      if (owner.processLoadEnd) {
         return owner.processLoadEnd();
      }
      return super.processLoadEnd();
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //==========================================================
   public dispose(): void {
      this.owner = null;
      // 父处理
      super.dispose();
   }
}
