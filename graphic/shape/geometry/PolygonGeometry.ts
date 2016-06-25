import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {Fatal} from '../../../../runtime/common/lang/Fatal';
import {Types} from '../../../../runtime/common/lang/Types';
import {Math2dUtil} from '../../../math/Math2dUtil';
import {Vector2} from '../../../math/Vector2';
import {Vector3} from '../../../math/Vector3';
import {Face3} from '../../core/Face3';
import {Face4} from '../../core/Face4';
import {Geometry} from '../../core/Geometry';
import {PlaneEnum} from '../PlaneEnum';
import {ShapeUtils} from '../ShapeUtils';
import {Polygon} from '../brep/Polygon';

/**
 * 多边形配置信息。
 */
export class PolygonGeometryOptions {
   // 高度
   public height: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.height = 0;
   }
}

/**
 * 多边形配置信息。
 */
export class PolygonGeometryBorder {
   // 高度
   public step: number;
   public lightColor: number;
   public darkColor: number;
   public flipX: boolean;
   public flipY: boolean;
   public coordX: number;
   public coordY: number;
   public coordWidth: number;
   public coordHeight: number;
   public coordRotation: number;
   public clockWise: boolean;
   public height: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this.step = 10;
      this.lightColor = 0xFFFFFFFF;
      this.darkColor = 0xFFCCCCCC;
      this.flipX = false;
      this.flipY = false;
      this.coordX = 0;
      this.coordY = 0;
      this.coordWidth = 500;
      this.coordHeight = 500;
      this.coordRotation = 0;
      this.height = 1;
   }
}

/**
 * 多边形几何体。
 *
 * @author maocy
 * @history 160507
 */
