//===========================================================
// <T>按键代码枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
export class KeyCodeEnum {
   // @attribute Integer
   public static None = 0;
   // @attribute Integer 定义Esc按键
   public static Esc = 27;
   // @attribute Integer 定义Tab按键
   public static Tab = 9;
   // @attribute Integer 定义Enter按键
   public static Enter = 13;
   // @attribute Integer 定义Shift按键
   public static Shift = 16;
   // @attribute Integer 定义Alt按键
   public static Alt = 18;
   // @attribute Integer 定义Ctrl按键
   public static Ctrl = 17;
   // @attribute Integer 定义BackSpace按键
   public static BackSpace = 8;
   // @attribute Integer 定义空格按键
   public static Space = 32;
   // @attribute Integer 方向按键
   public static Left = 37;
   public static Up = 38;
   public static Right = 39;
   public static Down = 40;
   // @attribute Integer 定义Insert按键
   public static Insert = 45;
   // @attribute Integer 定义Delete按键
   public static Delete = 46;
   // @attribute Integer 定义Home按键
   public static Home = 36;
   // @attribute Integer 定义End按键
   public static End = 35;
   // @attribute Integer 定义PageUp按键
   public static PageUp = 33;
   // @attribute Integer 定义PageDown按键
   public static PageDown = 34;
   // @attribute Integer 定义F1~F12按键
   public static F1 = 112;
   public static F2 = 113;
   public static F3 = 114;
   public static F4 = 115;
   public static F5 = 116;
   public static F6 = 117;
   public static F7 = 118;
   public static F8 = 119;
   public static F9 = 120;
   public static F10 = 121;
   public static F11 = 122;
   public static F12 = 123;
   // @attribute Integer 定义0~9按键
   public static N0 = 48;
   public static N1 = 49;
   public static N2 = 50;
   public static N3 = 51;
   public static N4 = 52;
   public static N5 = 53;
   public static N6 = 54;
   public static N7 = 55;
   public static N8 = 56;
   public static N9 = 57;
   // @attribute Integer 定义A~Z按键
   public static A = 65;
   public static B = 66;
   public static C = 67;
   public static D = 68;
   public static E = 69;
   public static F = 70;
   public static G = 71;
   public static H = 72;
   public static I = 73;
   public static J = 74;
   public static K = 75;
   public static L = 76;
   public static M = 77;
   public static N = 78;
   public static O = 79;
   public static P = 80;
   public static Q = 81;
   public static R = 82;
   public static S = 83;
   public static T = 84;
   public static U = 85;
   public static V = 86;
   public static W = 87;
   public static X = 88;
   public static Y = 89;
   public static Z = 90;

   public static NUM_ZERO = 96;
   public static NUM_ONE = 97;
   public static NUM_TWO = 98;
   public static NUM_THREE = 99;
   public static NUM_FOUR = 100;
   public static NUM_FIVE = 101;
   public static NUM_SIX = 102;
   public static NUM_SEVEN = 103;
   public static NUM_EIGHT = 104;
   public static NUM_NINE = 105;
   public static NUM_MULTIPLY = 106;
   public static NUM_PLUS = 107;
   public static NUM_MINUS = 109;
   public static NUM_PERIOD = 110;
   public static NUM_DIVISION = 111;

   public static FF_SEMICOLON = 59;
   public static FF_EQUALS = 61;
   public static QUESTION_MARK = 63;
   public static SEMICOLON = 186;
   public static DASH = 189;
   public static EQUALS = 187;
   public static COMMA = 188;
   public static PERIOD = 190;
   public static SLASH = 191;
   public static APOSTROPHE = 192;
   public static TILDE = 192;
   public static SINGLE_QUOTE = 222;
   public static OPEN_SQUARE_BRACKET = 219;
   public static BACKSLASH = 220;
   public static CLOSE_SQUARE_BRACKET = 221;
   public static WIN_KEY = 224;
   public static MAC_FF_META = 224;
   public static MAC_WK_CMD_LEFT = 91;
   public static MAC_WK_CMD_RIGHT = 93;
   public static WIN_IME = 229;
   public static VK_NONAME = 252;
   public static PHANTOM = 255;

   //..........................................................
   // @attribute 控制按键
   //o.ControlKeys = [
   //   o.Tab, o.Enter, o.BackSpace, o.Left, o.Up, o.Right, o.Down,
   //   o.Insert, o.Delete, o.Home, o.End, o.PageUp, o.PageDown,
   //   o.F1, o.F2, o.F3, o.F4, o.F5, o.F6, o.F7, o.F8, o.F9, o.F10, o.F11, o.F12];
   //..........................................................
   // @attribute 整数按键
   //var f = o.integerCodes  = new Object();
   // 减号(-)
   //f[45] = true;
   //f[190] = true;
   // 数字键
   //for(var n = o.N0; n <= o.N9; n++){
   //   f[n] = true;
   //}
   //..........................................................
   // @attribute 浮点数按键
   //var f = o.floatCodes  = new Object();
   // 减号(-)
   //f[45] = true;
   //f[190] = true;
   // 小数点(.)
   //f[46] = true;
   //f[189] = true;
   // 数字键
   //for(var n = o.N0; n <= o.N9; n++){
   //   f[n] = true;
   //}

   public static isCharacterKey(keyCode: number): boolean {
      if (keyCode >= this.N0 && keyCode <= this.N9 || keyCode >= this.NUM_ZERO && keyCode <= this.NUM_MULTIPLY || keyCode >= this.A && keyCode <= this.Z) {
         return true;
      }
      switch (keyCode) {
         case this.Space:
         case this.QUESTION_MARK:
         case this.NUM_PLUS:
         case this.NUM_MINUS:
         case this.NUM_PERIOD:
         case this.NUM_DIVISION:
         case this.SEMICOLON:
         case this.FF_SEMICOLON:
         case this.DASH:
         case this.EQUALS:
         case this.FF_EQUALS:
         case this.COMMA:
         case this.PERIOD:
         case this.SLASH:
         case this.APOSTROPHE:
         case this.SINGLE_QUOTE:
         case this.OPEN_SQUARE_BRACKET:
         case this.BACKSLASH:
         case this.CLOSE_SQUARE_BRACKET:
            return true;
         default:
            return false;
      }
   }
}
