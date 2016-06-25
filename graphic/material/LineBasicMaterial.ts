import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Color4} from '../../../runtime/math/Color4';
import {Material} from './Material';

/**
 * 基本线段材质。
 */
export class LineBasicMaterial extends Material {
   // 颜色
   public color: Color4;
   // 宽度
   public width: number;
   // 线帽模式
   public lineCap = 'round';
   // 关联模式
   public lineJoin = 'round';

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.effectCode = 'line.basic';
      this.color = new Color4(1, 1, 1, 1);
      this.width = 1;
   }

   /**
    * 释放处理。
    */
   public dispose(): void {
      // 释放属性
      this.color = ObjectUtil.dispose(this.color);
      // 父处理
      super.dispose();
   }
}
