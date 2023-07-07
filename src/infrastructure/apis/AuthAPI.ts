import { SignInData, SignUpData } from "../../domain/entities/Auth";
import { AuthRepository } from "../../application/repositories/AuthRepository";
import axiosConfig from "../../config/axios";

export class AuthAPI implements AuthRepository {
  async signin(data: SignInData): Promise<any> {
    const API_URL = "/sign-in";
    const response = await axiosConfig.post(API_URL, data);
    return response.data;
  }
  async signup(data: SignUpData): Promise<any> {
    const API_URL = "/sign-up";
    const response = await axiosConfig.post(API_URL, data);
    return response.data;
  }
}
