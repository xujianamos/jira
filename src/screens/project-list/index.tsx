import React, { useState, useEffect } from "react";
import * as qs from "qs";

import { cleanObject } from "../../utils";

import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useMount } from "../../hooks/useMount";
import { useDebounce } from "../../hooks/useDebounce";
import { useHttp } from "../../utils/http";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedparam = useDebounce(param, 2000);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedparam) }).then(setList);
  }, [debouncedparam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
