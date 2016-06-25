import {Vector2} from '../../math/Vector2';
import {Vector3} from '../../math/Vector3';

/**
 * 顶点。
 *
 * @author maocy
 * @version 160506
 */
export class Vertex {
   // 索引
   public index: number;
   // 坐标
   public position: Vector3;
   // 法线
   public normal: Vector3;
   // 副法线
   public binormal: Vector3;
   // 切线
   public tangent: Vector3;
   // 颜色
   public color: number;
   // 纹理1
   public coord1: Vector2;
   // 纹理2
   public coord2: Vector2;

   public static create(x, y, z): Vertex {
      var vertex = new Vertex();
      vertex.position = new Vector3(x, y, z);
      return vertex;
   }
}
