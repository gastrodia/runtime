import {ObjectBase} from '../../common/lang/ObjectBase';
import {Vector2} from '../../math/Vector2';
import {SamplerFilterEnum} from '../core/SamplerFilterEnum';
import {TextureEnum} from './TextureEnum';
import {TextureFormatEnum} from './TextureFormatEnum';

//==========================================================
// <T>渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class Texture extends ObjectBase {
   // 代码
   public code: string;
   // 准备好
   public ready: boolean;
   // 纹理类型
   public textureCd: TextureEnum;
   // 开始位置
   public offset: Vector2;
   // 重复单位
   public repeat: Vector2;
   // MIN取样
   public filterMinCd: SamplerFilterEnum;
   // MAG取样
   public filterMagCd: SamplerFilterEnum;
   // S缠绕
   public wrapS: SamplerFilterEnum;
   // T缠绕
   public wrapT: SamplerFilterEnum;
   // 内置格式类型
   public formatInternalCd: TextureFormatEnum;
   // 格式类型
   public formatCd: TextureFormatEnum;
   // 格式类型类型
   public formatTypeCd: TextureFormatEnum;
   // 地址
   public url: string;
   // 加载状态
   public statusLoad: boolean;
   // 脏状态
   public statusDirty: boolean;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.filterMinCd = SamplerFilterEnum.Linear;
      this.filterMagCd = SamplerFilterEnum.Linear;
      this.wrapS = SamplerFilterEnum.Repeat;
      this.wrapT = SamplerFilterEnum.Repeat;
      this.formatInternalCd = TextureFormatEnum.RGBA;
      this.formatCd = TextureFormatEnum.RGBA;
      this.formatTypeCd = TextureFormatEnum.UnsignedByte;
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup() {
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 准备好
   //==========================================================
   public testReady(): boolean {
      return this.ready;
   }

   //==========================================================
   // <T>判断是否有效</T>
   //
   // @return 是否有效
   //==========================================================
   public isValid(): boolean {
      return true;
   }

   //==========================================================
   // <T>设置取样。</T>
   //
   // @method
   // @param minCd MIN取样
   // @param magCd MAG取样
   //==========================================================
   public setFilterCd(minCd: SamplerFilterEnum, magCd: SamplerFilterEnum) {
      this.filterMinCd = minCd;
      this.filterMagCd = magCd;
   }

   //==========================================================
   // <T>设置卷动。</T>
   //
   // @method
   // @param wrapS S缠绕
   // @param wrapT T缠绕
   //==========================================================
   public setWrapCd(wrapS: SamplerFilterEnum, wrapT: SamplerFilterEnum) {
      this.wrapS = wrapS;
      this.wrapT = wrapT;
   }

   //==========================================================
   // <T>更新处理。</T>
   //==========================================================
   public update() {
   }
}
