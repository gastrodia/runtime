import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Objects} from '../../../runtime/common/lang/Objects';
import {Material} from './Material';

//==========================================================
// <T>复合渲染材质。</T>
//
// @author maocy
// @history 160316
//==========================================================
export class CombinationMaterial extends Material {
   // 材质集合
   protected _materials: Objects<Material>;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._materials = new Objects<Material>();
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose(): void {
      // 释放属性
      this._materials = ObjectUtil.dispose(this._materials);
      // 父处理
      super.dispose();
   }
}
