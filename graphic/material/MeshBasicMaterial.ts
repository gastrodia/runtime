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
export class MeshBasicMaterial extends Material {
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
   // 高光基础
   public specularBase: number;
   // 高光级别
   public specularPower: number;
   // 贴图
   public texture: Texture;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.effectCode = 'mesh.basic';
      this.alphaBase = 0.1;
      this.alphaRate = 1;
      this.ambientColor = new Color4(1, 1, 1, 1);
      this.diffuseColor = new Color4(0, 0, 0, 0);
      this.specularColor = new Color4(0, 0, 0, 0);
      this.specularBase = 0;
      this.specularPower = 32;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      // 释放属性
      this.ambientColor = ObjectUtil.dispose(this.ambientColor);
      this.diffuseColor = ObjectUtil.dispose(this.diffuseColor);
      this.specularColor = ObjectUtil.dispose(this.specularColor);
      // 父处理
      super.dispose();
   }
}
