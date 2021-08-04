const curring = (fn: Function) => {
  const exec = (sumArgs: any[]) => {
    //如果当前传入的参数个数小于函数参数的个数,需要返回一个新的函数,并且保留当前函数传入的参数 递归
    return sumArgs.length >= fn.length
      ? fn(...sumArgs)
      : (...args: any[]) => exec([...sumArgs, ...args]);
  };
  return exec([]); //用于收集每次执行时计入的参数,第一次默认为空
};
const isType = (typing: string) => {
  // 回想什么是高阶函数 函数的入参是一个函数,或者这个函数return一个函数
  //这里利用高阶函数 来保存参数(高阶函数其实就是一种闭包 这是我自己的理解)
  return function (val: unknown) {
    return Object.prototype.toString.call(val) === `[object ${typing}]`;
  };
};
export const isString = curring(isType)("String");
export const isNumber = curring(isType)("Number");
export const isArray = curring(isType)("Array");
export const isFunction = curring(isType)("Function");
export const isObject = curring(isType)("Object");

/**
 * 判断值是否为空
 * @param value
 */
export function isEmpty(value: any) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.length === 0) return true;
      break;
    case "boolean":
      if (!value) return true;
      break;
    case "number":
      if (0 === value || isNaN(value)) return true;
      break;
    case "object":
      if (null === value || value.length === 0) return true;
      if (JSON.stringify(value) === "{}") return true;
      break;
  }
  return false;
}
