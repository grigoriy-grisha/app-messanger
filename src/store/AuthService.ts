import { makeAutoObservable } from "mobx";
import { catchAlerts } from "../utils/catchAlerts";
import { storageService } from "./StorageService";
import { postAction } from "../utils/fetchActions";

class AuthService {
  isAuth: boolean = false;
  token: string | null = null;
  id: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    this.token = await storageService.get("token");
    this.isAuth = !!this.token;
    this.id = await storageService.get("id");
  }

  @catchAlerts
  async registerAction(body: object) {
    return await postAction("/user/signup", body);
  }

  @catchAlerts
  async loginAction(body: object) {
    const result = await postAction("/user/signin", body);
    await this.setUserFetchAction(result.token, result._id);
    return result;
  }

  @catchAlerts
  async changePassword(password: string) {
    const result = await postAction("/user/changePassword", { password });
    return result.message;
  }

  async setUserFetchAction(token: string, id: string) {
    await storageService.set("token", token);
    await storageService.set("id", id);
    this.token = token;
    this.id = id;
    this.isAuth = true;
  }

  logoutAction = async () => {
    await this.removeUserAction();
  };

  removeUserAction = async () => {
    await storageService.delete("token");
    await storageService.delete("id");
    this.token = null;
    this.id = null;
    this.isAuth = false;
  };
}

export const authService = new AuthService();
