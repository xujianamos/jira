import { useEffect } from "react";
//TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
