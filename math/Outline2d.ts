import {Outline2} from './Outline2';
import {Vector2} from './Vector2';

//==========================================================
// <T>三维轮廓。</T>
//  00 ── 01
//  │      │
//  │      │
//  03 ── 02
//
// @struct
// @author maocy
// @version 150912
//==========================================================
export class Outline2d extends Outline2 {
   //..........................................................
   // @attribute 中心点
   public center: Vector2 = new Vector2();
   public distance: Vector2 = new Vector2();
   // @attribute 半径
   public radius = 0;
   // @attribute 顶点集合
   public points = new Array(8);

   //============================================================
   // <T>接收一个三维轮廓。</T>
   //
   // @method
   // @param p:value:SOutline3 三维轮廓
   //============================================================
   public assign(value) {
      this.center.assign(value.center);
      this.distance.assign(value.distance);
      this.radius = value.radius;
      for (var i = 0; i < 8; i++) {
         this.points[i] = value.points[i];
      }
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param ix:minX:Number 最小X坐标
   // @param iy:minY:Number 最小Y坐标
   // @param ax:maxX:Number 最大X坐标
   // @param ay:maxY:Number 最大Y坐标
   //==========================================================
   public set(minX, minY, maxX, maxY) {
      this.min.set(minX, minY);
      this.max.set(maxX, maxY);
      this.update();
   }

   //============================================================
   // <T>根据轮廓更新数据。</T>
   //
   // @method
   //============================================================
   public update() {
      // 获得数据
      var min = this.min;
      var minX = min.x;
      var minY = min.y;
      var max = this.max;
      var maxX = max.x;
      var maxY = max.y;
      // 设置空间坐标
      var ps = this.points;
      ps[0] = minX;
      ps[1] = maxY;
      ps[2] = maxX;
      ps[3] = maxY;
      ps[4] = maxX;
      ps[5] = minY;
      ps[6] = minX;
      ps[7] = minY;
      // 计算中心位置
      var center = this.center;
      center.x = (minX + maxX) * 0.5;
      center.y = (minY + maxY) * 0.5;
      // 计算距离
      var distance = this.distance;
      distance.x = maxX - minX;
      distance.y = maxY - minY;
      // 计算半径
      var cx = maxX - minX;
      var cy = maxY - minY;
      this.radius = Math.sqrt(cx * cx + cy * cy) * 0.5;
   }
}
