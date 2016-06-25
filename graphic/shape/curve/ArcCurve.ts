import {Curve} from '../brep/Curve';

/**
 * 圆弧配置信息。
 */
export class ArcCurveOptions {
   // X坐标
   public aX: number;
   // Y坐标
   public aY: number;
   // X半径
   public xRadius: number;
   // Y半径
   public yRadius: number;
   // 开始角
   public aStartAngle: number;
   // 结束角
   public aEndAngle: number;
   //
   public aClockwise: number;
   // 旋转角
   public aRotation: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.aX = 16;
      this.aY = 16;
      this.xRadius = 1;
      this.yRadius = 1;
      this.aStartAngle = 0xFF808080;
      this.aEndAngle = 0xFFFF0000;
      this.aClockwise = 0xFF00FF00;
      this.aRotation = 0xFF0000FF;
   }
}

/**
 * 圆弧曲线。
 */
export class ArcCurve extends Curve {
   /** 配置信息 */
   public options: ArcCurveOptions;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.options = new ArcCurveOptions();
   }
   public getPoint(t) {

   }

   // THREE.EllipseCurve = function(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
   //    this.aX = aX;
   //    this.aY = aY;
   //    this.xRadius = xRadius;
   //    this.yRadius = yRadius;
   //    this.aStartAngle = aStartAngle;
   //    this.aEndAngle = aEndAngle;
   //    this.aClockwise = aClockwise;
   //    this.aRotation = aRotation || 0;
   // };
   // THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
   // THREE.EllipseCurve.prototype.constructor = THREE.EllipseCurve;
   // THREE.EllipseCurve.prototype.getPoint = function(t) {
   //    var deltaAngle = this.aEndAngle - this.aStartAngle;
   //    if (deltaAngle < 0) deltaAngle += Math.PI * 2;
   //    if (deltaAngle > Math.PI * 2) deltaAngle -= Math.PI * 2;
   //    var angle;
   //    if (this.aClockwise === true) {
   //       angle = this.aEndAngle + (1 - t) * (Math.PI * 2 - deltaAngle);
   //    } else {
   //       angle = this.aStartAngle + t * deltaAngle;
   //    }
   //    var x = this.aX + this.xRadius * Math.cos(angle);
   //    var y = this.aY + this.yRadius * Math.sin(angle);
   //    if (this.aRotation !== 0) {
   //       var cos = Math.cos(this.aRotation);
   //       var sin = Math.sin(this.aRotation);
   //       var tx = x, ty = y;
   //       // Rotate the point about the center of the ellipse.
   //       x = (tx - this.aX) * cos - (ty - this.aY) * sin + this.aX;
   //       y = (tx - this.aX) * sin + (ty - this.aY) * cos + this.aY;
   //    }
   //    return new THREE.Vector2(x, y);
   // };
}
