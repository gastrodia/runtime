import {LoggerUtil} from '../../../runtime/common/lang/LoggerUtil';
import {MathUtil} from '../../math/MathUtil';
import {Vector2} from '../../math/Vector2';

/**
 * 形状工具类。
 */
export class ShapeUtils {

   /**
    * 判断顶点是否顺时针顺序。
    *
    * @param points 顶点集合
    * @return 是否顺时针
    */
   public static isClockWise(points: Array<Vector2>): boolean {
      var area = ShapeUtils.area(points);
      return area < 0;
   }

   /**
    * 计算区域面积。
    *
    * @param points 顶点集合
    * @return 区域
    */
   public static area(points: Array<Vector2>): number {
      var total = 0;
      var count = points.length;
      for (var p = count - 1, q = 0; q < count; p = q++) {
         var point1 = points[p];
         var point2 = points[q];
         total += point1.x * point2.y - point2.x * point1.y;
      }
      return total * 0.5;
   }

   public static b2 = (function () {
      function b2p0(t, p) {
         var k = 1 - t;
         return k * k * p;
      }
      function b2p1(t, p) {
         return 2 * (1 - t) * t * p;
      }
      function b2p2(t, p) {
         return t * t * p;
      }
      return function (t, p0, p1, p2) {
         return b2p0(t, p0) + b2p1(t, p1) + b2p2(t, p2);
      };
   })();

   public static b3 = (function () {
      function b3p0(t, p) {
         var k = 1 - t;
         return k * k * k * p;
      }
      function b3p1(t, p) {
         var k = 1 - t;
         return 3 * k * k * t * p;
      }
      function b3p2(t, p) {
         var k = 1 - t;
         return 3 * k * t * t * p;
      }
      function b3p3(t, p) {
         return t * t * t * p;
      }
      return function (t, p0, p1, p2, p3) {
         return b3p0(t, p0) + b3p1(t, p1) + b3p2(t, p2) + b3p3(t, p3);
      };
   })();

   protected static triangulateSnip(points: Array<Vector2>, u, v, w, n, verts) {
      var ax = points[verts[u]].x;
      var ay = points[verts[u]].y;
      var bx = points[verts[v]].x;
      var by = points[verts[v]].y;
      var cx = points[verts[w]].x;
      var cy = points[verts[w]].y;
      if (MathUtil.EPSILON > (((bx - ax) * (cy - ay)) - ((by - ay) * (cx - ax)))) {
         return false;
      }
      var aX = cx - bx;
      var aY = cy - by;
      var bX = ax - cx;
      var bY = ay - cy;
      var cX = bx - ax;
      var cY = by - ay;
      for (var p = 0; p < n; p++) {
         var px = points[verts[p]].x;
         var py = points[verts[p]].y;
         if (((px === ax) && (py === ay)) || ((px === bx) && (py === by)) || ((px === cx) && (py === cy))) {
            continue;
         }
         var apx = px - ax;
         var apy = py - ay;
         var bpx = px - bx;
         var bpy = py - by;
         var cpx = px - cx;
         var cpy = py - cy;
         var aCROSSbp = aX * bpy - aY * bpx;
         var cCROSSap = cX * apy - cY * apx;
         var bCROSScp = bX * cpy - bY * cpx;
         if ((aCROSSbp >= - MathUtil.EPSILON) && (bCROSScp >= - MathUtil.EPSILON) && (cCROSSap >= - MathUtil.EPSILON)) return false;
      }
      return true;
   }

   /**
    * 顶点数据三角形化。
    *
    * @param points 顶点集合
    * @param indices 是否返回索引数据
    * @return 结果
    */
   public static triangulate(points: Array<Vector2>, indices?: boolean) {
      var n = points.length;
      if (n < 3) {
         return null;
      }
      var result = [];
      var verts = [];
      var vertIndices = [];
      var area = this.area(points);
      if (area > 0) {
         for (var i = 0; i < n; i++) {
            verts[i] = i;
         }
      } else {
         for (var i = 0; i < n; i++) {
            verts[i] = (n - 1) - i;
         }
      }
      var nv = n;
      var count = 2 * nv;
      var u, v, w;
      for (v = nv - 1; nv > 2;) {
         if ((count--) <= 0) {
            LoggerUtil.warn(this, 'Unable to triangulate polygon in triangulate.');
            if (indices) {
               return vertIndices;
            }
            return result;
         }
         u = v;
         if (nv <= u) {
            u = 0;
         }
         v = u + 1;
         if (nv <= v) {
            v = 0;
         }
         w = v + 1;
         if (nv <= w) {
            w = 0;
         }
         if (this.triangulateSnip(points, u, v, w, nv, verts)) {
            var a = verts[u];
            var b = verts[v];
            var c = verts[w];
            result.push([points[a], points[b], points[c]]);
            vertIndices.push([verts[u], verts[v], verts[w]]);
            for (var s = v, t = v + 1; t < nv; s++ , t++) {
               verts[s] = verts[t];
            }
            nv--;
            count = 2 * nv;
         }
      }
      if (indices) {
         return vertIndices;
      }
      return result;
   }

