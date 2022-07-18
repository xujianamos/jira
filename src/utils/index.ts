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
