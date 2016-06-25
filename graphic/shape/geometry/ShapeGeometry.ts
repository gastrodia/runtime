import {Face3} from '../../../../runtime/graphic/core/Face3';
import {Vector3} from '../../../../runtime/math/Vector3';
import {Geometry} from '../../core/Geometry';
import {ShapeUtils} from '../ShapeUtils';
import {Shape} from '../brep/Shape';
import {ExtrudeGeometry} from './ExtrudeGeometry';

/**
 * 形状几何体配置信息。
 */
export class ShapeGeometryOptions {
    // 尺寸
    public size: number;

    /**
     * 构造处理。
     */
    public constructor(size: number = 10) {
        this.size = size;
    }
}

/**
 * 形状几何体。
 */
export class ShapeGeometry extends Geometry {
    // 配置信息
    public options: ShapeGeometryOptions;

    /**
     * 构造处理。
     */
    public constructor(shapes, options?: any) {
        super();
        // 设置属性
        if (Array.isArray(shapes)) {
            this.addShapeList(shapes, options);
        } else {
            this.addShape(shapes);
        }
        this.update(true);
        this.computeFaceNormals();
    }

    /**
     * 增加一个形状。
     *
     * @param shape 形状
     */
    public addShape(shape: Shape, options?) {
        if (options === undefined) {
            options = {};
        }
        var curveSegments = options.curveSegments !== undefined ? options.curveSegments : 12;
        var material = options.material;
        var uvgen = options.UVGenerator === undefined ? ExtrudeGeometry.WorldUVGenerator : options.UVGenerator;
        // 获得形状信息
        var points = shape.getPoints(curveSegments);
        var holes = shape.getPoints(curveSegments);
        // 调整点顺序为顺时针
        var reverse = !ShapeUtils.isClockWise(points);
        if (reverse) {
            points.reverse();
            // 调整洞点顺序为逆时针
            var holeCount = holes.length;
            for (var i = 0; i < holeCount; i++) {
                var hole = holes[i];
                if (ShapeUtils.isClockWise(hole)) {
                    hole.reverse();
                }
            }
        }
        // 三角形化处理
        var faceIndices = ShapeUtils.triangulateShape(points, holes);
        // 追加所有洞的顶点
        var holeCount = holes.length;
        for (var i = 0; i < holeCount; i++) {
            var hole = holes[i];
            points = points.concat(hole);
        }
        // 更新点数据
        var positions = this.positions;
        var offset = positions.length;
        var count = points.length;
        for (var i = 0; i < count; i++) {
            var point = points[i];
            positions.push(new Vector3(point.x, point.y, 0));
        }
        var count = faceIndices.length;
        for (var i = 0; i < count; i++) {
            var face = faceIndices[i];
            var a = face[0] + offset;
            var b = face[1] + offset;
            var c = face[2] + offset;
            this.faces.push(new Face3(a, b, c));
            // this.faceVertexUvs[0].push(uvgen.generateTopUV(this, a, b, c));
        }
    }

    /**
     * 增加一个形状集合。
     */
    public addShapeList(shapes: Array<Shape>, options?: any) {
        var count = shapes.length;
        for (var i = 0; i < count; i++) {
            this.addShape(shapes[i], options);
        }
    }
}
