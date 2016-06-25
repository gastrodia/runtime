import {DataTypeEnum} from '../lang/DataTypeEnum';
import {ClassUtil} from './ClassUtil';
import {FieldAnnotation} from './FieldAnnotation';

//==========================================================
// <T>字段关联描述类。</T>
//
// @author maocy
// @version 160426
//==========================================================
export function Field(
   dataName?: String,
   dataCd: DataTypeEnum = DataTypeEnum.Object,
   dataClass?: any,
   dataDefault: any = null) {
   return function (target: any, name: string): void {
      // 注册描述器
      var annotation = new FieldAnnotation(name, dataName, dataCd, dataClass, dataDefault);
      ClassUtil.registerAnnotation(target.constructor, annotation);
   }
}
