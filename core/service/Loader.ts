import {DataContentEnum} from '../../common/lang/DataContentEnum';
import {ObjectBase} from '../../common/lang/ObjectBase';

//==========================================================
// <T>加载器。</T>
//
// @class
// @author maocy
// @version 160306
//==========================================================
export abstract class Loader extends ObjectBase {
   // 内容类型
   public contentCd: DataContentEnum = DataContentEnum.Unknown;
   // 内容
   public content: any = null;
   // 数据
   public data: any = null;
   // 网络地址
   public url: string = null;

   //==========================================================
   // <T>数据处理。</T>
   //==========================================================
   public abstract process(): void;
}
