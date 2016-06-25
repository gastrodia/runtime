import {ObjectBase} from '../../common/lang/ObjectBase';

export class Light extends ObjectBase {

   public code: string;

   public constructor(color?: any, intensity?: any) {
      super();
      // THREE.Object3D.call(this);
      // this.type = 'Light';
      // this.color = new THREE.Color(color);
      // this.intensity = intensity !== undefined ? intensity : 1;
      // this.receiveShadow = undefined;
   }

   public copy(source) {
      // THREE.Object3D.prototype.copy.call(this, source);
      //this.color.copy(source.color);
      //this.intensity = source.intensity;
      return this;
   }

   public toJSON(meta) {
      // var data = THREE.Object3D.prototype.toJSON.call(this, meta);
      // data.object.color = this.color.getHex();
      // data.object.intensity = this.intensity;
      // if (this.groundColor !== undefined) data.object.groundColor = this.groundColor.getHex();
      // if (this.distance !== undefined) data.object.distance = this.distance;
      // if (this.angle !== undefined) data.object.angle = this.angle;
      // if (this.decay !== undefined) data.object.decay = this.decay;
      // if (this.penumbra !== undefined) data.object.penumbra = this.penumbra;
      // return data;
   }
}
