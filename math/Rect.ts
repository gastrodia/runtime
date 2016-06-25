/**
* 矩形。
*/
export class Rect {
   // 左位置
   public left: number;
   // 上位置
   public top: number;
   // 宽度
   public width: number;
   // 高度
   public height: number;

   /**
   * 构造处理。
   *
   * @param x X坐标
   * @param y Y坐标
   */
   public constructor(left: number = 0, top: number = 0, width: number = 0, height: number = 0) {
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height
   }

   /**
    * 克隆当前数据。
    *
    * @return 矩形
    */
   public clone() {
      return new (this as any).constructor(this.left, this.top, this.width, this.height)
   }

   // goog.math.Rect.prototype.toBox = function() {
   //    return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
   // }
   // ;
   // goog.math.Rect.createFromBox = function(a) {
   //    return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
   // }
   // ;
   // goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
   //    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
   // }
   // );
   // goog.math.Rect.equals = function(a, b) {
   //    return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1
   // }
   // ;
   // goog.math.Rect.prototype.intersection = function(a) {
   //    var b = Math.max(this.left, a.left)
   //       , c = Math.min(this.left + this.width, a.left + a.width);
   //    if (b <= c) {
   //       var d = Math.max(this.top, a.top);
   //       a = Math.min(this.top + this.height, a.top + a.height);
   //       if (d <= a)
   //          return this.left = b,
   //             this.top = d,
   //             this.width = c - b,
   //             this.height = a - d,
   //             !0
   //    }
   //    return !1
   // }
   // ;
   // goog.math.Rect.intersection = function(a, b) {
   //    var c = Math.max(a.left, b.left)
   //       , d = Math.min(a.left + a.width, b.left + b.width);
   //    if (c <= d) {
   //       var e = Math.max(a.top, b.top)
   //          , f = Math.min(a.top + a.height, b.top + b.height);
   //       if (e <= f)
   //          return new goog.math.Rect(c, e, d - c, f - e)
   //    }
   //    return null
   // }
   // ;
   public static intersection(a, b):Rect {
       var c = Math.max(a.left, b.left),
           d = Math.min(a.left + a.width, b.left + b.width);

       if (c <= d) {
          var e = Math.max(a.top, b.top),
              f = Math.min(a.top + a.height, b.top + b.height);

          if (e <= f)
             return new Rect(c, e, d - c, f - e)
       }

       return null
   }

   public static intersects(a, b) {
      return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
   }

   // goog.math.Rect.prototype.intersects = function(a) {
   //    return goog.math.Rect.intersects(this, a)
   // }
   // ;
   // goog.math.Rect.difference = function(a, b) {
   //    var c = goog.math.Rect.intersection(a, b);
   //    if (!c || !c.height || !c.width)
   //       return [a.clone()];
   //    var c = []
   //       , d = a.top
   //       , e = a.height
   //       , f = a.left + a.width
   //       , g = a.top + a.height
   //       , h = b.left + b.width
   //       , m = b.top + b.height;
   //    b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)),
   //       d = b.top,
   //       e -= b.top - a.top);
   //    m < g && (c.push(new goog.math.Rect(a.left, m, a.width, g - m)),
   //       e = m - d);
   //    b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
   //    h < f && c.push(new goog.math.Rect(h, d, f - h, e));
   //    return c
   // }
   // ;
   // goog.math.Rect.prototype.difference = function(a) {
   //    return goog.math.Rect.difference(this, a)
   // }
   // ;
   // goog.math.Rect.prototype.boundingRect = function(a) {
   //    var b = Math.max(this.left + this.width, a.left + a.width)
   //       , c = Math.max(this.top + this.height, a.top + a.height);
   //    this.left = Math.min(this.left, a.left);
   //    this.top = Math.min(this.top, a.top);
   //    this.width = b - this.left;
   //    this.height = c - this.top
   // }
   // ;
   // goog.math.Rect.boundingRect = function(a, b) {
   //    if (!a || !b)
   //       return null;
   //    var c = a.clone();
   //    c.boundingRect(b);
   //    return c
   // }
   // ;
   // goog.math.Rect.prototype.contains = function(a) {
   //    return a instanceof goog.math.Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
   // }
   // ;
   // goog.math.Rect.prototype.squaredDistance = function(a) {
   //    var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
   //    a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
   //    return b * b + a * a
   // }
   // ;
   // goog.math.Rect.prototype.distance = function(a) {
   //    return Math.sqrt(this.squaredDistance(a))
   // }
   // ;
   // goog.math.Rect.prototype.getSize = function() {
   //    return new goog.math.Size(this.width, this.height)
   // }
   // ;
   // goog.math.Rect.prototype.getTopLeft = function() {
   //    return new goog.math.Coordinate(this.left, this.top)
   // }
   // ;
   // goog.math.Rect.prototype.getCenter = function() {
   //    return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2)
   // }
   // ;
   // goog.math.Rect.prototype.getBottomRight = function() {
   //    return new goog.math.Coordinate(this.left + this.width, this.top + this.height)
   // }
   // ;
   // goog.math.Rect.prototype.ceil = function() {
   //    this.left = Math.ceil(this.left);
   //    this.top = Math.ceil(this.top);
   //    this.width = Math.ceil(this.width);
   //    this.height = Math.ceil(this.height);
   //    return this
   // }
   // ;
   // goog.math.Rect.prototype.floor = function() {
   //    this.left = Math.floor(this.left);
   //    this.top = Math.floor(this.top);
   //    this.width = Math.floor(this.width);
   //    this.height = Math.floor(this.height);
   //    return this
   // }
   // ;
   // goog.math.Rect.prototype.round = function() {
   //    this.left = Math.round(this.left);
   //    this.top = Math.round(this.top);
   //    this.width = Math.round(this.width);
   //    this.height = Math.round(this.height);
   //    return this
   // }
   // ;
   // goog.math.Rect.prototype.translate = function(a, b) {
   //    a instanceof goog.math.Coordinate ? (this.left += a.x,
   //       this.top += a.y) : (this.left += a,
   //          goog.isNumber(b) && (this.top += b));
   //    return this
   // }
   // ;
   // goog.math.Rect.prototype.scale = function(a, b) {
   //    var c = goog.isNumber(b) ? b : a;
   //    this.left *= a;
   //    this.width *= a;
   //    this.top *= c;
   //    this.height *= c;
   //    return this
   // }
   // ;
}
