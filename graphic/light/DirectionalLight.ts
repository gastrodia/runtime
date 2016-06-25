import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {Vector3} from '../../math/Vector3';
import {Light} from './Light';

export class DirectionalLight extends Light {
   // @attribute
   //_camera      = MO.Class.register(o, new MO.AGetter('_camera'));
   protected _camera = null;
   //_viewport    = MO.Class.register(o, new MO.AGetter('_viewport'));
   protected _viewport = null;
   //_direction   = MO.Class.register(o, new MO.AGetter('_direction'));
   protected _direction: Vector3 = new Vector3();
   // @attribute
   //protected _classCamera = FG3dCamera;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      //o._camera = MO.Class.create(o._classCamera);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._camera = ObjectUtil.dispose(this._camera);
      this._direction = ObjectUtil.dispose(this._direction);
      // 父处理
      super.dispose();
   }

   // THREE.DirectionalLight = function ( color, intensity ) {

   // 	THREE.Light.call( this, color, intensity );

   // 	this.type = 'DirectionalLight';

   // 	this.position.set( 0, 1, 0 );
   // 	this.updateMatrix();

   // 	this.target = new THREE.Object3D();

   // 	this.shadow = new THREE.LightShadow( new THREE.OrthographicCamera( - 5, 5, 5, - 5, 0.5, 500 ) );

   // };

   // THREE.DirectionalLight.prototype = Object.create( THREE.Light.prototype );
   // THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;

   // THREE.DirectionalLight.prototype.copy = function ( source ) {

   // 	THREE.Light.prototype.copy.call( this, source );

   // 	this.target = source.target.clone();

   // 	this.shadow = source.shadow.clone();

   // 	return this;

   // };
}
