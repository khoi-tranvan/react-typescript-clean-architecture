import { SignInData, SignUpData } from "../../domain/entities/Auth";
import { AuthRepository } from "../repositories/AuthRepository";

export class AuthUseCase {
  private authRepo: AuthRepository;

  constructor(authenRepo: AuthRepository) {
    this.authRepo = authenRepo;
  }

  async signin(data: SignInData): Promise<any> {
    return this.authRepo.signin(data);
  }
  async signup(data: SignUpData): Promise<any> {
    return this.authRepo.signup(data);
  }
}

export interface AuthUseCaseInterface {
  signin(data: SignInData): Promise<any>;
  signup(data: SignUpData): Promise<any>;
}
