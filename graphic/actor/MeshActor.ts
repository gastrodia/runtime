import {Ray3} from '../../math/Ray3';
import {Sphere} from '../../math/Sphere';
import {Vector3} from '../../math/Vector3';
import {Actor} from '../core/Actor';
import {Geometry} from '../core/Geometry';
import {Raycaster} from '../core/Raycaster';
import {Material} from '../material/Material';

/**
 * 网格实体。
 */
export class MeshActor extends Actor {
   // 网格
   public geometry: Geometry;
   // 材质
   public material: Material;

   /**
    * 构造处理。
    *
    * @param geometry 几何体
    * @param material 材质
    */
   public constructor(geometry?: Geometry, material?: Material) {
      super();
      // 设置属性
      this.geometry = geometry;
      this.material = material;
   }

   public raycast(raycaster: Raycaster, intersects) {
      var geometry = this.geometry;
      var matrixWorld = this.matrixWorld;
      var ray = raycaster.ray;
      // 检查材质
      var material = this.material;
      if (!material) {
         return
      }
      // 检查球体相交
      if (!geometry.boundingSphere) {
         geometry.computeBoundingSphere();
      }
      var sphere = geometry.boundingSphere.clone();
      sphere.applyMatrix4(matrixWorld);
      if (ray.intersectsSphere(sphere) == false) {
         return
      }
      var intersectionPointWorld = new Vector3();
      // var inverseMatrix = new Matrix4();
      // var ray = new Ray();
      // var vA = new Vector3();
      // var vB = new Vector3();
      // var vC = new Vector3();
      // var tempA = new Vector3();
      // var tempB = new Vector3();
      // var tempC = new Vector3();
      // var uvA = new Vector2();
      // var uvB = new Vector2();
      // var uvC = new Vector2();
      // var barycoord = new Vector3();
      // var intersectionPoint = new Vector3();
      // function uvIntersection(point, p1, p2, p3, uv1, uv2, uv3) {
      //    Triangle.barycoordFromPoint(point, p1, p2, p3, barycoord);
      //    uv1.multiplyScalar(barycoord.x);
      //    uv2.multiplyScalar(barycoord.y);
      //    uv3.multiplyScalar(barycoord.z);
      //    uv1.add(uv2).add(uv3);
      //    return uv1.clone();
      // }
      // var BackSide = 0;
      // var DoubleSide = 1;
      // function checkIntersection(object, raycaster: Raycaster, ray: Ray3, pA, pB, pC, point) {
      //    var intersect;
      //    var material = object.material;
      //    if (material.side === BackSide) {
      //       intersect = ray.intersectTriangle(pC, pB, pA, true, point);
      //    } else {
      //       intersect = ray.intersectTriangle(pA, pB, pC, material.side !== DoubleSide, point);
      //    }
      //    if (intersect == null) {
      //       return null;
      //    }
      //    intersectionPointWorld.assign(point);
      //    intersectionPointWorld.applyMatrix4(object.matrixWorld);
      //    var distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);
      //    if (distance < raycaster.near || distance > raycaster.far) return null;
      //    return {
      //       distance: distance,
      //       point: intersectionPointWorld.clone(),
      //       object: object
      //    };
      // }
      // function checkBufferGeometryIntersection(object, raycaster, ray, positions, uvs, a, b, c) {
      //    vA.fromArray(positions, a * 3);
      //    vB.fromArray(positions, b * 3);
      //    vC.fromArray(positions, c * 3);
      //    var intersection = checkIntersection(object, raycaster, ray, vA, vB, vC, intersectionPoint);
      //    if (intersection) {
      //       if (uvs) {
      //          uvA.fromArray(uvs, a * 2);
      //          uvB.fromArray(uvs, b * 2);
      //          uvC.fromArray(uvs, c * 2);
      //          // intersection.uv = uvIntersection(intersectionPoint, vA, vB, vC, uvA, uvB, uvC);
      //       }
      //       // intersection.face = new Face3(a, b, c, Triangle.normal(vA, vB, vC));
      //       // intersection.faceIndex = a;
      //    }
      //    return intersection;
      // }
      // //
      // // inverseMatrix.getInverse(matrixWorld);
      // ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
      // // Check boundingBox before continuing
      // if (geometry.boundingBox !== null) {
      //    // if (ray.intersectsBox(geometry.boundingBox) === false) return;
      // }
      // var uvs, intersection;
      // if (geometry instanceof BufferGeometry) {
      //    var a, b, c;
      //    var index = geometry.index;
      //    var attributes = geometry.attributes;
      //    var positions = attributes.position.array;
      //    if (attributes.uv !== undefined) {
      //       uvs = attributes.uv.array;
      //    }
      //    if (index !== null) {
      //       var indices = index.array;
      //       for (var i = 0, l = indices.length; i < l; i += 3) {
      //          a = indices[i];
      //          b = indices[i + 1];
      //          c = indices[i + 2];
      //          intersection = checkBufferGeometryIntersection(this, raycaster, ray, positions, uvs, a, b, c);
      //          if (intersection) {
      //             intersection.faceIndex = Math.floor(i / 3); // triangle number in indices buffer semantics
      //             intersects.push(intersection);
      //          }
      //       }
      //    } else {
      //       for (var i = 0, l = positions.length; i < l; i += 9) {
      //          a = i / 3;
      //          b = a + 1;
      //          c = a + 2;
      //          intersection = checkBufferGeometryIntersection(this, raycaster, ray, positions, uvs, a, b, c);
      //          if (intersection) {
      //             intersection.index = a; // triangle number in positions buffer semantics
      //             intersects.push(intersection);
      //          }
      //       }
      //    }
      // } else if (geometry instanceof Geometry) {
      // var fvA, fvB, fvC;
      // var isFaceMaterial = material instanceof MultiMaterial;
      // var isFaceMaterial = false;
      // var materials = isFaceMaterial == true ? material.materials : null;
      var vertices = geometry.vertices;
      var faceIndexs = geometry.faceIndexs;
      // var faceVertexUvs = geometry.faceVertexUvs[0];
      // if (faceVertexUvs.length > 0) uvs = faceVertexUvs;
      var faceIndex = 0;
      var count = faceIndexs.length / 3;
      for (var f = 0; f < count; f++) {
         var fvA = vertices[faceIndexs[faceIndex++]];
         var fvB = vertices[faceIndexs[faceIndex++]];
         var fvC = vertices[faceIndexs[faceIndex++]];
         // var faceMaterial = isFaceMaterial === true ? materials[face.materialIndex] : material;
         // if (faceMaterial === undefined) continue;
         // if (faceMaterial.morphTargets === true) {
         //    var morphTargets = geometry.morphTargets;
         //    var morphInfluences = this.morphTargetInfluences;
         //    vA.set(0, 0, 0);
         //    vB.set(0, 0, 0);
         //    vC.set(0, 0, 0);
         //    for (var t = 0, tl = morphTargets.length; t < tl; t++) {
         //       var influence = morphInfluences[t];
         //       if (influence === 0) continue;
         //       var targets = morphTargets[t].vertices;
         //       vA.addScaledVector(tempA.subVectors(targets[face.a], fvA), influence);
         //       vB.addScaledVector(tempB.subVectors(targets[face.b], fvB), influence);
         //       vC.addScaledVector(tempC.subVectors(targets[face.c], fvC), influence);
         //    }
         //    vA.add(fvA);
         //    vB.add(fvB);
         //    vC.add(fvC);
         //    fvA = vA;
         //    fvB = vB;
         //    fvC = vC;
         // }
         // intersection = checkIntersection(this, raycaster, ray, fvA, fvB, fvC, intersectionPoint);
         // if (intersection) {
         //    if (uvs) {
         //       var uvs_f = uvs[f];
         //       uvA.assign(uvs_f[0]);
         //       uvB.assign(uvs_f[1]);
         //       uvC.assign(uvs_f[2]);
         //       intersection.uv = uvIntersection(intersectionPoint, fvA, fvB, fvC, uvA, uvB, uvC);
         //    }
         //    intersection.face = face;
         //    intersection.faceIndex = f;
         //    intersects.push(intersection);
         // }
      }
      // }
   }
}
