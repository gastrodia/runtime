/**
 * 插值器。
 */
export class Interpolant {

   public parameterPositions;
   public _cachedIndex;
   public resultBuffer;
   public sampleValues;
   public valueSize;
   public settings = null;
   public DefaultSettings_ = {};

   public constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
      this.parameterPositions = parameterPositions;
      this._cachedIndex = 0;
      this.resultBuffer = resultBuffer !== undefined ? resultBuffer : new sampleValues.constructor(sampleSize);
      this.sampleValues = sampleValues;
      this.valueSize = sampleSize;
   }

   public evaluate(t) {
      var pp = this.parameterPositions,
         i1 = this._cachedIndex,
         t1 = pp[i1],
         t0 = pp[i1 - 1];
      validate_interval: {
         seek: {
            var right;
            linear_scan: {
               forward_scan: if (!(t < t1)) {
                  for (var giveUpAt: any = i1 + 2; ;) {
                     if (t1 === undefined) {
                        if (t < t0) break forward_scan;
                        i1 = pp.length;
                        this._cachedIndex = i1;
                        return this.afterEnd_(i1 - 1, t, t0);
                     }
                     if (i1 === giveUpAt)
                        break;
                     t0 = t1;
                     t1 = pp[++i1];
                     if (t < t1) {
                        break seek;
                     }
                  }
                  right = pp.length;
                  break linear_scan;
               }
               if (!(t >= t0)) {
                  var t1global = pp[1];
                  if (t < t1global) {
                     i1 = 2;
                     t0 = t1global;
                  }
                  for (var giveUpAt: any = i1 - 2; ;) {
                     if (t0 === undefined) {
                        this._cachedIndex = 0;
                        return this.beforeStart_(0, t, t1);
                     }
                     if (i1 === giveUpAt)
                        break;
                     t1 = t0;
                     t0 = pp[--i1 - 1];
                     if (t >= t0) {
                        break seek;
                     }
                  }
                  right = i1;
                  i1 = 0;
                  break linear_scan;
               }
               break validate_interval;
            }
            while (i1 < right) {
               var mid = (i1 + right) >>> 1;
               if (t < pp[mid]) {
                  right = mid;
               } else {
                  i1 = mid + 1;
               }
            }
            t1 = pp[i1];
            t0 = pp[i1 - 1];
            // check boundary cases, again
            if (t0 === undefined) {
               this._cachedIndex = 0;
               return this.beforeStart_(0, t, t1);
            }
            if (t1 === undefined) {
               i1 = pp.length;
               this._cachedIndex = i1;
               return this.afterEnd_(i1 - 1, t0, t);
            }
         } // seek
         this._cachedIndex = i1;
         this.intervalChanged_(i1, t0, t1);
      } // validate_interval
      return this.interpolate_(i1, t0, t, t1);
   }

   public getSettings_() {
      return this.settings || this.DefaultSettings_;
   }

   public copySampleValue_(index) {
      // copies a sample value to the result buffer
      var result = this.resultBuffer,
         values = this.sampleValues,
         stride = this.valueSize,
         offset = index * stride;
      for (var i = 0; i !== stride; ++i) {
         result[i] = values[offset + i];
      }
      return result;
   }

   // Template methods for derived classes:
   public interpolate_(i1, t0, t, t1) {
      throw new Error("call to abstract method");
      // implementations shall return this.resultBuffer
   }

   public intervalChanged_(i1, t0, t1) {
      // empty
   }

   public beforeStart_: any = this.copySampleValue_;
   public afterEnd_: any = this.copySampleValue_;
}
