import {ClassUtil} from '../../common/reflect/ClassUtil';
import {ServiceUtil} from '../ServiceUtil';
import {PluginAnnotation} from './PluginAnnotation';
import {PluginService} from './PluginService';

//==========================================================
// <T>实例关联描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function Plugin(name: string, ...dependencies: Array<Function>) {
   return function(clazzType): any {
      // 注册描述器
      var annotation = new PluginAnnotation(name, dependencies);
      ClassUtil.registerAnnotation(clazzType, annotation);
      // 注册插件
      var pluginService: PluginService = ServiceUtil.find(PluginService);
      pluginService.registerAnnotation(annotation);
   }
}
