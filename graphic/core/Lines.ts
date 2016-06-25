import {AssertUtil} from '../../common/AssertUtil';
import {MemoryUtil} from '../../common/MemoryUtil';
import {Fatal} from '../../common/lang/Fatal';
import {Node} from '../../framework/brep/Node';
import {Box3} from '../../math/Box3';
import {MathUtil} from '../../math/MathUtil';
import {Matrix4} from '../../math/Matrix4';
import {Sphere} from '../../math/Sphere';
import {Vector2} from '../../math/Vector2';
import {Vector3} from '../../math/Vector3';
import {Face} from './Face';
import {Vertex} from './Vertex';

/**
 * 几何体。
 *
 * @author maocy
 * @history 160422
 */
export class Lines extends Node {
   // 编号计数器
   public static IdCounter: number = 0;
   // 编号
   public id: number;
   // 唯一编码
   public guid: string;
   // 名称
   public name: string;
   // 矩阵
   public matrix: Matrix4;
   // 边界盒子
   public boundingBox: Box3;
   // 边界球体
   public boundingSphere: Sphere;
   // 需要更新
   public needUpdate: boolean;
   // 坐标集合
   protected _positions: Array<Vector3>;
   // 颜色集合
   protected _colors: Array<number>;
   // 脏标志
   protected _dirty: boolean;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.id = ++Lines.IdCounter;
      this.guid = MathUtil.makeUuid();
      this.matrix = new Matrix4();
      this._dirty = true;
   }

   /**
    * 获得坐标集合。
    *
    * @return 坐标集合
    */
   public get positions(): Array<Vector3> {
      var positions = this._positions;
      if (!positions) {
         positions = this._positions = new Array<Vector3>();
      }
      return positions;
   }

   /**
    * 获得是否含有颜色数据。
    *
    * @return 是否含有
    */
   public hasColor(): boolean {
      var colors = this._colors;
      return colors ? colors.length > 0 : false;
   }

   /**
    * 获得颜色集合。
    *
    * @return 颜色集合
    */
   public get colors(): Array<number> {
      var colors = this._colors;
      if (!colors) {
         colors = this._colors = new Array<number>();
      }
      return colors;
   }

   /**
    * 测试脏状态。
    *
    * @return 脏状态
    */
   public testDirty(): boolean {
      return this._dirty;
   }

   /**
    * 计算包围盒。
    */
   public computeBoundingBox(): Box3 {
      var box = this.boundingBox;
      // 创建盒子
      if (!box) {
         box = this.boundingBox = new Box3();
      }
      // 计算大小
      box.reset();
      var positions = this._positions;
      if (positions) {
         var count = positions.length;
         for (var i = 0; i < count; i++) {
            var position = positions[i];
            box.expandByPoint(position);
         }
      }
      return box;
   }


   /**
    * 计算包围球。
    */
   public computeBoundingSphere(): Sphere {
      var sphere = this.boundingSphere;
      if (!sphere) {
         sphere = this.boundingSphere = new Sphere();
      }
      // 计算中心点
      var center = sphere.center;
      var box = this.computeBoundingBox();
      box.center(center);
      var positions = this._positions;
      if (positions) {
         var maxRadiusSq = 0;
         var count = positions.length;
         for (var i = 0; i < count; i++) {
            var position = positions[i];
            var distanceSquared = center.distanceToSquared(position);
            maxRadiusSq = Math.max(maxRadiusSq, distanceSquared);
         }
         sphere.radius = Math.sqrt(maxRadiusSq);
      }
      return sphere;
   }

   /**
    * 更新数据。
    *
    * @param precision 有效位数
    */
   public updateData(precision: number = 6) {
      // // 清空顶点
      // var vertices = this.vertices;
      // vertices.length = 0;
      // var faceIndexs = this.faceIndexs;
      // faceIndexs.length = 0;
      // // 获得数据
      // var positions = this._positions;
      // var positionCount = positions ? positions.length : 0;
      // var colors = this._colors;
      // var colorCount = colors ? colors.length : 0;
      // var normals = this._normals;
      // var normalCount = normals ? normals.length : 0;
      // var coords = this._coords;
      // var coordsCount = coords ? coords.length : 0;
      // var matrix = this.matrix;
      // // 获得唯一点处理
      // var uniqueVertexs = new Array<number>();
      // var uniqueFaces = new Array<number>();
      // // 更新顶点
      // var faceData = new Array<number>();
      // var faces = this._faces;
      // var faceCount = faces.length;
      // for (var faceIndex = 0; faceIndex < faceCount; faceIndex++) {
      //    var face = faces[faceIndex];
      //    // 获得面集合
      //    var indexs = face.indexs;
      //    var count = indexs.length;
      //    if (count > 2 && !face.direction) {
      //       // 计算面法线
      //       var position1 = positions[indexs[0]];
      //       var position2 = positions[indexs[1]];
      //       var position3 = positions[indexs[2]];
      //       var direction1 = Vector3.direction(position1, position2);
      //       var direction2 = Vector3.direction(position1, position3);
      //       face.direction = Vector3.crossVectors(direction1, direction2);
      //    }
      //    for (var i = 0; i < count; i++) {
      //       var index = indexs[i];
      //       // 获得参数
      //       var position = matrix.transform(positions[index]);
      //       var color = face.color;
      //       if (colorCount) {
      //          color = colors[index];
      //       }
      //       var normal = null;
      //       if (normalCount) {
      //          normal = matrix.transform(normals[index]);
      //       } else {
      //          normal = face.direction;
      //       }
      //       var coord1 = null;
      //       if (coordsCount > 0) {
      //          coord1 = coords[0][index];
      //       }
      //       var coord2 = null;
      //       if (coordsCount > 1) {
      //          coord2 = coords[1][index];
      //       }
      //       // 获得顶点
      //       var vertex = _syncUniqueVertex(vertices, uniqueVertexs, precision, position, color, normal, coord1, coord2);
      //       // 增加索引
      //       faceData[i] = vertex.index;
      //    }
      //    // 增加面
      //    if (count == 3) {
      //       // 增加三角面
      //       var index1 = faceData[0];
      //       var index2 = faceData[1];
      //       var index3 = faceData[2];
      //       if (!_constainsUniqueFace3(uniqueFaces, index1, index2, index3)) {
      //          faceIndexs.push(index1, index2, index3);
      //          uniqueFaces[index1 + '|' + index2 + '|' + index3] = true;
      //       }
      //    } else if (count == 4) {
      //       // 增加三角面
      //       var index1 = faceData[0];
      //       var index2 = faceData[1];
      //       var index3 = faceData[2];
      //       var index4 = faceData[3];
      //       if (!_constainsUniqueFace4(uniqueFaces, index1, index2, index3, index4)) {
      //          faceIndexs.push(index1, index2, index3);
      //          faceIndexs.push(index1, index3, index4);
      //          uniqueFaces[index1 + '|' + index2 + '|' + index3 + '|' + index4] = true;
      //       }
      //    } else {
      //       throw new Fatal(this, 'Invalid face count.');
      //    }
      // }
   }

   /**
    * 更新处理。
    */
   public update(flag?: boolean) {
      // if (flag || this._dirty) {
      //    var vertices = this.vertices;
      //    if (vertices) {
      //       var count = vertices.length;
      //       for (var i = 0; i < count; i++) {
      //          var vertex = vertices[i];
      //          MemoryUtil.free(vertex);
      //       }
      //    }
      //    this.updateData();
      //    this.needUpdate = true;
      //    this._dirty = false;
      // }
   }

   /**
    * 获得纹理。
    */
   public merge(geometry: Lines, faceOffset: number = 0, faceCount: number = -1) {
      // // 获得几何信息
      // AssertUtil.debugNotNull(geometry);
      // var geometryPositions = geometry.positions;
      // var hasColor = geometry.hasColor();
      // var geometryColors = null;
      // if (hasColor) {
      //    geometryColors = geometry.colors;
      // }
      // var hasNormal = geometry.hasNormal();
      // var geometryNormals = null;
      // if (hasNormal) {
      //    geometryNormals = geometry.normals;
      // }
      // var geometryLayerCount = geometry.coordsCount;
      // var geometryCoordLayers = null;
      // if (geometryLayerCount) {
      //    geometryCoordLayers = geometry.coords;
      // }
      // var geometryFaces = geometry.faces;
      // if (faceCount == -1) {
      //    faceCount = geometryFaces.length;
      // }
      // AssertUtil.debugTrue(faceOffset + faceCount <= geometryFaces.length);
      // // 获得面数据
      // var positions = this.positions;
      // var positionOffset = positions.length;
      // var colors = this.colors;
      // var normals = this.normals;
      // var colorOffset = colors.length;
      // // 复制面集合
      // var faceLoop = faceOffset + faceCount;
      // for (var faceIndex = faceOffset; faceIndex < faceLoop; faceIndex++) {
      //    var face = geometryFaces[faceIndex];
      //    // 复制面
      //    var newFace = new (face as any).constructor() as Face;
      //    var faceIndexs = face.indexs;
      //    var faceIndexCount = faceIndexs.length;
      //    for (var i = 0; i < faceIndexCount; i++) {
      //       var index = faceIndexs[i];
      //       // 复制坐标
      //       var geometryPosition = geometryPositions[index];
      //       positions.push(geometryPosition.clone());
      //       // 赋值颜色
      //       if (hasColor) {
      //          var geometryColor = geometryColors[index];
      //          colors.push(geometryColor);
      //       }
      //       // 复制法线
      //       if (hasNormal) {
      //          var geometryNormal = geometryNormals[index];
      //          normals.push(geometryNormal.clone());
      //       }
      //       // 复制纹理
      //       for (var layerIndex = 0; layerIndex < geometryLayerCount; layerIndex++) {
      //          var geometryCoords = geometryCoordLayers[layerIndex];
      //          var geometryCoord = geometryCoords[index];
      //          var coords = this.syncCoord(layerIndex);
      //          coords.push(geometryCoord.clone());
      //       }
      //       // 设置面数据
      //       newFace.color = face.color;
      //       newFace.indexs[i] = positionOffset++;
      //    }
      //    this.pushFace(newFace);
      // }
   }

   /**
    * 脏处理。
    */
   public dirty() {
      this._dirty = true;
   }

   /**
    * 重置处理。
    */
   public reset() {
      this.positions.length = 0;
   }
}

