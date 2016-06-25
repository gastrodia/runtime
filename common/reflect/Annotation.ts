import {Base} from '../lang/Base';
import {AnnotationEnum} from './AnnotationEnum';
import {Class} from './Class';

//============================================================
// <T>描述类。</T>
//
// @property
// @param name:String 名称
// @author maocy
// @version 150104
//============================================================
export class Annotation extends Base {
   // 类对象
   public clazz: Class;

   // 描述器类型
   protected _annotationCd: AnnotationEnum;

   // 名称
   protected _name: string;

   // 内容
   protected _value: any;

   // 可继承
   protected _inherit: boolean;

   // 可重复
   protected _duplicate: boolean;

   // 可有序
   protected _ordered: boolean;

   //============================================================
   // <T>构造处理。</T>
   //
   // @param name 名称
   //============================================================
   public constructor(name: string) {
      super();
      // 设置属性
      this._name = name;
   }

   //============================================================
   // <T>获得描述类型。</T>
   //
   // @return 描述类型
   //============================================================
   public get annotationCd(): AnnotationEnum {
      return this._annotationCd;
   }

   //============================================================
   // <T>获得名称。</T>
   //
   // @return 名称
   //============================================================
   public get name(): string {
      return this._name;
   }

   //============================================================
   // <T>获得代码。</T>
   //
   // @return 代码
   //============================================================
   public get code(): string {
      return this._name;
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @return 内容
   //==========================================================
   public get value() {
      return this._value;
   }

   //============================================================
   // <T>判断是否允许继承。</T>
   //
   // @return 是否允许继承
   //============================================================
   public isInherit(): boolean {
      return this._inherit;
   }

   //============================================================
   // <T>判断是否允许重复。</T>
   //
   // @return 是否允许重复
   //============================================================
   public isDuplicate(): boolean {
      return this._duplicate;
   }

   //============================================================
   // <T>判断是否允许有序。</T>
   //
   // @return 是否允许有序
   //============================================================
   public isOrdered(): boolean {
      return this._ordered;
   }

   //============================================================
   // <T>接收处理。</T>
   //
   // @param annotation 描述器
   //============================================================
   public assign(annotation: Annotation) {
      this._name = annotation._name;
      this._value = annotation._value;
   }
}