   public static triangulateShape(contour, holes) {
      function point_in_segment_2D_colin(inSegPt1, inSegPt2, inOtherPt) {
         // inOtherPt needs to be collinear to the inSegment
         if (inSegPt1.x !== inSegPt2.x) {
            if (inSegPt1.x < inSegPt2.x) {
               return ((inSegPt1.x <= inOtherPt.x) && (inOtherPt.x <= inSegPt2.x));
            } else {
               return ((inSegPt2.x <= inOtherPt.x) && (inOtherPt.x <= inSegPt1.x));
            }
         } else {
            if (inSegPt1.y < inSegPt2.y) {
               return ((inSegPt1.y <= inOtherPt.y) && (inOtherPt.y <= inSegPt2.y));
            } else {
               return ((inSegPt2.y <= inOtherPt.y) && (inOtherPt.y <= inSegPt1.y));
            }
         }
      }
      function intersect_segments_2D(inSeg1Pt1, inSeg1Pt2, inSeg2Pt1, inSeg2Pt2, inExcludeAdjacentSegs) {
         var seg1dx = inSeg1Pt2.x - inSeg1Pt1.x, seg1dy = inSeg1Pt2.y - inSeg1Pt1.y;
         var seg2dx = inSeg2Pt2.x - inSeg2Pt1.x, seg2dy = inSeg2Pt2.y - inSeg2Pt1.y;
         var seg1seg2dx = inSeg1Pt1.x - inSeg2Pt1.x;
         var seg1seg2dy = inSeg1Pt1.y - inSeg2Pt1.y;
         var limit = seg1dy * seg2dx - seg1dx * seg2dy;
         var perpSeg1 = seg1dy * seg1seg2dx - seg1dx * seg1seg2dy;
         if (Math.abs(limit) > Number.EPSILON) {
            // not parallel
            var perpSeg2;
            if (limit > 0) {
               if ((perpSeg1 < 0) || (perpSeg1 > limit)) return [];
               perpSeg2 = seg2dy * seg1seg2dx - seg2dx * seg1seg2dy;
               if ((perpSeg2 < 0) || (perpSeg2 > limit)) return [];
            } else {
               if ((perpSeg1 > 0) || (perpSeg1 < limit)) return [];
               perpSeg2 = seg2dy * seg1seg2dx - seg2dx * seg1seg2dy;
               if ((perpSeg2 > 0) || (perpSeg2 < limit)) return [];
            }
            // i.e. to reduce rounding errors
            // intersection at endpoint of segment#1?
            if (perpSeg2 === 0) {
               if ((inExcludeAdjacentSegs) &&
                  ((perpSeg1 === 0) || (perpSeg1 === limit))) return [];
               return [inSeg1Pt1];
            }
            if (perpSeg2 === limit) {
               if ((inExcludeAdjacentSegs) &&
                  ((perpSeg1 === 0) || (perpSeg1 === limit))) return [];
               return [inSeg1Pt2];
            }
            // intersection at endpoint of segment#2?
            if (perpSeg1 === 0) return [inSeg2Pt1];
            if (perpSeg1 === limit) return [inSeg2Pt2];
            // return real intersection point
            var factorSeg1 = perpSeg2 / limit;
            return [{
               x: inSeg1Pt1.x + factorSeg1 * seg1dx,
               y: inSeg1Pt1.y + factorSeg1 * seg1dy
            }];
         } else {
            // parallel or collinear
            if ((perpSeg1 !== 0) ||
               (seg2dy * seg1seg2dx !== seg2dx * seg1seg2dy)) return [];
            // they are collinear or degenerate
            var seg1Pt = ((seg1dx === 0) && (seg1dy === 0));	// segment1 is just a point?
            var seg2Pt = ((seg2dx === 0) && (seg2dy === 0));	// segment2 is just a point?
            // both segments are points
            if (seg1Pt && seg2Pt) {
               if ((inSeg1Pt1.x !== inSeg2Pt1.x) ||
                  (inSeg1Pt1.y !== inSeg2Pt1.y)) return [];	// they are distinct  points
               return [inSeg1Pt1];                 						// they are the same point
            }
            // segment#1  is a single point
            if (seg1Pt) {
               if (!point_in_segment_2D_colin(inSeg2Pt1, inSeg2Pt2, inSeg1Pt1)) return [];		// but not in segment#2
               return [inSeg1Pt1];
            }
            // segment#2  is a single point
            if (seg2Pt) {
               if (!point_in_segment_2D_colin(inSeg1Pt1, inSeg1Pt2, inSeg2Pt1)) return [];		// but not in segment#1
               return [inSeg2Pt1];
            }
            // they are collinear segments, which might overlap
            var seg1min, seg1max, seg1minVal, seg1maxVal;
            var seg2min, seg2max, seg2minVal, seg2maxVal;
            if (seg1dx !== 0) {
               // the segments are NOT on a vertical line
               if (inSeg1Pt1.x < inSeg1Pt2.x) {
                  seg1min = inSeg1Pt1; seg1minVal = inSeg1Pt1.x;
                  seg1max = inSeg1Pt2; seg1maxVal = inSeg1Pt2.x;
               } else {
                  seg1min = inSeg1Pt2; seg1minVal = inSeg1Pt2.x;
                  seg1max = inSeg1Pt1; seg1maxVal = inSeg1Pt1.x;
               }
               if (inSeg2Pt1.x < inSeg2Pt2.x) {
                  seg2min = inSeg2Pt1; seg2minVal = inSeg2Pt1.x;
                  seg2max = inSeg2Pt2; seg2maxVal = inSeg2Pt2.x;
               } else {
                  seg2min = inSeg2Pt2; seg2minVal = inSeg2Pt2.x;
                  seg2max = inSeg2Pt1; seg2maxVal = inSeg2Pt1.x;
               }
            } else {
               // the segments are on a vertical line
               if (inSeg1Pt1.y < inSeg1Pt2.y) {
                  seg1min = inSeg1Pt1; seg1minVal = inSeg1Pt1.y;
                  seg1max = inSeg1Pt2; seg1maxVal = inSeg1Pt2.y;
               } else {
                  seg1min = inSeg1Pt2; seg1minVal = inSeg1Pt2.y;
                  seg1max = inSeg1Pt1; seg1maxVal = inSeg1Pt1.y;
               }
               if (inSeg2Pt1.y < inSeg2Pt2.y) {
                  seg2min = inSeg2Pt1; seg2minVal = inSeg2Pt1.y;
                  seg2max = inSeg2Pt2; seg2maxVal = inSeg2Pt2.y;
               } else {
                  seg2min = inSeg2Pt2; seg2minVal = inSeg2Pt2.y;
                  seg2max = inSeg2Pt1; seg2maxVal = inSeg2Pt1.y;
               }
            }
            if (seg1minVal <= seg2minVal) {
               if (seg1maxVal < seg2minVal) return [];
               if (seg1maxVal === seg2minVal) {
                  if (inExcludeAdjacentSegs) return [];
                  return [seg2min];
               }
               if (seg1maxVal <= seg2maxVal) return [seg2min, seg1max];
               return [seg2min, seg2max];
            } else {
               if (seg1minVal > seg2maxVal) return [];
               if (seg1minVal === seg2maxVal) {
                  if (inExcludeAdjacentSegs) return [];
                  return [seg1min];
               }
               if (seg1maxVal <= seg2maxVal) return [seg1min, seg1max];
               return [seg1min, seg2max];
            }
         }
      }

      function isPointInsideAngle(inVertex, inLegFromPt, inLegToPt, inOtherPt) {
         // The order of legs is important
         // translation of all points, so that Vertex is at (0,0)
         var legFromPtX = inLegFromPt.x - inVertex.x, legFromPtY = inLegFromPt.y - inVertex.y;
         var legToPtX = inLegToPt.x - inVertex.x, legToPtY = inLegToPt.y - inVertex.y;
         var otherPtX = inOtherPt.x - inVertex.x, otherPtY = inOtherPt.y - inVertex.y;
         // main angle >0: < 180 deg.; 0: 180 deg.; <0: > 180 deg.
         var from2toAngle = legFromPtX * legToPtY - legFromPtY * legToPtX;
         var from2otherAngle = legFromPtX * otherPtY - legFromPtY * otherPtX;
         if (Math.abs(from2toAngle) > Number.EPSILON) {
            // angle != 180 deg.
            var other2toAngle = otherPtX * legToPtY - otherPtY * legToPtX;
            // console.log( "from2to: " + from2toAngle + ", from2other: " + from2otherAngle + ", other2to: " + other2toAngle );
            if (from2toAngle > 0) {
               // main angle < 180 deg.
               return ((from2otherAngle >= 0) && (other2toAngle >= 0));
            } else {
               // main angle > 180 deg.
               return ((from2otherAngle >= 0) || (other2toAngle >= 0));
            }
         } else {
            // angle == 180 deg.
            // console.log( "from2to: 180 deg., from2other: " + from2otherAngle  );
            return (from2otherAngle > 0);
         }
      }


      function removeHoles(contour, holes) {
         var shape = contour.concat(); // work on this shape
         var hole;
         function isCutLineInsideAngles(inShapeIdx, inHoleIdx) {
            // Check if hole point lies within angle around shape point
            var lastShapeIdx = shape.length - 1;
            var prevShapeIdx = inShapeIdx - 1;
            if (prevShapeIdx < 0) prevShapeIdx = lastShapeIdx;
            var nextShapeIdx = inShapeIdx + 1;
            if (nextShapeIdx > lastShapeIdx) nextShapeIdx = 0;
            var insideAngle = isPointInsideAngle(shape[inShapeIdx], shape[prevShapeIdx], shape[nextShapeIdx], hole[inHoleIdx]);
            if (!insideAngle) {
               // console.log( "Vertex (Shape): " + inShapeIdx + ", Point: " + hole[inHoleIdx].x + "/" + hole[inHoleIdx].y );
               return false;
            }
            // Check if shape point lies within angle around hole point
            var lastHoleIdx = hole.length - 1;
            var prevHoleIdx = inHoleIdx - 1;
            if (prevHoleIdx < 0) prevHoleIdx = lastHoleIdx;
            var nextHoleIdx = inHoleIdx + 1;
            if (nextHoleIdx > lastHoleIdx) nextHoleIdx = 0;
            insideAngle = isPointInsideAngle(hole[inHoleIdx], hole[prevHoleIdx], hole[nextHoleIdx], shape[inShapeIdx]);
            if (!insideAngle) {
               // console.log( "Vertex (Hole): " + inHoleIdx + ", Point: " + shape[inShapeIdx].x + "/" + shape[inShapeIdx].y );
               return false;
            }
            return true;
         }
         function intersectsShapeEdge(inShapePt, inHolePt) {
            // checks for intersections with shape edges
            var sIdx, nextIdx, intersection;
            for (sIdx = 0; sIdx < shape.length; sIdx++) {
               nextIdx = sIdx + 1; nextIdx %= shape.length;
               intersection = intersect_segments_2D(inShapePt, inHolePt, shape[sIdx], shape[nextIdx], true);
               if (intersection.length > 0) return true;
            }
            return false;
         }
         var indepHoles = [];
         function intersectsHoleEdge(inShapePt, inHolePt) {
            // checks for intersections with hole edges
            var ihIdx, chkHole, hIdx, nextIdx, intersection;
            for (ihIdx = 0; ihIdx < indepHoles.length; ihIdx++) {
               chkHole = holes[indepHoles[ihIdx]];
               for (hIdx = 0; hIdx < chkHole.length; hIdx++) {
                  nextIdx = hIdx + 1; nextIdx %= chkHole.length;
                  intersection = intersect_segments_2D(inShapePt, inHolePt, chkHole[hIdx], chkHole[nextIdx], true);
                  if (intersection.length > 0) return true;
               }
            }
            return false;
         }
         var holeIndex, shapeIndex,
            shapePt, holePt,
            holeIdx, cutKey, failedCuts = [],
            tmpShape1, tmpShape2,
            tmpHole1, tmpHole2;
         for (var h = 0, hl = holes.length; h < hl; h++) {
            indepHoles.push(h);
         }
         var minShapeIndex = 0;
         var counter = indepHoles.length * 2;
         while (indepHoles.length > 0) {
            counter--;
            if (counter < 0) {
               console.log("Infinite Loop! Holes left:" + indepHoles.length + ", Probably Hole outside Shape!");
               break;
            }
            // search for shape-vertex and hole-vertex,
            // which can be connected without intersections
            for (shapeIndex = minShapeIndex; shapeIndex < shape.length; shapeIndex++) {
               shapePt = shape[shapeIndex];
               holeIndex = - 1;
               // search for hole which can be reached without intersections
               for (var h = 0; h < indepHoles.length; h++) {
                  holeIdx = indepHoles[h];
                  // prevent multiple checks
                  cutKey = shapePt.x + ":" + shapePt.y + ":" + holeIdx;
                  if (failedCuts[cutKey] !== undefined) continue;
                  hole = holes[holeIdx];
                  for (var h2 = 0; h2 < hole.length; h2++) {
                     holePt = hole[h2];
                     if (!isCutLineInsideAngles(shapeIndex, h2)) continue;
                     if (intersectsShapeEdge(shapePt, holePt)) continue;
                     if (intersectsHoleEdge(shapePt, holePt)) continue;
                     holeIndex = h2;
                     indepHoles.splice(h, 1);
                     tmpShape1 = shape.slice(0, shapeIndex + 1);
                     tmpShape2 = shape.slice(shapeIndex);
                     tmpHole1 = hole.slice(holeIndex);
                     tmpHole2 = hole.slice(0, holeIndex + 1);
                     shape = tmpShape1.concat(tmpHole1).concat(tmpHole2).concat(tmpShape2);
                     minShapeIndex = shapeIndex;
                     // Debug only, to show the selected cuts
                     // glob_CutLines.push( [ shapePt, holePt ] );
                     break;
                  }
                  if (holeIndex >= 0) break;		// hole-vertex found
                  failedCuts[cutKey] = true;			// remember failure
               }
               if (holeIndex >= 0) break;		// hole-vertex found
            }
         }
         return shape; 			/* shape with no holes */
      }
      var i, il, f, face,
         key, index,
         allPointsMap = {};
      // To maintain reference to old shape, one must match coordinates, or offset the indices from original arrays. It's probably easier to do the first.
      var allpoints = contour.concat();
      for (var h = 0, hl = holes.length; h < hl; h++) {
         Array.prototype.push.apply(allpoints, holes[h]);
      }
      //console.log( "allpoints",allpoints, allpoints.length );
      // prepare all points map
      for (i = 0, il = allpoints.length; i < il; i++) {
         key = allpoints[i].x + ":" + allpoints[i].y;
         if (allPointsMap[key] !== undefined) {
            console.warn("THREE.Shape: Duplicate point", key);
         }
         allPointsMap[key] = i;
      }
      // remove holes by cutting paths to holes and adding them to the shape
      var shapeWithoutHoles = removeHoles(contour, holes);
      var triangles = THREE.ShapeUtils.triangulate(shapeWithoutHoles, false); // True returns indices for points of spooled shape
      //console.log( "triangles",triangles, triangles.length );
      // check all face vertices against all points map
      for (i = 0, il = triangles.length; i < il; i++) {
         face = triangles[i];
         for (f = 0; f < 3; f++) {
            key = face[f].x + ":" + face[f].y;
            index = allPointsMap[key];
            if (index !== undefined) {
               face[f] = index;
            }
         }
      }
      return triangles.concat();
   }