/**
 * 查找唯一顶点。
 *
 * @param vertices 顶点集合
 * @param uniqueVertexs 唯一点编号
 * @param precision 有效位数
 * @param position 坐标
 * @param color 颜色
 * @param normal 有效位数
 * @param coord1 纹理坐标1
 * @param coord2 纹理坐标2
 * @return 唯一点
 */
function _syncUniqueVertex(vertices: Array<Vertex>, uniqueVertexs: Array<number>, precision: number, position: Vector3, color: number, normal: Vector3, coord1: Vector2, coord2: Vector2): Vertex {
   var vertex: Vertex = null;
   var identity = position.format(precision) + '|' + color;
   if (normal) {
      identity += '|' + normal.format(precision);
   }
   if (coord1) {
      identity += '|' + coord1.format(precision);
   }
   if (coord2) {
      identity += '|' + coord2.format(precision);
   }
   var index = uniqueVertexs[identity];
   if (index == null) {
      vertex = MemoryUtil.alloc(Vertex);
      vertex.index = uniqueVertexs[identity] = vertices.length;
      vertex.position = position;
      vertex.color = color;
      vertex.normal = normal;
      vertex.coord1 = coord1;
      vertex.coord2 = coord2;
      vertices.push(vertex);
   } else {
      vertex = vertices[index];
   }
   return vertex;
}

