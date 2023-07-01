import { axiosConfig } from "../../config";

type TimeSleep = {
  time: number;
};

const TestAPI = {
  getModeratorAccess: async () => {
    const API_URL = "/moderator";
    const response = await axiosConfig.get(API_URL);
    return response.data;
  },
  getAdminAccess: async () => {
    const API_URL = "/admin";
    const response = await axiosConfig.get(API_URL);
    return response.data;
  },
  getUserAccess: async () => {
    const API_URL = "/user";
    const response = await axiosConfig.get(API_URL);
    return response.data;
  },
  getPublicAccess: async () => {
    const API_URL = "/all";
    const response = await axiosConfig.get(API_URL);
    return response.data;
  },
  getTimeSleep: async (params: TimeSleep) => {
    const API_URL = "/time-sleep";
    const response = await axiosConfig.get(API_URL, { params });
    return response.data;
  },
};

export default TestAPI;
