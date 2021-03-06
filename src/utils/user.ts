import { useHttp } from "./http";
import { useAsync } from "../hooks/useAsync";
import { Project } from "../screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { User } from "../screens/project-list/search-panel";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
