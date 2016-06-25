import {Circle2} from './Circle2';
import {Vector2} from './Vector2';

export class Arc2 {

    get center(): Vector2 {
        return this.circle.center;
    };
    get radius(): number {
        return this.circle.radius;
    };

    private circle: Circle2;
    public startPoint: Vector2;
    public endPoint: Vector2;
    public clockwise: boolean;

    constructor(radius: number, startPoint: Vector2, endPoint: Vector2, clockwise: boolean) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.clockwise = true;
        if (clockwise != undefined && clockwise == false) {
            this.clockwise = false;
        }
        this.circle = Circle2.createCircle2WithRadiusPointsAndClockwise(radius, this.startPoint, this.endPoint, clockwise)
    }

    public getArea(): number {
        return null;
    }

    public getAngle(): number {
        var startVector = new Vector2(this.startPoint.x - this.center.x, this.startPoint.y - this.center.y);
        var endVector = new Vector2(this.endPoint.x - this.center.x, this.endPoint.y - this.center.y);
        var endAngle = Math.atan2(endVector.y, endVector.x);
        var startAngle = Math.atan2(startVector.y, startVector.x);

        var angle = endAngle - startAngle;
        if (!this.clockwise) {
            angle = startAngle - endAngle;
        }

        if (angle < 0) {
            angle += Math.PI * 2;
        }
        return angle;
    }

    public getStartAngle(): number {
        var startPoint = this.startPoint;
        // if(!this.clockwise){
        //     startPoint = this.endPoint;
        // }
        var startVector = new Vector2(startPoint.x - this.center.x, startPoint.y - this.center.y);
        var angle = Math.atan2(startVector.y, startVector.x);
        return angle;
    }

    public getEndAngle(): number {
        var endPoint = this.endPoint;
        // if(!this.clockwise){
        //     endPoint = this.startPoint;
        // }
        var endVector = new Vector2(endPoint.x - this.center.x, endPoint.y - this.center.y);
        var angle = Math.atan2(endVector.y, endVector.x);
        return angle;
    }

    public getPoints(divisions?: number): Array<Vector2> {
        divisions = divisions || 12;
        // var b2 = ShapeUtils.b2;
        // var b3 = ShapeUtils.b3;
        var cpx, cpy, cpx2, cpy2, cpx1, cpy1, cpx0, cpy0, laste, tx, ty;
        var points = new Array<Vector2>();
        var aX = this.center.x, aY = this.center.y,
            xRadius = this.radius,
            yRadius = this.radius,
            aStartAngle = this.getStartAngle(), aEndAngle = this.getEndAngle(),
            aClockwise = this.clockwise;
        var deltaAngle = this.getAngle();
        var angle;
        var tdivisions = divisions * 2;

        for (var j = 1; j <= tdivisions; j++) {
            var t = j / tdivisions;

            if (this.clockwise) {
                angle = aStartAngle + t * deltaAngle;
            } else {
                angle = aStartAngle - t * deltaAngle;
            }

            //console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);
            points.push(this.circle.getPointByAngle(angle));
        }

        return points;
    }
}
