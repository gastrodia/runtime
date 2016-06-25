import {Actor} from '../core/Actor';
import {Material} from '../material/Material';
import {Curve} from '../shape/brep/Curve';

/**
 * 曲线实体。
 */
export class CurveActor extends Actor {
   // 网格
   public curve: Curve;
   // 材质
   public material: Material;

   /**
    * 构造处理。
    *
    * @param curve 曲线
    * @param material 材质
    */
   public constructor(curve?: Curve, material?: Material) {
      super();
      // 设置属性
      this.curve = curve;
      this.material = material;
   }
}
