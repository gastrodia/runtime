import {Vector3} from '../../../../runtime/math/Vector3';
import {Vertex} from '../../core/Vertex';
import {Curve} from '../brep/Curve';

/**
 * 路径。
 *
 * @author maocy
 * @version 160422
 */
export class CurvePath extends Curve {

    public curves: Array<Curve>;

    public autoClose: boolean;

    public cacheLengths;

    /**
     * 构造处理。
     */
    public constructor() {
        super();
        // 设置属性
        this.curves = new Array<Curve>();
    }

    /**
     * 增加一个曲线。
     *
     * @param curve 曲线
     */
    public add(curve: Curve) {
        this.curves.push(curve);
    }

    /**
     * 转换为顶点集合。
     *
     * @param vertices 顶点集合
     * @return 顶点集合
     */
    // public toVertices(vertices: Array<Vertex>): Array<Vertex> {
    //     vertices = super.toVertices(vertices);
    //     // 输出所有顶点
    //     var curves = this.curves;
    //     var count = curves.length;
    //     for (var i = 0; i < count; i++) {
    //         var curve = curves[i];
    //         curve.toVertices(vertices);
    //     }
    //     return vertices;
    // }

    /**
     * 重置处理。
     */
    public reset() {
        this.curves = [];
    }

    public closePath() {
        var startPoint = this.curves[0].getPoint(0);
        var endPoint = this.curves[this.curves.length - 1].getPoint(1);
        if (!startPoint.equals(endPoint)) {
            // this.curves.push(new LineCurve(endPoint, startPoint));
        }
    }

    // // To get accurate point with reference to
    // // entire path distance at time t,
    // // following has to be done:
    // // 1. Length of each sub path have to be known
    // // 2. Locate and identify type of curve
    // // 3. Get t for the curve
    // // 4. Return curve.getPointAt(t')
    public getPoint(t) {
        var d = t * this.getLength();
        var curveLengths = this.getCurveLengths();
        var i = 0;
        // To think about boundaries points.
        while (i < curveLengths.length) {
            if (curveLengths[i] >= d) {
                var diff = curveLengths[i] - d;
                var curve = this.curves[i];
                var u = 1 - diff / curve.getLength();
                return curve.getPointAt(u);
            }
            i++;
        }
        return null;
        // loop where sum != 0, sum > d , sum+1 <d
    }


    // // We cannot use the default THREE.Curve getPoint() with getLength() because in
    // // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
    // // getPoint() depends on getLength
    public getLength() {
        var lens = this.getCurveLengths();
        return lens[lens.length - 1];
    }

    // // Compute lengths and cache them
    // // We cannot overwrite getLengths() because UtoT mapping uses it.
    public getCurveLengths() {
        // We use cache values if curves and cache array are same length
        if (this.cacheLengths && this.cacheLengths.length === this.curves.length) {
            return this.cacheLengths;
        }
        // Get length of sub-curve
        // Push sums into cached array
        var lengths = [], sums = 0;
        for (var i = 0, l = this.curves.length; i < l; i++) {
            sums += this.curves[i].getLength();
            lengths.push(sums);
        }
        this.cacheLengths = lengths;
        return lengths;
    }

    /// Generate geometry from path points (for Line or Points objects)
    public createPointsGeometry(divisions?:number) {
        var pts = this.getPoints(divisions);
        return this.createGeometry(pts);
    }

    // // // Generate geometry from equidistant sampling along the path
    public createSpacedPointsGeometry(divisions) {
        var pts = this.getSpacedPoints(divisions);
        return this.createGeometry(pts);
    }

    public createGeometry(points) {
        var geometry = new THREE.Geometry();
        for (var i = 0, l = points.length; i < l; i++) {
            var point = points[i];
            geometry.vertices.push(new Vector3(point.x, point.y, point.z || 0) as any);
        }
        return geometry;
    }
}