   public triangulateShape = function (contour, holes) {
      function point_in_segment_2D_colin(inSegPt1, inSegPt2, inOtherPt) {
         if (inSegPt1.x !== inSegPt2.x) {
            if (inSegPt1.x < inSegPt2.x) {
               return ((inSegPt1.x <= inOtherPt.x) && (inOtherPt.x <= inSegPt2.x));
            } else {
               return ((inSegPt2.x <= inOtherPt.x) && (inOtherPt.x <= inSegPt1.x));
            }
         } else {
            if (inSegPt1.y < inSegPt2.y) {
               return ((inSegPt1.y <= inOtherPt.y) && (inOtherPt.y <= inSegPt2.y));
            } else {
               return ((inSegPt2.y <= inOtherPt.y) && (inOtherPt.y <= inSegPt1.y));
            }
         }
      }
      function intersect_segments_2D(inSeg1Pt1, inSeg1Pt2, inSeg2Pt1, inSeg2Pt2, inExcludeAdjacentSegs) {
         var seg1dx = inSeg1Pt2.x - inSeg1Pt1.x, seg1dy = inSeg1Pt2.y - inSeg1Pt1.y;
         var seg2dx = inSeg2Pt2.x - inSeg2Pt1.x, seg2dy = inSeg2Pt2.y - inSeg2Pt1.y;
         var seg1seg2dx = inSeg1Pt1.x - inSeg2Pt1.x;
         var seg1seg2dy = inSeg1Pt1.y - inSeg2Pt1.y;
         var limit = seg1dy * seg2dx - seg1dx * seg2dy;
         var perpSeg1 = seg1dy * seg1seg2dx - seg1dx * seg1seg2dy;
         if (Math.abs(limit) > MathUtil.EPSILON) {
            var perpSeg2;
            if (limit > 0) {
               if ((perpSeg1 < 0) || (perpSeg1 > limit)) return [];
               perpSeg2 = seg2dy * seg1seg2dx - seg2dx * seg1seg2dy;
               if ((perpSeg2 < 0) || (perpSeg2 > limit)) return [];
            } else {
               if ((perpSeg1 > 0) || (perpSeg1 < limit)) return [];
               perpSeg2 = seg2dy * seg1seg2dx - seg2dx * seg1seg2dy;
               if ((perpSeg2 > 0) || (perpSeg2 < limit)) return [];
            }
            if (perpSeg2 === 0) {
               if ((inExcludeAdjacentSegs) &&
                  ((perpSeg1 === 0) || (perpSeg1 === limit))) return [];
               return [inSeg1Pt1];
            }
            if (perpSeg2 === limit) {
               if ((inExcludeAdjacentSegs) &&
                  ((perpSeg1 === 0) || (perpSeg1 === limit))) return [];
               return [inSeg1Pt2];
            }
            if (perpSeg1 === 0) return [inSeg2Pt1];
            if (perpSeg1 === limit) return [inSeg2Pt2];
            var factorSeg1 = perpSeg2 / limit;
            return [{ x: inSeg1Pt1.x + factorSeg1 * seg1dx, y: inSeg1Pt1.y + factorSeg1 * seg1dy }];
         } else {
            if ((perpSeg1 !== 0) || (seg2dy * seg1seg2dx !== seg2dx * seg1seg2dy))
               return [];
            var seg1Pt = ((seg1dx === 0) && (seg1dy === 0));
            var seg2Pt = ((seg2dx === 0) && (seg2dy === 0));
            if (seg1Pt && seg2Pt) {
               if ((inSeg1Pt1.x !== inSeg2Pt1.x) || (inSeg1Pt1.y !== inSeg2Pt1.y))
                  return [];
               return [inSeg1Pt1];
            }
            if (seg1Pt) {
               if (!point_in_segment_2D_colin(inSeg2Pt1, inSeg2Pt2, inSeg1Pt1)) return [];
               return [inSeg1Pt1];
            }
            if (seg2Pt) {
               if (!point_in_segment_2D_colin(inSeg1Pt1, inSeg1Pt2, inSeg2Pt1)) return [];
               return [inSeg2Pt1];
            }
            var seg1min, seg1max, seg1minVal, seg1maxVal;
            var seg2min, seg2max, seg2minVal, seg2maxVal;
            if (seg1dx !== 0) {
               if (inSeg1Pt1.x < inSeg1Pt2.x) {
                  seg1min = inSeg1Pt1; seg1minVal = inSeg1Pt1.x;
                  seg1max = inSeg1Pt2; seg1maxVal = inSeg1Pt2.x;
               } else {
                  seg1min = inSeg1Pt2; seg1minVal = inSeg1Pt2.x;
                  seg1max = inSeg1Pt1; seg1maxVal = inSeg1Pt1.x;
               }
               if (inSeg2Pt1.x < inSeg2Pt2.x) {
                  seg2min = inSeg2Pt1; seg2minVal = inSeg2Pt1.x;
                  seg2max = inSeg2Pt2; seg2maxVal = inSeg2Pt2.x;
               } else {
                  seg2min = inSeg2Pt2; seg2minVal = inSeg2Pt2.x;
                  seg2max = inSeg2Pt1; seg2maxVal = inSeg2Pt1.x;
               }
            } else {
               if (inSeg1Pt1.y < inSeg1Pt2.y) {
                  seg1min = inSeg1Pt1; seg1minVal = inSeg1Pt1.y;
                  seg1max = inSeg1Pt2; seg1maxVal = inSeg1Pt2.y;
               } else {
                  seg1min = inSeg1Pt2; seg1minVal = inSeg1Pt2.y;
                  seg1max = inSeg1Pt1; seg1maxVal = inSeg1Pt1.y;
               }
               if (inSeg2Pt1.y < inSeg2Pt2.y) {
                  seg2min = inSeg2Pt1; seg2minVal = inSeg2Pt1.y;
                  seg2max = inSeg2Pt2; seg2maxVal = inSeg2Pt2.y;
               } else {
                  seg2min = inSeg2Pt2; seg2minVal = inSeg2Pt2.y;
                  seg2max = inSeg2Pt1; seg2maxVal = inSeg2Pt1.y;
               }
            }
            if (seg1minVal <= seg2minVal) {
               if (seg1maxVal < seg2minVal)
                  return [];
               if (seg1maxVal === seg2minVal) {
                  if (inExcludeAdjacentSegs)
                     return [];
                  return [seg2min];
               }
               if (seg1maxVal <= seg2maxVal)
                  return [seg2min, seg1max];
               return [seg2min, seg2max];
            } else {
               if (seg1minVal > seg2maxVal)
                  return [];
               if (seg1minVal === seg2maxVal) {
                  if (inExcludeAdjacentSegs)
                     return [];
                  return [seg1min];
               }
               if (seg1maxVal <= seg2maxVal)
                  return [seg1min, seg1max];
               return [seg1min, seg2max];
            }
         }
      }
      function isPointInsideAngle(inVertex, inLegFromPt, inLegToPt, inOtherPt) {
         var legFromPtX = inLegFromPt.x - inVertex.x, legFromPtY = inLegFromPt.y - inVertex.y;
         var legToPtX = inLegToPt.x - inVertex.x, legToPtY = inLegToPt.y - inVertex.y;
         var otherPtX = inOtherPt.x - inVertex.x, otherPtY = inOtherPt.y - inVertex.y;
         var from2toAngle = legFromPtX * legToPtY - legFromPtY * legToPtX;
         var from2otherAngle = legFromPtX * otherPtY - legFromPtY * otherPtX;
         if (Math.abs(from2toAngle) > MathUtil.EPSILON) {
            var other2toAngle = otherPtX * legToPtY - otherPtY * legToPtX;
            // console.log( "from2to: " + from2toAngle + ", from2other: " + from2otherAngle + ", other2to: " + other2toAngle );
            if (from2toAngle > 0) {
               // main angle < 180 deg.
               return ((from2otherAngle >= 0) && (other2toAngle >= 0));
            } else {
               // main angle > 180 deg.
               return ((from2otherAngle >= 0) || (other2toAngle >= 0));
            }
         } else {
            // angle == 180 deg.
            // console.log( "from2to: 180 deg., from2other: " + from2otherAngle  );
            return (from2otherAngle > 0);
         }
      }
      function removeHoles(contour, holes) {
         var shape = contour.concat(); // work on this shape
         var hole;
         function isCutLineInsideAngles(inShapeIdx, inHoleIdx) {
            // Check if hole point lies within angle around shape point
            var lastShapeIdx = shape.length - 1;
            var prevShapeIdx = inShapeIdx - 1;
            if (prevShapeIdx < 0) prevShapeIdx = lastShapeIdx;
            var nextShapeIdx = inShapeIdx + 1;
            if (nextShapeIdx > lastShapeIdx) nextShapeIdx = 0;
            var insideAngle = isPointInsideAngle(shape[inShapeIdx], shape[prevShapeIdx], shape[nextShapeIdx], hole[inHoleIdx]);
            if (!insideAngle) {
               // console.log( "Vertex (Shape): " + inShapeIdx + ", Point: " + hole[inHoleIdx].x + "/" + hole[inHoleIdx].y );
               return false;
            }
            // Check if shape point lies within angle around hole point
            var lastHoleIdx = hole.length - 1;
            var prevHoleIdx = inHoleIdx - 1;
            if (prevHoleIdx < 0) prevHoleIdx = lastHoleIdx;
            var nextHoleIdx = inHoleIdx + 1;
            if (nextHoleIdx > lastHoleIdx) nextHoleIdx = 0;
            insideAngle = isPointInsideAngle(hole[inHoleIdx], hole[prevHoleIdx], hole[nextHoleIdx], shape[inShapeIdx]);
            if (!insideAngle) {
               // console.log( "Vertex (Hole): " + inHoleIdx + ", Point: " + shape[inShapeIdx].x + "/" + shape[inShapeIdx].y );
               return false;
            }
            return true;
         }
         function intersectsShapeEdge(inShapePt, inHolePt) {
            // checks for intersections with shape edges
            var sIdx, nextIdx, intersection;
            for (sIdx = 0; sIdx < shape.length; sIdx++) {
               nextIdx = sIdx + 1; nextIdx %= shape.length;
               intersection = intersect_segments_2D(inShapePt, inHolePt, shape[sIdx], shape[nextIdx], true);
               if (intersection.length > 0) return true;
            }
            return false;
         }
         var indepHoles = [];
         function intersectsHoleEdge(inShapePt, inHolePt) {
            // checks for intersections with hole edges
            var ihIdx, chkHole,
               hIdx, nextIdx, intersection;
            for (ihIdx = 0; ihIdx < indepHoles.length; ihIdx++) {
               chkHole = holes[indepHoles[ihIdx]];
               for (hIdx = 0; hIdx < chkHole.length; hIdx++) {
                  nextIdx = hIdx + 1; nextIdx %= chkHole.length;
                  intersection = intersect_segments_2D(inShapePt, inHolePt, chkHole[hIdx], chkHole[nextIdx], true);
                  if (intersection.length > 0) return true;
               }
            }
            return false;
         }
         var holeIndex, shapeIndex,
            shapePt, holePt,
            holeIdx, cutKey, failedCuts = [],
            tmpShape1, tmpShape2,
            tmpHole1, tmpHole2;
         for (var h = 0, hl = holes.length; h < hl; h++) {
            indepHoles.push(h);
         }
         var minShapeIndex = 0;
         var counter = indepHoles.length * 2;
         while (indepHoles.length > 0) {
            counter--;
            if (counter < 0) {
               console.log("Infinite Loop! Holes left:" + indepHoles.length + ", Probably Hole outside Shape!");
               break;
            }
            // search for shape-vertex and hole-vertex,
            // which can be connected without intersections
            for (shapeIndex = minShapeIndex; shapeIndex < shape.length; shapeIndex++) {
               shapePt = shape[shapeIndex];
               holeIndex = - 1;
               // search for hole which can be reached without intersections
               for (var h = 0; h < indepHoles.length; h++) {
                  holeIdx = indepHoles[h];
                  // prevent multiple checks
                  cutKey = shapePt.x + ":" + shapePt.y + ":" + holeIdx;
                  if (failedCuts[cutKey] !== undefined) continue;
                  hole = holes[holeIdx];
                  for (var h2 = 0; h2 < hole.length; h2++) {
                     holePt = hole[h2];
                     if (!isCutLineInsideAngles(shapeIndex, h2)) continue;
                     if (intersectsShapeEdge(shapePt, holePt)) continue;
                     if (intersectsHoleEdge(shapePt, holePt)) continue;
                     holeIndex = h2;
                     indepHoles.splice(h, 1);
                     tmpShape1 = shape.slice(0, shapeIndex + 1);
                     tmpShape2 = shape.slice(shapeIndex);
                     tmpHole1 = hole.slice(holeIndex);
                     tmpHole2 = hole.slice(0, holeIndex + 1);
                     shape = tmpShape1.concat(tmpHole1).concat(tmpHole2).concat(tmpShape2);
                     minShapeIndex = shapeIndex;
                     // Debug only, to show the selected cuts
                     // glob_CutLines.push( [ shapePt, holePt ] );
                     break;
                  }
                  if (holeIndex >= 0) break;		// hole-vertex found
                  failedCuts[cutKey] = true;			// remember failure
               }
               if (holeIndex >= 0) break;		// hole-vertex found
            }
         }
         return shape; 			/* shape with no holes */
      }
      var i, il, f, face, key, index, allPointsMap = {};
      var allpoints = contour.concat();
      for (var h = 0, hl = holes.length; h < hl; h++) {
         Array.prototype.push.apply(allpoints, holes[h]);
      }
      for (i = 0, il = allpoints.length; i < il; i++) {
         key = allpoints[i].x + ":" + allpoints[i].y;
         if (allPointsMap[key] !== undefined) {
            console.warn("THREE.Shape: Duplicate point", key);
         }
         allPointsMap[key] = i;
      }
      var shapeWithoutHoles = removeHoles(contour, holes);
      var triangles = ShapeUtils.triangulate(shapeWithoutHoles, false);
      for (i = 0, il = triangles.length; i < il; i++) {
         face = triangles[i];
         for (f = 0; f < 3; f++) {
            key = face[f].x + ":" + face[f].y;
            index = allPointsMap[key];
            if (index !== undefined) {
               face[f] = index;
            }
         }
      }
      return triangles.concat();
   }



}
