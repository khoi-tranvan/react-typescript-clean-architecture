import axios from "axios";
import queryString from "query-string";
import { ENV } from "./CONSTANT";
import { LocalStorageService } from "../services/localStorage";
import { setIsLoading } from "../redux/features/app/appSlice";
import { store } from "../redux/store";
// https://lightrains.com/blogs/axios-intercepetors-react/

// control api call
const controller = new AbortController();
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
let numberOfAjaxCallPending = 0;
const { dispatch } = store;

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  timeout: ENV.TIMEOUT,
  cancelToken: source.token,
  signal: controller.signal,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosConfig.interceptors.request.use(
  (config) => {
    // show loader
    dispatch(setIsLoading(true));

    numberOfAjaxCallPending++;
    const token = LocalStorageService.getAccessToken();
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
    numberOfAjaxCallPending--;
    if (numberOfAjaxCallPending === 0) {
      // close loader
      dispatch(setIsLoading(false));
    }
    return response;
  },
  async (error) => {
    numberOfAjaxCallPending--;
    if (numberOfAjaxCallPending === 0) {
      // close loader
      dispatch(setIsLoading(false));
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
            refreshToken: LocalStorageService.getRefreshToken(),
          },
          {
            headers: {
              Authorization: "Bearer " + LocalStorageService.getAccessToken(), //the token is a variable which holds the token
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
