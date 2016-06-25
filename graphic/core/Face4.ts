import {Vector3} from '../../math/Vector3';
import {Face} from './Face';

/**
 * 四角面。
 */
export class Face4 extends Face {

   /**
    * 构造处理。
    */
   public constructor(index1: number, index2: number, index3: number, index4: number, normal?: Vector3, color: number = 0xFFFFFFFF, materialIndex: number = 0) {
      super();
      // 设置属性
      var indexs = this.indexs;
      indexs.push(index1);
      indexs.push(index2);
      indexs.push(index3);
      indexs.push(index4);
      this.normal = normal;
      this.color = color;
      this.materialIndex = materialIndex;
   }
}
