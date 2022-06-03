//排除value值为0的情况
export const isFalsy = (value) => (value === 0 ? false : !value);
//清理对象中的空值
export const cleanObject = (object) => {
  // Object.assign({},object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
