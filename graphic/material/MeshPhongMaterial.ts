import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Color4} from '../../../runtime/math/Color4';
import {Material} from './Material';
import {Texture} from './Texture';

//==========================================================
// <T>复合渲染材质。</T>
//
// @author maocy
// @history 160316
//==========================================================
export class MeshPhongMaterial extends Material {
   // 透明基础
   public alphaBase: number;
   // 透明比率
   public alphaRate: number;
   // 环境光颜色
   public ambientColor: Color4;
   // 散射光颜色
   public diffuseColor: Color4;
   // 高光颜色
   public specularColor: Color4;
   // 高光级别
   public specularPower: number;
   // 颜色贴图
   public diffuseTexture: Texture;
   // 法线贴图
   public normalTexture: Texture;
   // 高光贴图
   public specularTexture: Texture;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.effectCode = 'mesh.phong';
      this.alphaBase = 0.1;
      this.alphaRate = 1;
      this.ambientColor = new Color4(0.4, 0.4, 0.4, 0.7);
      this.diffuseColor = new Color4(0.6, 0.6, 0.6, 0.6);
      this.specularPower = 32;
   }

   //==========================================================
   // <T>更新内容。</T>
   //==========================================================
   public update() {
      this.textures.set('diffuse', this.diffuseTexture);
      this.textures.set('normal', this.normalTexture);
      this.textures.set('specular', this.specularTexture);
   }

   //==========================================================
   // <T>重置内容。</T>
   //==========================================================
   public reset() {
      super.reset();
      this.alphaBase = 0.1;
      this.alphaRate = 1;
      this.ambientColor.set(1, 1, 1, 0.7);
      this.diffuseColor.set(1, 1, 1, 0.6);
      this.specularPower = 32;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      this.ambientColor = ObjectUtil.dispose(this.ambientColor);
      this.diffuseColor = ObjectUtil.dispose(this.diffuseColor);
      // 父处理
      super.dispose();
   }
}
