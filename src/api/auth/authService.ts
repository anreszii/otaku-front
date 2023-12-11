import { $apiAuth } from "../../http";

export default class authService {
  static async login(username: string, password: string) {
    return $apiAuth.post("/login", { username, password });
  }
  static async registration(...props: any) {
    return $apiAuth.post("/registration", { ...props }["0"]);
  }
  static async logout() {
    return $apiAuth.post("/logout");
  }
  static async forgotPassword(email: string) {
    return $apiAuth.post("/forgotPassword", { email });
  }
  static async resetPassword(email: string, code: string, newPassword: string) {
    return $apiAuth.post("/resetPassword", { email, code, newPassword });
  }
  static async checkUser(username: string) {
    return $apiAuth.post("/checkUser", { username });
  }
  static async checkAuth() {
    return $apiAuth.get("/refresh");
  }
}
