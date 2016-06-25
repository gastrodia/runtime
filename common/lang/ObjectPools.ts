import {ClassUtil} from '../reflect/ClassUtil';
import {Base} from './Base';
import {Dictionary} from './Dictionary';
import {ObjectPool} from './ObjectPool';

//==========================================================
// <T>对象池集合。</T>
//
// @class
// @author maocy
// @version 150411
//==========================================================
export class ObjectPools extends Base {
   // 缓冲字典
   public _pools: Dictionary<any> = null;

   //==========================================================
   // <T>构建当前对象的实例。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this._pools = new Dictionary<any>();
   }

   //==========================================================
   // <T>获得一个对象池。</T>
   //
   // @method
   // @param code:String 代码
   // @return FObjectPool 对象池
   //==========================================================
   public pool(code) {
      var pool = this._pools.get(code);
      if (!pool) {
         pool = ClassUtil.create(ObjectPool);
         this._pools.set(code, pool);
      }
      return pool;
   }

   //==========================================================
   // <T>收集一个自由对象。</T>
   //
   // @method
   // @param code:String 代码
   // @return FObject 对象
   //==========================================================
   public alloc(code) {
      var pool = this.pool(code);
      return pool.alloc();
   }

   //==========================================================
   // <T>释放 一个自由对象。</T>
   //
   // @method
   // @param FObject 对象
   //==========================================================
   public free(code, instance) {
      var pool = this.pool(code);
      return pool.free(instance);
   }

   //==========================================================
   // <T>增加一个对象。</T>
   //
   // @method
   // @param FObject 对象
   //==========================================================
   public push(code, instance) {
      var pool = this.pool(code);
      return pool.push(instance);
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放缓冲池集合
      var pools = this._pools;
      var count = pools.count();
      for (var i = 0; i < count; i++) {
         var pool = pools.at(i);
         pool.dispose();
      }
      pools.dispose();
      // 父处理
      super.dispose();
   }
}
