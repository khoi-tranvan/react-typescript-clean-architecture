import axios from "axios";
import queryString from "query-string";
import { ENV } from "./CONSTANTS";
import { UserStorage } from "../storages/UserStorage";
// https://lightrains.com/blogs/axios-intercepetors-react/

// control api call
const controller = new AbortController();
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const userStorage = new UserStorage();

let countFetching = 0;

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  timeout: ENV.TIMEOUT,
  cancelToken: source.token,
  signal: controller.signal,
  paramsSerializer: (params) => queryString.stringify(params),
});

const abortFetching = () => {
  controller.abort();
  window.location.reload();
};

axiosConfig.interceptors.request.use(
  (config) => {
    countFetching++;
    console.log(countFetching);
    if (countFetching === 1) {
      // calling api
      window.addEventListener("popstate", abortFetching);
    }
    const token = userStorage.getAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    countFetching--;
    console.log(countFetching);

    if (countFetching === 0) {
      window.removeEventListener("popstate", abortFetching);
    }
    return response;
  },
  async (error) => {
    countFetching--;
    console.log(countFetching);

    if (countFetching === 0) {
      window.removeEventListener("popstate", abortFetching);
    }
    if (!window.navigator.onLine) {
      window.location.reload();
      return;
    }
    if (error?.response?.status === 401) {
      controller.abort(); // stop other when
      try {
        const response = await axios.post(
          "/auth/refresh",
          {
            refreshToken: userStorage.getRefreshToken(),
          },
          {
            headers: {
              Authorization: "Bearer " + userStorage.getAccessToken(), //the token is a variable which holds the token
            },
            baseURL: process.env.REACT_APP_API_END_POINT,
            timeout: ENV.TIMEOUT,
          }
        );
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data.results));
        window.location.reload();
      } catch (error) {
        window.localStorage.removeItem("user");
        window.location.replace("/");
        return Promise.reject(error);
      }
    } else {
      throw error?.response?.data ? error.response.data : error.response;
    }
  }
);

export default axiosConfig;
