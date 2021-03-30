/**
 * 获取类型字符串
 * @param {*} value The value to check
 * @return {String} type string
 */
export function typeOf(value: any): string {
    const typestr = Object.prototype.toString.call(value);
    return typestr.substring(8, typestr.length - 1).toLowerCase();
  }
  
  /**
   * 是否字符串
   * @param    {*}                   value  The value to check.
   * @return   {Boolean}             'true' if the value is Array, else 'false'.
   */
  export function isString(value: any): value is string {
    return typeOf(value) === 'string';
  }
  
  /**
   * 是否是数组
   * @param    {*}                   value  The value to check.
   * @return   {Boolean}             'true' if the value is Array, else 'false'.
   */
  export function isArray(value: any): value is any[] {
    return Array.isArray ? Array.isArray(value) : typeOf(value) === 'array';
  }
  
  /**
   * 是否对象
   * @param    {*}                   value  The value to check.
   * @return   {Boolean}             'true' if the value is Array, else 'false'.
   */
  export function isObject(value: any): value is { [key: string]: any } {
    return typeOf(value) === 'object';
  }
  
  /**
   * 是否NaN
   * @param    {*}                   value  The value to check.
   * @return   {Boolean}             'true' if the value is Array, else 'false'.
   */
  export function isNaN(value: any): value is number {
    return value !== value;
  }
  
  /**
   * 是否数字
   * @param    {*}                   value  The value to check.
   * @return   {Boolean}             'true' if the value is Array, else 'false'.
   */
  export function isNumber(value: any): value is number {
    return typeOf(value) === 'number' && !isNaN(value);
  }
  
  /**
   * 是否布尔类型
   * @param    {*}                   value  The value to check.
   * @return   {Boolean}             'true' if the value is Array, else 'false'.
   */
  export function isBoolean(value: any): boolean {
    return typeOf(value) === 'boolean';
  }
  
  /**
   * 是否函数
   * @param    {*}                   value  The value to check.
   * @return   {Boolean}             'true' if the value is Array, else 'false'.
   */
  export function isFunction(value: any): value is (...args: any[]) => any {
    return typeof value === 'function';
  }
  
  /**
   * 是否是数字或字符串数字
   * @param value
   */
  export function isNumberLike(value: any) {
    return isNumber(value) || isString(value)
      ? String(+value) === String(value)
      : false;
  }
  /**
   * 判断值是否为空
   * @param value
   */
  export function isEmpty(value: any) {
    switch (typeof value) {
      case 'undefined':
        return true;
      case 'string':
        if (value.length === 0) return true;
        break;
      case 'boolean':
        if (!value) return true;
        break;
      case 'number':
        if (0 === value || isNaN(value)) return true;
        break;
      case 'object':
        if (null === value || value.length === 0) return true;
        if (JSON.stringify(value) === '{}') return true;
        break;
    }
    return false;
  }
  