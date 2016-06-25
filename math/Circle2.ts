import {Vector2} from './Vector2';

export class Circle2 {

    public center: Vector2;
    public radius: number;
    constructor(center: Vector2, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    public getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    public getPointByAngle(angle:number):Vector2{
        var a = this.center.x + this.radius * Math.cos(angle);
        var b = this.center.y + this.radius * Math.sin(angle);
        return new Vector2(a,b)
    }

    /**
       %sovled in matlab:
       %求解出的表达式太长，所以我定义了一个化简函数
       function [ f,q_expr,t_expr ] = simple( f )
            f=simplify(expand(f))
            [f,sigma]=subexpr(f)
            t_expr = sigma
            syms sigma t
            f=subs(f,sigma,t)
            [f,sigma]=subexpr(f)
            q_expr = sigma
            syms sigma q
            f=subs(f,sigma,q)
        end

        %求解
        syms a1 b1 a2 b2 x y r;[x,y]=solve('(a1-x)^2 + (b1-y)^2=r^2','(a2-x)^2 + (b2-y)^2=r^2')

        %化简x1
        [f,q,t] = simple(x(1,1))
        %化简y1
        [f,q,t] = simple(y(1,1))
        %化简x2
        [f,q,t] = simple(x(2,1))
        %化简y2
        [f,q,t] = simple(x(1,1))

        //最终在js化简下matlab的结果
        function js_expr(expr){
            return expr.replace(/(\w\d)\^(\d)/g,function(str,$1,$2){return 'Math.pow(' + $1 + ',' + $2 + ')'})
        }
        
    */
    public static createCircle2WithRadiusAndDoublePoints(r: number, point1: Vector2, point2: Vector2) {
        var a1 = point1.x;
        var b1 = point1.y;
        var a2 = point2.x;
        var b2 = point2.y;


        function x1() {
            var t = 1 / (Math.pow(a1, 2) - 2 * a1 * a2 + Math.pow(a2, 2) + Math.pow(b1, 2) - 2 * b1 * b2 + Math.pow(b2, 2))
            var q = (-t * (Math.pow(a1, 2) - 2 * a1 * a2 + Math.pow(a2, 2) + Math.pow(b1, 2) - 2 * b1 * b2 + Math.pow(b2, 2) - 4 * Math.pow(r, 2)))
            q = Math.pow(q, 1 / 2)
            return a1 / 2 + a2 / 2 + (b1 * q) / 2 - (b2 * q) / 2
        }
        function y1() {
            var t = 1 / (Math.pow(a1, 2) - 2 * a1 * a2 + Math.pow(a2, 2) + Math.pow(b1, 2) - 2 * b1 * b2 + Math.pow(b2, 2))
            var q = (-t * (Math.pow(a1, 2) - 2 * a1 * a2 + Math.pow(a2, 2) + Math.pow(b1, 2) - 2 * b1 * b2 + Math.pow(b2, 2) - 4 * Math.pow(r, 2)))
            q = Math.pow(q, 1 / 2)
            return b1 / 2 + b2 / 2 - (a1 * q) / 2 + (a2 * q) / 2
        }
        function x2() {
            var t = 1 / (Math.pow(a1, 2) - 2 * a1 * a2 + Math.pow(a2, 2) + Math.pow(b1, 2) - 2 * b1 * b2 + Math.pow(b2, 2))
            var q = (-t * (Math.pow(a1, 2) - 2 * a1 * a2 + Math.pow(a2, 2) + Math.pow(b1, 2) - 2 * b1 * b2 + Math.pow(b2, 2) - 4 * Math.pow(r, 2)))
            q = Math.pow(q, 1 / 2)
            return a1 / 2 + a2 / 2 - (b1 * q) / 2 + (b2 * q) / 2
        }
        function y2() {
            var t = 1 / (Math.pow(a1, 2) - 2 * a1 * a2 + Math.pow(a2, 2) + Math.pow(b1, 2) - 2 * b1 * b2 + Math.pow(b2, 2))
            var q = (-t * (Math.pow(a1, 2) - 2 * a1 * a2 + Math.pow(a2, 2) + Math.pow(b1, 2) - 2 * b1 * b2 + Math.pow(b2, 2) - 4 * Math.pow(r, 2)))
            q = Math.pow(q, 1 / 2)
            return b1 / 2 + b2 / 2 + (a1 * q) / 2 - (a2 * q) / 2
        }

        return [
            new Circle2(new Vector2(x1(), y1()), r),
            new Circle2(new Vector2(x2(), y2()), r)
        ]

    }

    /**
     * clockwise 默认代表顺时针 传入flase代表逆时针
     */
    public static createCircle2WithRadiusPointsAndClockwise(r: number, point1: Vector2, point2: Vector2, clockwise: boolean) {
        var arcTangent = new Vector2(point2.x - point1.x, point2.y - point1.y)
        var middle = new Vector2((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
        function simplify(num) {
            return Math.round(num * 100) / 100;
        }

        function radiusArcAngle(radiusTan: Vector2, arcTan: Vector2): number {
            var radiusTanAngle = Math.atan2(radiusTan.y, radiusTan.x);
            var arcTanAngle = Math.atan2(arcTan.y, arcTan.x);
            var angle = arcTanAngle - radiusTanAngle;
            if (angle < 0) {
                angle += Math.PI * 2;
            }
            return simplify(angle)
        }

        var angle = simplify(Math.PI / 2)//90
        if (clockwise != undefined && !clockwise) {
            angle = simplify(Math.PI * 3 / 2);//-90 即 270
          //  debugger;

        }

        var circlesFromPoint = this.createCircle2WithRadiusAndDoublePoints(r, point1, point2);
        var res: Circle2;
        for (var i in circlesFromPoint) {
            var circle: Circle2 = circlesFromPoint[i];
            var center = circle.center;
            var radiusTangent = new Vector2(middle.x - center.x, middle.y - center.y);
            var thisAngle = radiusArcAngle(radiusTangent, arcTangent);
            if (thisAngle == angle) {
                res = circle;
                break;
            }
        }
        // if (!res) {
        //     debugger;
        // }
        return res;
    }



}
