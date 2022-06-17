import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "../context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  //axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常。
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      //  退出登录
      await auth.logout();
      //刷新页面
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

//js中的typeof，是在runtime时运行的
//return typeof 1 === 'number'

// TS中的typeof，是在静态环境运行的
export const useHttp = () => {
  const { user } = useAuth();
  //TODO 讲解TS操作符
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token });
};

//联合类型 |
let myFavoriteNumber: string | number;
myFavoriteNumber = "ss";
myFavoriteNumber = 22;
//TS2322: Type '{}' is not assignable to type 'string | number'.
// myFavoriteNumber={}
let jackFavoriteNumber: string | number;

//类型别名在很多情况下可以和interface互换
// interface Person {
//   name: string;
// }
// type Person={name:string}
// const xiaoMing: Person = { name: "sss" };

// 类型别名,interface在这种情况下没法替代type
type FavoriteNumber = string | number;
let roseFavoriteNumber: FavoriteNumber = "7";

//interface也没法实现utility type
type Person = {
  name: string;
  age: number;
};
const xiaoMing: Partial<Person> = {};
const shenMiRen: Omit<Person, "name" | "age"> = {};
type PersonKeys = keyof Person;

//Partial 的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};
