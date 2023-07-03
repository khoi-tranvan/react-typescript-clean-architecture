import { UserToken } from "../../domain/entities/User";

export interface UserStorageRepository {
  getUserInfo(): UserToken | null;
  setUserInfo(user: UserToken): void;
  removeUserInfo(): void;
  getUserRoles(): string[];
  getAccessToken(): string;
  getRefreshToken(): string;
}
