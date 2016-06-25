import {ObjectBase} from '../../common/lang/ObjectBase';
import {HotkeyContext} from './HotkeyContext';

/**
 * 热键。
 */
export class Hotkey extends ObjectBase {
   /**
    * 构造处理。
    */
   public constructor() {
      super();
   }

   /**
    * 配置处理。
    */
   public setup() {
   }

   /**
    * 匹配热键是否可以执行。
    *
    * @param context 环境
    * @return 是否匹配
    */
   public metch(context: HotkeyContext): boolean {
      return false;
   }

   /**
    * 逻辑处理。
    */
   public process() {
   }
}
