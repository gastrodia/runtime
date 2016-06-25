import {AssertUtil} from '../AssertUtil';
import {Base} from './Base';
import {ObjectUtil} from './ObjectUtil';
import {Objects} from './Objects';

//==========================================================
// <T>对象池。</T>
//
// @class
// @author maocy
// @version 150108
//==========================================================
export class ObjectPool extends Base {
   // @attribute
   public items:Objects<any> = null;
   public frees:Objects<any> = null;
   // @attribute
   public _allocCount = 0;
   public _freeCount = 0;

   //==========================================================
   // <T>构建当前对象的实例。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.items = new Objects<any>();
      this.frees = new Objects<any>();
   }

   //==========================================================
   // <T>是否存在自由对象。</T>
   //
   // @method
   // @return Boolean 是否存在
   //==========================================================
   public hasFree(): boolean {
      return !this.frees.isEmpty();
   }

   //==========================================================
   // <T>收集一个自由对象。</T>
   //
   // @method
   // @return FObject 对象
   //==========================================================
   public alloc(): any {
      var item = null;
      if (!this.frees.isEmpty()) {
         item = this.frees.pop();
      }
      this._allocCount++;
      return item;
   }

   //==========================================================
   // <T>释放 一个自由对象。</T>
   //
   // @method
   // @param item:FObject 对象
   //==========================================================
   public free(item: any): void {
      AssertUtil.debugNotNull(item);
      this.frees.push(item);
      this._freeCount++;
   }

   //==========================================================
   // <T>增加一个对象。</T>
   //
   // @method
   // @param FObject 对象
   //==========================================================
   public push(item: any): void {
      AssertUtil.debugNotNull(item);
      this.items.push(item);
      this.frees.push(item);
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.items = ObjectUtil.dispose(this.items);
      this.frees = ObjectUtil.dispose(this.frees);
      super.dispose();
   }

   //==========================================================
   // <T>获取运行信息。</T>
   //
   // @method
   // @param result:TString 字符串
   // @param level:Integer 递归层次
   //==========================================================
   public innerDump(result, level) {
      result.append('Pool:');
      result.append('total=', this.items.count());
      result.append(', free=', this.frees.count());
      result.append(', alloc_count=', this._allocCount);
      result.append(', free_count=', this._freeCount);
   }
}
