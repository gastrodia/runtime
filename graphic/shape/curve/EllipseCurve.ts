import {Curve} from '../brep/Curve';

/**
 * 椭圆曲线。
 */
export class EllipseCurve extends Curve {
    public aX: number;
    public aY: number;
    public xRadius: number;
    public yRadius: number;
    public aStartAngle: number;
    public aEndAngle: number;
    public aClockwise: boolean;
    public aRotation: number;

    public constructor(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
        super();
        this.aX = aX;
        this.aY = aY;
        this.xRadius = xRadius;
        this.yRadius = yRadius;
        this.aStartAngle = aStartAngle;
        this.aEndAngle = aEndAngle;
        this.aClockwise = aClockwise;
        this.aRotation = aRotation || 0;
    }

   /**
    * 获得指定步长的点信息。
    *
    * @param step 步长
    * @return 点坐标
    */
    public getPoint(step:number):any {
        var deltaAngle = this.aEndAngle - this.aStartAngle;
        if (deltaAngle < 0) deltaAngle += Math.PI * 2;
        if (deltaAngle > Math.PI * 2) deltaAngle -= Math.PI * 2;
        var angle;
        if (this.aClockwise === true) {
            angle = this.aEndAngle + (1 - step) * (Math.PI * 2 - deltaAngle);
        } else {
            angle = this.aStartAngle + step * deltaAngle;
        }
        var x = this.aX + this.xRadius * Math.cos(angle);
        var y = this.aY + this.yRadius * Math.sin(angle);
        if (this.aRotation !== 0) {
            var cos = Math.cos(this.aRotation);
            var sin = Math.sin(this.aRotation);
            var tx = x, ty = y;
            // Rotate the point about the center of the ellipse.
            x = (tx - this.aX) * cos - (ty - this.aY) * sin + this.aX;
            y = (tx - this.aX) * sin + (ty - this.aY) * cos + this.aY;
        }
        return new THREE.Vector2(x, y);
    }
}
