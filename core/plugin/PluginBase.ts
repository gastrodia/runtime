import {ObjectBase} from '../../common/lang/ObjectBase';
import {PluginContext} from './PluginContext';
import {PluginFace} from './PluginFace';

/**
 * 插件基础。
 */
export class PluginBase extends ObjectBase implements PluginFace {
   // 类型
   public type;
   // 名称
   public name;
   // 有效
   public enable;
   // 描述
   public description;
   // 依赖
   public dependencies;
   // 加载器
   public loader;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // plugin = plugin || {};
      // this.type = void 0;
      // this.enable = void 0 !== plugin.enable ? plugin.enable : true;
      // this.name = void 0 !== plugin.name ? plugin.name : "Unnamed plugin";
      // this.description = void 0 !== plugin.description ? plugin.description : "No Description";
      // this.dependencies = void 0 !== plugin.dependencies ? plugin.dependencies : [];
   }

   /**
    * 创建处理。
    *
    * @param context 环境
    */
   public create(context: PluginContext) {
   }

   /**
    * 激活处理。
    *
    * @param context 环境
    */
   public active(context: PluginContext) {
   }

   /**
    * 取消激活处理。
    *
    * @param context 环境
    */
   public deactive(context: PluginContext) {
   }

   /**
    * 销毁处理。
    *
    * @param context 环境
    */
   public destroy(context: PluginContext) {
   }
}
