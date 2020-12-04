import { makeAutoObservable } from "mobx";
import { getAction } from "utils/fetchActions";
import { catchAlerts } from "utils/catchAlerts";

import { storageService } from "./StorageService";
import { UserInterface } from "types";

class UsersService {
  users: Array<UserInterface> = [];
  currentUserId: null | string = null;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    this.currentUserId = await storageService.get("id");
  }

  @catchAlerts
  async getUsers() {
    const result = await getAction("/user/all");
    this.users = result.users;
  }

  clearUsers() {
    this.users = [];
  }

  setUser(id: string) {
    this.currentUserId = id;
  }
}

export const usersService = new UsersService();
