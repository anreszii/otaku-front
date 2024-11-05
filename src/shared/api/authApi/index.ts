import $api from "shared/http";
import {
  ILoginData,
  ILoginResponse,
  IRegisterData,
  IRegisterResponse,
  IResetPasswordData,
  IVerifyResetCodeData,
} from "shared/types";

class AuthApi {
  async login(data: ILoginData) {
    return $api.post<ILoginResponse>("/auth/login", data);
  }

  async register(data: IRegisterData) {
    return $api.post<IRegisterResponse>("/auth/registration", data);
  }

  async sendReset(email: string) {
    return $api.post("/auth/sendReset", { email });
  }

  async resetPassword(data: IResetPasswordData) {
    return $api.post("/auth/reset", data);
  }

  async verifyResetCode(data: IVerifyResetCodeData) {
    return $api.post("/auth/verifyResetCode", data);
  }
}

export const authApi = new AuthApi();