/**
 * 判断是否含有3角面。
 *
 * @param uniqueFaces 唯一面集合
 * @param index1 索引1
 * @param index2 索引2
 * @param index3 索引3
 * @return 是否含有唯一面
 */
function _constainsUniqueFace3(uniqueFaces, index1: number, index2: number, index3: number): boolean {
   if (uniqueFaces[index1 + '|' + index2 + '|' + index3]) {
      return true;
   }
   if (uniqueFaces[index2 + '|' + index3 + '|' + index1]) {
      return true;
   }
   if (uniqueFaces[index3 + '|' + index1 + '|' + index2]) {
      return true;
   }
   return false;
}

/**
 * 判断是否含有4角面。
 *
 * @param uniqueFaces 唯一面集合
 * @param index1 索引1
 * @param index2 索引2
 * @param index3 索引3
 * @param index4 索引4
 * @return 是否含有唯一面
 */
function _constainsUniqueFace4(uniqueFaces, index1: number, index2: number, index3: number, index4: number): boolean {
   if (uniqueFaces[index1 + '|' + index2 + '|' + index3 + '|' + index4]) {
      return true;
   }
   if (uniqueFaces[index2 + '|' + index3 + '|' + index4 + '|' + index1]) {
      return true;
   }
   if (uniqueFaces[index3 + '|' + index4 + '|' + index1 + '|' + index2]) {
      return true;
   }
   if (uniqueFaces[index4 + '|' + index1 + '|' + index2 + '|' + index3]) {
      return true;
   }
   return false;
}
