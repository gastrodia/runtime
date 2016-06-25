import {Vector3} from '../../math/Vector3';

/**
 * 面。
 */
export class Face {
   // 几何体编号
   public geometryId: number;
   // 索引集合
   public indexs: Array<number>;
   // 纹理集合
   public coordIndexs: Array<number>;
   // 法线
   public normal: Vector3;
   // 法线索引
   public normalIndexes: Array<number>;
   // 副法线索引
   public binormalIndexes: Array<number>;
   // 切线索引
   public tangentsIndexes: Array<number>;
   // 面颜色
   public color: number;
   // 面法线
   public direction: Vector3;
   // 光滑级别
   public smooth: number;
   // 材质索引
   public materialIndex: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.geometryId = 0;
      this.indexs = Array<number>();
      this.color = 0xFFFFFFFF;
      this.materialIndex = 0;
   }
}
