import { $apiUser } from "../../http";

export default class userService {
  static async userUpdate(id: string, ...props: any) {
    return $apiUser.put(`/userUpdate/${id}`, { ...props }["0"]);
  }
  static async addFavoriteList(id: string, ...props: any) {
    return $apiUser.put(`/addFavorite/${id}`, { ...props }["0"]);
  }
  static async delFavoriteList(id: string, ...props: any) {
    return $apiUser.put(`/delFavorite/${id}`, { ...props }["0"]);
  }
  static async getFavoriteList(id: string) {
    return $apiUser.get(`/getFavorite/${id}`);
  }
  static async getUser(id: string) {
    return $apiUser.get(`/getUser/${id}`);
  }
  static async checkPassword(id: string, password: any) {
    return $apiUser.post(`/checkPassword`, {
      id: id,
      password: password,
    });
  }
}
