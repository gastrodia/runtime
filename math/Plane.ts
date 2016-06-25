import {MathUtil} from '../../runtime/math/MathUtil';
import {Prototype} from '../common/reflect/Prototype';
import {Matrix3} from './Matrix3';
import {Vector3} from './Vector3';

export class Plane {

    public normal:Vector3;

    public constant: number;

    public constructor(normal?: any, constant?: any) {
        this.normal = (normal !== undefined) ? normal : new Vector3(1, 0, 0);
        this.constant = (constant !== undefined) ? constant : 0;
    }

    public set(normal, constant) {
        this.normal.assign(normal);
        this.constant = constant;
        return this;
    }

    public setComponents(x, y, z, w) {
        this.normal.set(x, y, z);
        this.constant = w;
        return this;
    }

    public setFromNormalAndCoplanarPoint(normal, point) {
        this.normal.assign(normal);
        this.constant = - point.dot(this.normal);
        return this;
    }


    @Prototype()
    public setFromCoplanarPoints(a, b, c) {
        var v1 = new Vector3();
        var v2 = new Vector3();
        return function (a, b, c) {
            var normal = v1.subVectors(c, b).cross(v2.subVectors(a, b)).normalize();
            this.setFromNormalAndCoplanarPoint(normal, a);
            return this;
        };
    }

    public clone(): Plane {
        return new (this as any).constructor().copy(this);
    }

    public copy(plane) {
        this.normal.assign(plane.normal);
        this.constant = plane.constant;
        return this;
    }

    public normalize() {
        var inverseNormalLength = 1.0 / this.normal.length();
        this.normal.multiplyScalar(inverseNormalLength);
        this.constant *= inverseNormalLength;
        return this;
    }

    public negate() {
        this.constant *= - 1;
        this.normal.negate();
        return this;
    }

    public distanceToPoint(point) {
        return this.normal.dot(point) + this.constant;
    }

    public distanceToSphere(sphere) {
        return this.distanceToPoint(sphere.center) - sphere.radius;
    }

    public projectPoint(point, optionalTarget) {
        return this.orthoPoint(point, optionalTarget).sub(point).negate();
    }

    public orthoPoint(point, optionalTarget) {
        var perpendicularMagnitude = this.distanceToPoint(point);
        var result = optionalTarget || new Vector3();
        return result.assign(this.normal).multiplyScalar(perpendicularMagnitude);
    }

    @Prototype()
    public intersectLine() {
        var v1 = new Vector3();
        return function (line, optionalTarget) {
            var result = optionalTarget || new Vector3();
            var direction = line.delta(v1);
            var denominator = this.normal.dot(direction);
            if (denominator === 0) {
                // line is coplanar, return origin
                if (this.distanceToPoint(line.start) === 0) {
                    return result.assign(line.start);
                }
                // Unsure if this is the correct method to handle this case.
                return undefined;
            }
            var t = - (line.start.dot(this.normal) + this.constant) / denominator;
            if (t < 0 || t > 1) {
                return undefined;
            }
            return result.assign(direction).multiplyScalar(t).add(line.start);
        };
    }

    public intersectsLine(line) {
        var startSign = this.distanceToPoint(line.start);
        var endSign = this.distanceToPoint(line.end);
        return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);
    }

    public intersectsBox(box) {
        return box.intersectsPlane(this);
    }

    public intersectsSphere(sphere) {
        return sphere.intersectsPlane(this);
    }

    public coplanarPoint(optionalTarget) {
        var result = optionalTarget || new Vector3();
        return result.assign(this.normal).multiplyScalar(- this.constant);
    }

    @Prototype()
    public applyMatrix4() {
        var v1 = new Vector3();
        var v2 = new Vector3();
        var m1 = new Matrix3();
        return function (matrix, optionalNormalMatrix) {
            var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix(matrix);
            var newNormal = v1.assign(this.normal).applyMatrix3(normalMatrix);
            var newCoplanarPoint = this.coplanarPoint(v2);
            newCoplanarPoint.applyMatrix4(matrix);
            this.setFromNormalAndCoplanarPoint(newNormal, newCoplanarPoint);
            return this;
        };
    }

    public translate(offset) {
        this.constant = this.constant - offset.dot(this.normal);
        return this;
    }

    public equals(plane) {
        return plane.normal.equals(this.normal) && (plane.constant === this.constant);
    }

    public nearlyEquals(plane:Plane) {
        return plane.normal.nearlyEquals(this.normal) && (MathUtil.nearlyEquals(plane.constant , this.constant));
    }
}
