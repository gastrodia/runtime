import {Annotation} from '../../common/reflect/Annotation';
import {AnnotationEnum} from '../../common/reflect/AnnotationEnum';
import {PluginContext} from './PluginContext';

//============================================================
// <T>插件描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @author maocy
// @version 141231
//============================================================
export class PluginAnnotation extends Annotation {
   // 激活
   public actived: boolean;
   // 依赖
   public dependencies: Array<Function>;

   //============================================================
   // <T>构造处理。</T>
   //
   // @param name 名称
   //============================================================
   public constructor(name: string, dependencies: Array<Function>) {
      super(name);
      // 设置属性
      this._annotationCd = AnnotationEnum.Plugin;
      this._duplicate = false;
      if (dependencies) {
         if (dependencies.length > 0) {
            this.dependencies = dependencies;
         }
      }
   }

   //============================================================
   // <T>创建一个实例。</T>
   //
   // @return 实例
   //============================================================
   public newInstance(context: PluginContext): any {
      var instance = this.clazz.newInstance();
      instance.create(context);
      return instance;
   }
}
