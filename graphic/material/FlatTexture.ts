import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Size2} from '../../../runtime/math/Size2';
import {Texture} from './Texture';
import {TextureEnum} from './TextureEnum';

//==========================================================
// <T>平面渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class FlatTexture extends Texture {
   // 纵向翻转
   public optionFlipY: boolean;
   // 大小
   public size: Size2;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.textureCd = TextureEnum.Flat2d;
      this.size = new Size2();
   }

   //o.uploadData   = MO.Method.virtual(o, 'uploadData');
   //o.upload       = MO.Method.virtual(o, 'upload');
   //o.update       = MO.Method.empty;

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this.size = ObjectUtil.dispose(this.size);
      // 父处理
      super.dispose();
   }
}
