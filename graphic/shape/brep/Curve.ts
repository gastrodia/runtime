import {ObjectBase} from '../../../../runtime/common/lang/ObjectBase';
import {Vertex} from '../../core/Vertex';

/**
 * 曲线。
 *
 * @author maocy
 * @version 160422
 */
export abstract class Curve extends ObjectBase {
    // 需要更新
    public needsUpdate: boolean;

    public __arcLengthDivisions: any;
    public cacheArcLengths: any;

    /**
     * 构造处理。
     */
    public constructor() {
        super();
        // 设置属性
        this.needsUpdate = true;
    }

    /**
     * 转换为顶点集合。
     *
     * @param vertices 顶点集合
     * @return 顶点集合
     */
    // public toVertices(vertices?: Array<Vertex>): Array<Vertex> {
    //     if (!vertices) {
    //         vertices = new Array<Vertex>();
    //     }
    //     return vertices;
    // }

    /**
     * 获得点数据
     */
    public abstract getPoint(step);

    /**
     *  Get point at relative position in curve according to arc length
     *  - u [0 .. 1]
     */
    public getPointAt(u) {
        var t = this.getUtoTmapping(u);
        return this.getPoint(t);
    }

    /**
     *  Get sequence of points using getPoint( t )
     */
    public getPoints(divisions: number = 5) {
        var d, pts = [];
        for (d = 0; d <= divisions; d++) {
            pts.push(this.getPoint(d / divisions));
        }
        return pts;
    }

    /**
     * Get sequence of points using getPointAt( u )
     */
    public getSpacedPoints(divisions: number = 5) {
        var d, pts = [];
        for (d = 0; d <= divisions; d++) {
            pts.push(this.getPointAt(d / divisions));
        }
        return pts;
    }

    /**
     * Get total curve arc length
     */
    public getLength() {
        var lengths = this.getLengths();
        return lengths[lengths.length - 1];
    }

    /**
     *  Get list of cumulative segment lengths
     * */
    public getLengths(divisions?: any) {
        if (!divisions) divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions) : 200;
        if (this.cacheArcLengths && (this.cacheArcLengths.length === divisions + 1) && !this.needsUpdate) {
            return this.cacheArcLengths;
        }
        this.needsUpdate = false;
        var cache = [];
        var current, last = this.getPoint(0);
        var p, sum = 0;
        cache.push(0);
        for (p = 1; p <= divisions; p++) {
            current = this.getPoint(p / divisions);
            sum += current.distanceTo(last);
            cache.push(sum);
            last = current;
        }
        this.cacheArcLengths = cache;
        return cache;
    }

    public updateArcLengths() {
        this.needsUpdate = true;
        this.getLengths();
    }

    public getUtoTmapping(u, distance?: any) {
        var arcLengths = this.getLengths();
        var i = 0, il = arcLengths.length;
        var targetArcLength;
        if (distance) {
            targetArcLength = distance;
        } else {
            targetArcLength = u * arcLengths[il - 1];
        }
        var low = 0, high = il - 1, comparison;
        while (low <= high) {
            i = Math.floor(low + (high - low) / 2);
            comparison = arcLengths[i] - targetArcLength;
            if (comparison < 0) {
                low = i + 1;
            } else if (comparison > 0) {
                high = i - 1;
            } else {
                high = i;
                break;
            }
        }
        i = high;
        if (arcLengths[i] === targetArcLength) {
            var t = i / (il - 1);
            return t;
        }
        var lengthBefore = arcLengths[i];
        var lengthAfter = arcLengths[i + 1];
        var segmentLength = lengthAfter - lengthBefore;
        var segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
        var t = (i + segmentFraction) / (il - 1);
        return t;
    }

    public getTangent(t) {
        var delta = 0.0001;
        var t1 = t - delta;
        var t2 = t + delta;
        if (t1 < 0) {
            t1 = 0;
        }
        if (t2 > 1) {
            t2 = 1;
        }
        var pt1 = this.getPoint(t1);
        var pt2 = this.getPoint(t2);
        var vec = pt2.clone().sub(pt1);
        return vec.normalize();
    }

    public getTangentAt(u) {
        var t = this.getUtoTmapping(u);
        return this.getTangent(t);
    }
}
