import {UnitLengthEnum} from '../../../data/define/UnitLengthEnum';

/**
 * 单位工具。
 */
export class UnitUtil {
   // 长度因子缓冲
   protected static _lengthFactors: any;

   protected static _areaFactors: any;

   /**
    * 获得长度转换因子。
    */
   protected static lengthFactors() {
      var factors = this._lengthFactors;
      if (!factors) {
         factors = this._lengthFactors = new Object();
         // 获得毫米标准因子
         var unitFactors = factors[UnitLengthEnum.millimeter] = new Object();
         unitFactors[UnitLengthEnum.millimeter] = 1;
         unitFactors[UnitLengthEnum.centimeter] = 0.1;
         unitFactors[UnitLengthEnum.feet] = 0.0003048;
         unitFactors[UnitLengthEnum.meter] = 0.001;
         unitFactors[UnitLengthEnum.kilometer] = 0.000001;
         // 获得米标准因子
         var unitFactors = factors[UnitLengthEnum.meter] = new Object();
         unitFactors[UnitLengthEnum.millimeter] = 1000;
         unitFactors[UnitLengthEnum.centimeter] = 100;
         unitFactors[UnitLengthEnum.feet] = 0.3048;
         unitFactors[UnitLengthEnum.meter] = 1;
         unitFactors[UnitLengthEnum.kilometer] = 0.001;
      }
      return factors;
   }

   /**
    * 转换数据单位。
    *
    * @param fromUnitCd 开始单位
    * @param toUnitCd 目标单位
    * @param value 数据内容
    * @return 转换后数据
    */
   public static convert(fromUnitCd: UnitLengthEnum, toUnitCd: UnitLengthEnum, value: number) {
      var factors = this.lengthFactors();
      var unitFactors = factors[fromUnitCd as any];
      var factor = unitFactors[toUnitCd as any];
      return value * factor;
   }
}
