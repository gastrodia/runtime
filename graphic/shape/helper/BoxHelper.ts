import {Box3} from '../../../math/Box3';
import {Vector3} from '../../../math/Vector3';
import {CurveActor} from '../../actor/CurveActor';
import {CurvePath} from '../brep/CurvePath';

/**
 * 盒子帮助器配置信息。
 */
export class BoxHelperOptions {
   // 方向
   public direction: Vector3;
   // 开始点
   public origin: Vector3;
   // 长度
   public length: number;
   // 颜色
   public color: number;
   // 头长度
   public headLength: number;
   // 头宽度
   public headWidth: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.origin = new Vector3(0, 0, 0);
      this.direction = new Vector3(0, 1, 0);
      this.length = 1;
      this.color = 0xFFFF0000;
      this.headLength = 0.2;
      this.headWidth = 0.06;
   }
}

/**
 * 盒子帮助器。
 */
export class BoxHelper extends CurveActor {
   // 配置信息
   public options: BoxHelperOptions;

   public box = new Box3();

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置参数
      this.options = new BoxHelperOptions();
      this.curve = new CurvePath();
      // var indices = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
      // var positions = new Float32Array(8 * 3);
      // var geometry = new BufferGeometry();
      // geometry.setIndex(new BufferAttribute(indices, 1));
      // geometry.addAttribute('position', new BufferAttribute(positions, 3));
      // THREE.LineSegments.call(this, geometry, new LineBasicMaterial({ color: 0xffff00 }));
      // if (object !== undefined) {
      //    this.update(object);
      // }
   }

   public build(box: Box3) {
      // box.setFromObject(object);
      if (box.isEmpty()) {
         return;
      }
      var min = box.min;
      var max = box.max;
      /*
      5____4
      1/___0/|
      | 6__|_7
      2/___3/
      0: max.x, max.y, max.z
      1: min.x, max.y, max.z
      2: min.x, min.y, max.z
      3: max.x, min.y, max.z
      4: max.x, max.y, min.z
      5: min.x, max.y, min.z
      6: min.x, min.y, min.z
      7: max.x, min.y, min.z
      */
      // var position = this.geometry.attributes.position;
      // var array = position.array;
      // array[0] = max.x; array[1] = max.y; array[2] = max.z;
      // array[3] = min.x; array[4] = max.y; array[5] = max.z;
      // array[6] = min.x; array[7] = min.y; array[8] = max.z;
      // array[9] = max.x; array[10] = min.y; array[11] = max.z;
      // array[12] = max.x; array[13] = max.y; array[14] = min.z;
      // array[15] = min.x; array[16] = max.y; array[17] = min.z;
      // array[18] = min.x; array[19] = min.y; array[20] = min.z;
      // array[21] = max.x; array[22] = min.y; array[23] = min.z;
      // position.needsUpdate = true;
      // this.geometry.computeBoundingSphere();
   }
}
