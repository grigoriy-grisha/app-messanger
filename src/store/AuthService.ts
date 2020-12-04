import { makeAutoObservable } from "mobx";
import { storageService } from "./StorageService";
import { catchAlerts } from "utils/catchAlerts";
import { postAction } from "utils/fetchActions";

class AuthService {
  token: string | null = null;
  id: string | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    this.loading = true;
    this.token = await storageService.get("token");
    this.id = await storageService.get("id");
    this.loading = false;
  }

  get isAuth() {
    return !!this.token;
  }

  @catchAlerts
  async registerAction(body: object) {
    return await postAction("/user/signup", body);
  }

  @catchAlerts
  async loginAction(body: object) {
    const result = await postAction("/user/signin", body);
    await this.setAuthDataAction(result.token, result._id);
    return result;
  }

  @catchAlerts
  async changePassword(password: string) {
    const result = await postAction("/user/ChangePassword", { password });
    return result.message;
  }

  async setAuthDataAction(token: string, id: string) {
    await storageService.set("token", token);
    await storageService.set("id", id);
    this.token = token;
    this.id = id;
  }

  logoutAction = async () => {
    await this.removeAuthDataAction();
  };

  removeAuthDataAction = async () => {
    await storageService.delete("token");
    await storageService.delete("id");
    this.token = null;
    this.id = null;
  };
}

export const authService = new AuthService();
