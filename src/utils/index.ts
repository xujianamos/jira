//排除value值为0的情况
import exp from "constants";
import { useEffect } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === "";
let a: object;
a = { name: "jack" };
a = () => {};
a = new RegExp("");

let b: { [key: string]: unknown };
b = { name: "jack" };
//要报错，不能等于函数
// b=()=>{}

//清理对象中的空值
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({},object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

//重置路由
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[]) => {
  const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K));
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
