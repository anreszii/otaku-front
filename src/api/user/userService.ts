import { $apiUser } from "../../http";

export default class userService {
  static async userUpdate(id: string, ...props: any) {
    return $apiUser.put(`/userUpdate/${id}`, { ...props }["0"]);
  }
}
