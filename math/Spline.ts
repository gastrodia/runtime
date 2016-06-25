import {Vector3} from './Vector3';

export class Spline {

   // public c = [];
   // public v3 = { x: 0, y: 0, z: 0 }
   // public point;
   // public intPoint;
   // public weight;
   // public w2;
   // public w3;
   // public pa;
   // public pb;
   // public pc;
   // public pd;
   // public points;

   // public constructor(points) {
   //    this.points = points;
   // }

   // public initFromArray(a) {
   //    this.points = [];
   //    for (var i = 0; i < a.length; i++) {
   //       this.points[i] = { x: a[i][0], y: a[i][1], z: a[i][2] };
   //    }
   // }

   // public getPoint(k) {
   //    this.point = (this.points.length - 1) * k;
   //    this.intPoint = Math.floor(this.point);
   //    this.weight = this.point - this.intPoint;
   //    this.c[0] = this.intPoint === 0 ? this.intPoint : this.intPoint - 1;
   //    this.c[1] = this.intPoint;
   //    this.c[2] = this.intPoint > this.points.length - 2 ? this.points.length - 1 : this.intPoint + 1;
   //    this.c[3] = this.intPoint > this.points.length - 3 ? this.points.length - 1 : this.intPoint + 2;
   //    this.pa = this.points[this.c[0]];
   //    this.pb = this.points[this.c[1]];
   //    this.pc = this.points[this.c[2]];
   //    this.pd = this.points[this.c[3]];
   //    this.w2 = this.weight * this.weight;
   //    this.w3 = this.weight * this.w2;
   //    this.v3.x = this.interpolate(this.pa.x, this.pb.x, this.pc.x, this.pd.x, this.weight, this.w2, this.w3);
   //    this.v3.y = this.interpolate(this.pa.y, this.pb.y, this.pc.y, this.pd.y, this.weight, this.w2, this.w3);
   //    this.v3.z = this.interpolate(this.pa.z, this.pb.z, this.pc.z, this.pd.z, this.weight, this.w2, this.w3);
   //    return this.v3;
   // }

   // public getControlPointsArray() {
   //    var i, p, l = this.points.length,
   //       coords = [];
   //    for (i = 0; i < l; i++) {
   //       p = this.points[i];
   //       coords[i] = [p.x, p.y, p.z];
   //    }
   //    return coords;
   // }

   // public getLength(nSubDivisions?: any) {
   //    var i;
   //    var index;
   //    var nSamples;
   //    var position;
   //    var point = 0;
   //    var intPoint = 0;
   //    var oldIntPoint = 0;
   //    var oldPosition = new Vector3();
   //    var tmpVec = new Vector3();
   //    var chunkLengths = [];
   //    var totalLength = 0;
   //    chunkLengths[0] = 0;
   //    if (!nSubDivisions) nSubDivisions = 100;
   //    nSamples = this.points.length * nSubDivisions;
   //    oldPosition.assign(this.points[0]);
   //    for (i = 1; i < nSamples; i++) {
   //       index = i / nSamples;
   //       position = this.getPoint(index);
   //       tmpVec.assign(position);
   //       totalLength += tmpVec.distanceTo(oldPosition);
   //       oldPosition.assign(position);
   //       point = (this.points.length - 1) * index;
   //       intPoint = Math.floor(point);
   //       if (intPoint !== oldIntPoint) {
   //          chunkLengths[intPoint] = totalLength;
   //          oldIntPoint = intPoint;
   //       }
   //    }
   //    chunkLengths[chunkLengths.length] = totalLength;
   //    return { chunks: chunkLengths, total: totalLength };
   // }

   // public reparametrizeByArcLength(samplingCoef) {
   //    var i, j,
   //       index, indexCurrent, indexNext,
   //       realDistance,
   //       sampling, position,
   //       newpoints = [],
   //       tmpVec = new Vector3(),
   //       sl = this.getLength();
   //    newpoints.push(tmpVec.assign(this.points[0]).clone());
   //    for (i = 1; i < this.points.length; i++) {
   //       realDistance = sl.chunks[i] - sl.chunks[i - 1];
   //       sampling = Math.ceil(samplingCoef * realDistance / sl.total);
   //       indexCurrent = (i - 1) / (this.points.length - 1);
   //       indexNext = i / (this.points.length - 1);
   //       for (j = 1; j < sampling - 1; j++) {
   //          index = indexCurrent + j * (1 / sampling) * (indexNext - indexCurrent);
   //          position = this.getPoint(index);
   //          newpoints.push(tmpVec.assign(position).clone());
   //       }
   //       newpoints.push(tmpVec.assign(this.points[i]).clone());
   //    }
   //    this.points = newpoints;
   // }

   // public interpolate(p0, p1, p2, p3, t, t2, t3) {
   //    var v0 = (p2 - p0) * 0.5,
   //       v1 = (p3 - p1) * 0.5;
   //    return (2 * (p1 - p2) + v0 + v1) * t3 + (- 3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
   // }
}
