import {MathUtil} from './MathUtil';

export class Spherical {
   // public radius;
   // public phi;
   // public theta;

   // public constructor(radius, phi, theta) {
   //    this.radius = (radius !== undefined) ? radius : 1.0;
   //    this.phi = (phi !== undefined) ? phi : 0; // up / down towards top and bottom pole
   //    this.theta = (theta !== undefined) ? theta : 0; // around the equator of the sphere
   //    return this;
   // }

   // public set(radius, phi, theta) {
   //    this.radius = radius;
   //    this.phi = phi;
   //    this.theta = theta;
   // }

   // public copy(other) {
   //    this.radius.copy(other.radius);
   //    this.phi.copy(other.phi);
   //    this.theta.copy(other.theta);
   //    return this;
   // }

   // public makeSafe() {
   //    var EPS = 0.000001;
   //    this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));
   // }

   // public setFromVector3(vec3) {
   //    this.radius = vec3.length();
   //    if (this.radius === 0) {
   //       this.theta = 0;
   //       this.phi = 0;
   //    } else {
   //       this.theta = Math.atan2(vec3.x, vec3.z); // equator angle around y-up axis
   //       this.phi = Math.acos(MathUtil.clamp(vec3.y / this.radius, - 1, 1)); // polar angle
   //    }
   //    return this;
   // }

   // public clone() {
   //    return new (this as any).constructor().copy(this);
   // }
}
