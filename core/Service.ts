import {ObjectBase} from '../common/lang/ObjectBase';
import {ScopeEnum} from '../common/lang/ScopeEnum';

//==========================================================
// <T>后台服务基类。</T>
//
// @reference
// @author maocy
// @version 141231
//==========================================================
export class Service extends ObjectBase {
   // 范围类型
   protected _scopeCd: ScopeEnum;
   // 设置状态
   protected _statusSetup: boolean;
   // 激活状态
   protected _statusActive: boolean;
   // 加载状态
   protected _statusLoad: boolean;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Global;
      this._statusSetup = false;
      this._statusActive = false;
      this._statusLoad = false;
   }

   //==========================================================
   // <T>获得范围。</T>
   //
   // @return 范围
   //==========================================================
   public get scopeCd(): ScopeEnum {
      return this._scopeCd;
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @param args 参数
   //==========================================================
   public onSetup(args?: any): void {
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @param args 参数
   //==========================================================
   public setup(args?: any): void {
      if (!this._statusSetup) {
         this.onSetup(args);
         this._statusSetup = true;
      }
   }

   // //==========================================================
   // // <T>加载处理。</T>
   // //
   // // @method
   // //==========================================================
   // public onLoad(): void {
   // }

   // //==========================================================
   // // <T>加载处理。</T>
   // //
   // // @method
   // //==========================================================
   // public load(): void {
   //    if (!this._statusLoad) {
   //       this.onLoad();
   //       this._statusLoad = true;
   //    }
   // }

   //==========================================================
   // <T>激活处理。</T>
   //==========================================================
   public onActive(): void {
   }

   //==========================================================
   // <T>激活处理。</T>
   //==========================================================
   public active(): void {
      if (!this._statusActive) {
         this.onActive();
         this._statusActive = true;
      }
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //==========================================================
   public onDeactive(): void {
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //==========================================================
   public deactive(): void {
      if (this._statusActive) {
         this.onDeactive();
         this._statusActive = false;
      }
   }

   //==========================================================
   // <T>卸载处理。</T>
   //==========================================================
   public onUnload(): void {
   }

   //==========================================================
   // <T>卸载处理。</T>
   //==========================================================
   public unload(): void {
      if (this._statusLoad) {
         this.onUnload();
         this._statusLoad = false;
      }
   }
}
