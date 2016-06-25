import {Dictionary} from '../../../common/lang/Dictionary';
import {ObjectBase} from '../../../common/lang/ObjectBase';
import {ObjectUtil} from '../../../common/lang/ObjectUtil';

//==========================================================
// <T>资源分组。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
export class FResourceType extends ObjectBase {
   //o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   //o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   //o._pipeline = MO.Class.register(o, new MO.AGetSet('_pipeline'));
   //o._resources = MO.Class.register(o, new MO.AGetter('_resources'));
   protected _resources: Dictionary<any> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._resources = new Dictionary<any>();
   }

   //==========================================================
   // <T>获得资源集合。</T>
   //
   // @method
   // @param p:name:String 资源名称
   // @return 资源集合
   //==========================================================
   public findResource(p) {
      return this._resources.get(p);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      o._resources = ObjectUtil.dispose(o._resources);
      // 父处理
      super.dispose();
   }
}
