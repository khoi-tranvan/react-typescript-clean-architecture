import { axiosConfig } from "../../config";

export type SignUpData = {
  username: string;
  fullname: string;
  password: string;
  address: string;
  email: string;
  phonenumber: string;
  dob: string;
  roles: number[];
};

export type SignInData = { username: string; password: string };

const AuthenticationAPI = {
  signIn: async (data: SignInData) => {
    const API_URL = "/sign-in";
    const response = await axiosConfig.post(API_URL, data);
    return response.data;
  },
  signUp: async (data: SignUpData) => {
    const API_URL = "/sign-up";
    const response = await axiosConfig.post(API_URL, data);
    return response.data;
  },
};

export default AuthenticationAPI;
