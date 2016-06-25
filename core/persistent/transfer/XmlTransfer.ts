import {Transfer} from '../Transfer';

/**
 * XML传输器。
 */
export class XmlTransfer extends Transfer {

   /**
    * 获得对象数据。
    *
    * @param item 对象
    * @param name 名称
    * @return 内容
    */
   public get(item: any, name: string): any {
      return item.get(name);
   }

   /**
    * 设置对象数据。
    *
    * @param item 对象
    * @param name 名称
    * @param value 内容
    */
   public set(item: any, name: string, value: any) {
      item.set(name, value);
   }
}
