import {Fatal} from './lang/Fatal';
import {SingletonObject} from './lang/SingletonObject';

/**
 * 运行时检查库。
 * 所有以debug开头的函数，必须在每行的开头使用。
 * 生成Debug版本时候起作用，Release版本将删除这一行。
 * debugBegin到debugEnd之间的行，在Release版本的时候也会被删除。
 *
 * @author maocy
 * @version 150319
 */
export class AssertUtil extends SingletonObject {
   /**
    * 未实现处理。
    *
    * @param owner 拥有者
    */
   public static unimplemented(owner: any) {
      throw new Fatal(owner, 'Unimplemented');
   }

   /**
    * 调试开始。
    */
   public static debugBegin(): void {
   }

   /**
    * 调试结束。
    */
   public static debugEnd(): void {
   }

   /**
    * 判断内容是否为真。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param value 内容
    */
   public static isTrue(value): void {
      if (!value) {
         throw new Error('Assert ture failure.');
      }
   }

   /**
    * 判断内容是否为假。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param value 内容
    */
   public static isFalse(value): void {
      if (value) {
         throw new Error('Assert false failure.');
      }
   }

   /**
    * 执行内容。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param value 内容
    */
   public static debug(value): void {
      return value;
   }

   /**
    * 判断内容是否定义。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param values 内容
    */
   public static debugDefine(...values: Array<any>): void {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         if (value == void 0) {
            throw new Error('Assert null failure.');
         }
      }
   }

   /**
    * 判断内容是否为真。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param values 内容
    */
   public static debugTrue(...values: Array<any>): void {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         if (!value) {
            throw new Error('Assert true failure.');
         }
      }
   }

   /**
    * 判断内容是否为假。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param values 内容
    */
   public static debugFalse(...values: Array<any>): void {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         if (value) {
            throw new Error('Assert false failure.');
         }
      }
   }

   /**
    * 判断内容是否为空。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param values 内容
    */
   public static debugNull(...values: Array<any>): void {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         if (value != null) {
            throw new Error('Assert null failure.');
         }
      }
   }

   /**
    * 判断内容是否为非空。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param values 内容
    */
   public static debugNotNull(...values: Array<any>): void {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         if (value == null) {
            throw new Error('Assert not null failure.');
         }
      }
   }

   /**
    * 判断内容是否为有效数字。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param values 内容
    */
   public static debugNumber(...values: Array<number>): void {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         if (value == null) {
            throw new Error('Assert value is null.');
         }
         if (isNaN(value)) {
            throw new Error('Assert value is nan invalid.');
         }
         if (!isFinite(value)) {
            throw new Error('Assert value is finite invalid.');
         }
      }
   }

   /**
    * 判断内容是否为空。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param values 内容
    */
   public static debugEmpty(...values: Array<string>): void {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         if ((value != null) && (value.length != 0)) {
            throw new Error('Assert empty failure.');
         }
      }
   }

   /**
    * 判断内容是否为非空。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param values 内容
    */
   public static debugNotEmpty(...values: Array<string>): void {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         if (value == null) {
            throw new Error('Assert not empty failure, value is null.');
         }
         if (value.length == 0) {
            throw new Error('Assert not empty failure, value length is empty.');
         }
      }
   }

   /**
    * 判断数组是否为非空。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param values 内容
    */
   public static debugArrayNotEmpty(values: Array<any>): void {
      if (values == null) {
         throw new Error('Assert array not empty failure, value is null.');
      }
      if (values.length == 0) {
         throw new Error('Assert array not empty failure, value length is empty.');
      }
      for (var name in values) {
         if (values[name] == null) {
            throw new Error('Assert array not empty failure, value item is empty.');
         }
      }
   }

   /**
    * 判断实例是否指定类型。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param instance 实例
    * @param type 类型
    */
   public static debugInstance(instance: any, ...types: Array<Function>): void {
      if (instance == null) {
         throw new Error('Instance is null.');
      }
      var result = false;
      var count = types.length;
      for (var i = 0; i < count; i++) {
         var type = types[i];
         if (instance instanceof type) {
            result = true;
            break;
         }
      }
      if (!result) {
         throw new Error('Instance is invalid type.');
      }
   }

   /**
    * 执行内容。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param owner 拥有者
    * @param message 消息
    */
   public static fatal(owner, message): void {
      throw new Error(owner + ' ' + message);
   }
}
