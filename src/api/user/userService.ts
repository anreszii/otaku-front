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
}