export class PolygonGeometry extends Geometry {
   // 配置信息
   public options: PolygonGeometryOptions;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置参数
      this.options = new PolygonGeometryOptions();
   }

   /**
    * 获得平面点。
    */
   public getPlanePoint(point: Vector2, planeCd: PlaneEnum): Vector3 {
      switch (planeCd) {
         case PlaneEnum.XY:
            return new Vector3(point.x, point.y, 0);
         case PlaneEnum.XZ:
            return new Vector3(point.x, 0, point.y);
         case PlaneEnum.YZ:
            return new Vector3(0, point.x, point.y);
         default:
            throw new Fatal(this, 'Unknown plane type.');
      }
   }

   public getCoord(options: PolygonGeometryBorder, point: Vector2) {
      var coordX = options.coordX;
      var coordY = options.coordY;
      var coordWidth = options.coordWidth;
      var coordHeight = options.coordHeight;
      var rotation = options.coordRotation;
      var cx = point.x / coordWidth;
      var cy = point.y / coordHeight;
      if (options.flipX) {
         cx = -cx;
      }
      if (options.flipY) {
         cy = -cy;
      }
      return Vector2.rotateAroundPoint(new Vector2(cx, cy), new Vector2(coordX, coordY), rotation);
   }

   /**
    * 从多边形中设置数据。
    *
    * @param polygon 多边形
    * @param planeCd 平面
    * @param height 高度
    */
   public setFromPolygonBorder(polygon: Polygon, options: PolygonGeometryBorder) {
      this.reset();
      var positions = this.positions;
      var colors = this.colors;
      var normals = this.normals;
      var coords = this.syncCoord();
      var step = options.step;
      var lightColor = options.lightColor;
      var darkColor = options.darkColor;
      var coordWidth = options.coordWidth;
      var coordHeight = options.coordHeight;
      var clockWise = options.clockWise;
      // 获得三角化数据
      var positionsData = new Types<Vector2>();
      positionsData.append(polygon.positions);
      var reverse = !ShapeUtils.isClockWise(positionsData);
      if (reverse) {
         positionsData.reverse();
      }
      var facesData = ShapeUtils.triangulate(positionsData, true);
      AssertUtil.debugNotNull(facesData);
      // 建立扩展边信息
      var lines = new Types<Vector2>();
      var positionCount = positionsData.length;
      var rotation = -Math.PI / 2;
      for (var i = 0; i < positionCount; i++) {
         var point1 = positionsData.get(i);
         var point2 = positionsData.get(i + 1);
         // 计算方向
         var direction = Vector2.direction(point1, point2);
         direction.multiplyScalar(step);
         lines.push(Vector2.rotateAroundPoint(direction.clone().add(point1), point1, rotation));
         lines.push(Vector2.rotateAroundPoint(direction.clone().add(point2), point2, rotation));
      }
      // 建立顶点信息
      var positionCount = positionsData.length;
      for (var i = 0; i < positionCount; i++) {
         var index = i * 2;
         var point = positionsData[i];
         // 获得前一个线段
         var line1Point1 = lines.get(index - 2);
         var line1Point2 = lines.get(index - 1);
         // 获得下一个线段
         var line2Point1 = lines.get(index);
         var line2Point2 = lines.get(index + 1);
         // 计算交点
         var intersection = Math2dUtil.lineLineIntersection(line1Point1, line1Point2, line2Point1, line2Point2);
         // 设置外点数据
         positions.push(new Vector3(point.x, point.y, 0));
         colors.push(darkColor);
         normals.push(new Vector3(0, 1, 0));
         coords.push(this.getCoord(options, point));
         // 设置内点数据
         var intersectionPoint = intersection ? intersection : line2Point2;
         positions.push(new Vector3(intersectionPoint.x, intersectionPoint.y, 0));
         colors.push(lightColor);
         normals.push(new Vector3(0, 1, 0));
         coords.push(this.getCoord(options, intersectionPoint));
      }
      // 建立外面数据
      var faces = this.faces;
      var count = positionCount * 2;
      for (var i = 0; i < positionCount; i++) {
         var index1 = i * 2;
         var index2 = i * 2 + 1;
         if (clockWise) {
            faces.push(new Face4(index2, (index2 + 2) % count, (index1 + 2) % count, index1));
         } else {
            faces.push(new Face4(index1, (index1 + 2) % count, (index2 + 2) % count, index2));
         }
      }
      // 建立内面数据
      var faceCount = facesData.length;
      for (var i = 0; i < faceCount; i++) {
         var faceData = facesData[i];
         var a = faceData[0] * 2 + 1;
         var b = faceData[1] * 2 + 1;
         var c = faceData[2] * 2 + 1;
         if (clockWise) {
            faces.push(new Face3(a, b, c));
         } else {
            faces.push(new Face3(c, b, a));
         }
      }
      // 更新数据
      this.update(true);
   }

   /**
    * 从多边形中设置数据。
    *
    * @param polygon 多边形
    * @param planeCd 平面
    * @param height 高度
    */
   public setFromPolygon(polygon: Polygon, planeCd: PlaneEnum = PlaneEnum.XY, clockWise?) {
      // 获得三角化数据
      var positionsData = polygon.positions;
      var facesData = ShapeUtils.triangulate(positionsData, true);
      AssertUtil.debugNotNull(facesData);
      // 建立顶点
      var positions = this.positions;
      var count = positionsData.length;
      for (var i = 0; i < count; i++) {
         var positionData = positionsData[i];
         var position = this.getPlanePoint(positionData, planeCd);
         positions.push(position);
      }
      // 建立面数据
      var faces = this.faces;
      var count = facesData.length;
      for (var i = 0; i < count; i++) {
         var faceData = facesData[i];
         if (clockWise) {
            faces.push(new Face3(faceData[0], faceData[1], faceData[2]));
         } else {
            faces.push(new Face3(faceData[2], faceData[1], faceData[0]));
         }
      }
      // 更新数据
      this.update(true);
   }

   public getExtrudeCoord(options: PolygonGeometryBorder, width: number, height: number) {
      var coordX = options.coordX;
      var coordY = options.coordY;
      var coordWidth = options.coordWidth;
      var coordHeight = options.coordHeight;
      var rotation = options.coordRotation;
      var cx = width / coordWidth;
      var cy = height / coordHeight;
      if (options.flipX) {
         cx = -cx;
      }
      if (options.flipY) {
         cy = -cy;
      }
      return Vector2.rotateAroundPoint(new Vector2(cx, cy), new Vector2(coordX, coordY), rotation);
   }

   /**
    * 从多边形中设置数据。
    *
    * @param polygon 多边形
    * @param planeCd 平面
    * @param height 高度
    */
   public extrudePolygon(polygon: Polygon, options: PolygonGeometryBorder) {
      this.reset();
      var positions = this.positions;
      var colors = this.colors;
      var normals = this.normals;
      var coords = this.syncCoord();
      var step = options.step;
      var lightColor = options.lightColor;
      var darkColor = options.darkColor;
      var coordWidth = options.coordWidth;
      var coordHeight = options.coordHeight;
      var clockWise = options.clockWise;
      var height = options.height;
      // 获得数据点
      var polygonPositions = polygon.positions;
      var pointCount = polygonPositions.length;
      var reverse = !ShapeUtils.isClockWise(polygonPositions);
      if (reverse) {
         polygonPositions.reverse();
      }
      // 建立顶点信息
      var length = 0;
      for (var i = 0; i < pointCount; i++) {
         var point = polygonPositions[i];
         // 计算长度
         if (i > 0) {
            length += Vector2.distance(polygonPositions[i - 1], point);
         }
         // 增加上顶点信息
         positions.push(new Vector3(point.x, point.y, 0));
         colors.push(0xFFFFFFFF);
         normals.push(new Vector3(0, 1, 0));
         coords.push(this.getExtrudeCoord(options, length, 0));
         // 增加下顶点信息
         var point = polygonPositions[i];
         positions.push(new Vector3(point.x, point.y, height));
         colors.push(0xFFFFFFFF);
         normals.push(new Vector3(0, 1, 0));
         coords.push(this.getExtrudeCoord(options, length, height));
      }
      // 建立面数据
      var faces = this.faces;
      var count = pointCount * 2;
      for (var i = 0; i < pointCount; i++) {
         var index1 = i * 2;
         var index2 = i * 2 + 1;
         if (clockWise) {
            faces.push(new Face4(index2, (index2 + 2) % count, (index1 + 2) % count, index1));
         } else {
            faces.push(new Face4(index1, (index1 + 2) % count, (index2 + 2) % count, index2));
         }
      }
      // 更新数据
      this.update(true);
   }
}
