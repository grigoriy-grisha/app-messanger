import { makeAutoObservable, toJS } from "mobx";
import { getAction } from "../utils/fetchActions";
import { catchAlerts } from "../utils/catchAlerts";
import { UserInterface } from "../types";

class UsersService {
  users: Array<UserInterface> = [];
  constructor() {
    makeAutoObservable(this);
  }

  @catchAlerts
  async getUsers() {
    const result = await getAction("/user/all");
    this.users = result.users;
  }

  clearUsers() {
    this.users = [];
  }
}

export const usersService = new UsersService();
