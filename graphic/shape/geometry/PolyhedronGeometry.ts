import {Sphere} from '../../../math/Sphere';
import {Vector2} from '../../../math/Vector2';
import {Vector3} from '../../../math/Vector3';
import {Face3} from '../../core/Face3';
import {Geometry} from '../../core/Geometry';

export class PolyhedronGeometry extends Geometry {
   public constructor(vertices, indices, radius, detail) {
      super();
      // this.parameters = {
      //    vertices: vertices,
      //    indices: indices,
      //    radius: radius,
      //    detail: detail
      // };
      // radius = radius || 1;
      // detail = detail || 0;
      // for (var i = 0, l: any = vertices.length; i < l; i += 3) {
      //    this.prepare(new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]));
      // }
      // var p = this.vertices;
      // var faces = [];
      // for (var i = 0, j = 0, l = indices.length; i < l; i += 3, j++) {
      //    var v1 = p[indices[i]];
      //    var v2 = p[indices[i + 1]];
      //    var v3 = p[indices[i + 2]];
      //    faces[j] = new Face3(v1.index, v2.index, v3.index, [v1.clone(), v2.clone(), v3.clone()], undefined, j);
      // }
      // var centroid = new Vector3();
      // for (var i = 0, l: any = faces.length; i < l; i++) {
      //    this.subdivide(faces[i], detail);
      // }
      // // Handle case when face straddles the seam
      // for (var i = 0, l = this.faceVertexUvs[0].length; i < l; i++) {
      //    var uvs = this.faceVertexUvs[0][i];
      //    var x0 = uvs[0].x;
      //    var x1 = uvs[1].x;
      //    var x2 = uvs[2].x;
      //    var max = Math.max(x0, x1, x2);
      //    var min = Math.min(x0, x1, x2);
      //    if (max > 0.9 && min < 0.1) {
      //       // 0.9 is somewhat arbitrary
      //       if (x0 < 0.2) uvs[0].x += 1;
      //       if (x1 < 0.2) uvs[1].x += 1;
      //       if (x2 < 0.2) uvs[2].x += 1;
      //    }
      // }
      // // Apply radius
      // for (var i = 0, l: any = this.vertices.length; i < l; i++) {
      //    this.vertices[i].multiplyScalar(radius);
      // }
      // // Merge vertices
      // this.mergeVertices();
      // this.computeFaceNormals();
      // this.boundingSphere = new Sphere(new Vector3(), radius);
   }
   // Project vector onto sphere's surface
   public prepare(vector) {
      // var vertex = vector.normalize().clone();
      // vertex.index = that.vertices.push(vertex) - 1;
      // // Texture coords are equivalent to map coords, calculate angle and convert to fraction of a circle.
      // var u = this.azimuth(vector) / 2 / Math.PI + 0.5;
      // var v = this.inclination(vector) / Math.PI + 0.5;
      // vertex.uv = new Vector2(u, 1 - v);
      // return vertex;
   }
   // Approximate a curved face with recursively sub-divided triangles.
   public make(v1, v2, v3, materialIndex) {
      // var that = this;
      // var face = new Face3(v1.index, v2.index, v3.index, [v1.clone(), v2.clone(), v3.clone()], undefined, materialIndex);
      // that.faces.push(face);
      // centroid.assign(v1).add(v2).add(v3).divideScalar(3);
      // var azi = this.azimuth(centroid);
      // that.faceVertexUvs[0].push([
      //    this.correctUV(v1.uv, v1, azi),
      //    this.correctUV(v2.uv, v2, azi),
      //    this.correctUV(v3.uv, v3, azi)
      // ]);
   }
   // Analytically subdivide a face to the required detail level.
   public subdivide(face, detail) {
      var that = this;
      var cols = Math.pow(2, detail);
      var a = this.prepare(that.vertices[face.a]);
      var b = this.prepare(that.vertices[face.b]);
      var c = this.prepare(that.vertices[face.c]);
      var v = [];
      var materialIndex = face.materialIndex;
      // Construct all of the vertices for this subdivision.
      // for (var i = 0; i <= cols; i++) {
      //    v[i] = [];
      //    var aj = this.prepare(a.clone().lerp(c, i / cols));
      //    var bj = this.prepare(b.clone().lerp(c, i / cols));
      //    var rows = cols - i;
      //    for (var j = 0; j <= rows; j++) {
      //       if (j === 0 && i === cols) {
      //          v[i][j] = aj;
      //       } else {
      //          v[i][j] = this.prepare(aj.clone().lerp(bj, j / rows));
      //       }
      //    }
      // }
      // Construct all of the faces.
      for (var i = 0; i < cols; i++) {
         for (var j = 0; j < 2 * (cols - i) - 1; j++) {
            var k = Math.floor(j / 2);
            if (j % 2 === 0) {
               this.make(
                  v[i][k + 1],
                  v[i + 1][k],
                  v[i][k],
                  materialIndex
               );
            } else {
               this.make(
                  v[i][k + 1],
                  v[i + 1][k + 1],
                  v[i + 1][k],
                  materialIndex
               );
            }
         }
      }
   }
   // Angle around the Y axis, counter-clockwise when looking from above.
   public azimuth(vector) {
      return Math.atan2(vector.z, - vector.x);
   }
   // Angle above the XZ plane.
   public inclination(vector) {
      return Math.atan2(- vector.y, Math.sqrt((vector.x * vector.x) + (vector.z * vector.z)));
   }
   // Texture fixing helper. Spheres have some odd behaviours.
   public correctUV(uv, vector, azimuth) {
      if ((azimuth < 0) && (uv.x === 1)) uv = new Vector2(uv.x - 1, uv.y);
      if ((vector.x === 0) && (vector.z === 0)) uv = new Vector2(azimuth / 2 / Math.PI + 0.5, uv.y);
      return uv.clone();
   }
}
