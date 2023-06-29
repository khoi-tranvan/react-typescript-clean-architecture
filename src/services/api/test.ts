import { axiosConfig } from "../../config";

const TestAPI = {
  getModeratorAccess: async () => {
    const API_URL = "/moderator";
    return await axiosConfig.get(API_URL);
  },
  getAdminAccess: async () => {
    const API_URL = "/admin";
    return await axiosConfig.get(API_URL);
  },
  getUserAccess: async () => {
    const API_URL = "/user";
    return await axiosConfig.get(API_URL);
  },
  getPublicAccess: async () => {
    const API_URL = "/all";
    return await axiosConfig.get(API_URL);
  },
};

export default TestAPI;
