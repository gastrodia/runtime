export var Type = Function;

/**
 * Runtime representation a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 */
export interface Type extends Function { }


export function isFunction(obj: any): boolean {
  return typeof obj === "function";
}

export function isType(obj: any): boolean {
  return isFunction(obj);
}

export function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

export function normalizeBool(obj: boolean): boolean {
  return isBlank(obj) ? false : obj;
}

export function stringify(token): string {
  if (typeof token === 'string') {
    return token;
  }

  if (token === undefined || token === null) {
    return '' + token;
  }

  if (token.name) {
    return token.name;
  }
  if (token.overriddenName) {
    return token.overriddenName;
  }

  var res = token.toString();
  var newLineIndex = res.indexOf("\n");
  return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}

/**
 * 判断是否是数字
 */
export function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
