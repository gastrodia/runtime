import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {PersistentService} from './PersistentService';

/**
 * 传输器。
 */
export class Transfer extends ObjectBase {
   // 服务
   public service: PersistentService;

   /**
    * 获得对象数据。
    *
    * @param item 对象
    * @param name 名称
    * @return 内容
    */
   public get(item: any, name: string): any {
   }

   /**
    * 设置对象数据。
    *
    * @param item 对象
    * @param name 名称
    * @param value 内容
    */
   public set(item: any, name: string, value: any) {
   }
}
