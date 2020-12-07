import { makeAutoObservable } from "mobx";
import { getAction } from "utils/fetchActions";
import { catchAlertsDecorator } from "utils/decorators/catchAlertsDecorator";

import { storageService } from "./StorageService";
import { UserInterface } from "types";

class UsersService {
  users: UserInterface[] = [];
  currentUserId: null | string = null;
  isLoader = false;
  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private async init() {
    this.currentUserId = await storageService.get("id");
  }

  @catchAlertsDecorator
  async getUsers() {
    this.isLoader = true;
    const result = await getAction("/user/all");
    this.isLoader = false;
    this.users = result.users;
  }

  clearUsers() {
    this.users = [];
  }
}

export const usersService = new UsersService();
