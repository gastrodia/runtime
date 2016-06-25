import {Texture} from './Texture';
import {TextureEnum} from './TextureEnum';

//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class CubeTexture extends Texture {
   // 大小
   public size: number;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.size = 0;
      this.textureCd = TextureEnum.Cube;
   }
}
