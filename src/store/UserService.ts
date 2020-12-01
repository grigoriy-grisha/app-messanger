import { makeAutoObservable } from "mobx";
import { getAction } from "../utils/fetchActions";
import { catchAlerts } from "../utils/catchAlerts";

class UserService {
  users: Array<UsersInterface> = [];
  constructor() {
    makeAutoObservable(this);
  }

  @catchAlerts
  async getUsers() {
    const result = await getAction("/user/all");
    this.users = result;
  }
}

export const userService = new UserService();
