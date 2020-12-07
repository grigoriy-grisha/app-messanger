import { makeAutoObservable } from "mobx";
import { storageService } from "./StorageService";
import { catchAlertsDecorator } from "utils/decorators/catchAlertsDecorator";
import { postAction } from "utils/fetchActions";
import { RequestMessageInterface } from "types/RequestMessageInterface";

class AuthService {
  token: string | null = null;
  id: string | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private async init() {
    this.loading = true;
    this.token = await storageService.get("token");
    this.id = await storageService.get("id");
    this.loading = false;
  }

  get isAuth() {
    return !!this.token;
  }

  @catchAlertsDecorator
  async register(body: object) {
    return await postAction("/user/signup", body);
  }

  @catchAlertsDecorator
  async login(body: object) {
    const result = await postAction("/user/signin", body);
    await storageService.set("token", result.token);
    await storageService.set("id", result._id);
    this.token = result.token;
    this.id = result._id;
  }

  @catchAlertsDecorator
  async changePassword(password: string) {
    const result: RequestMessageInterface = await postAction(
      "/user/changePassword",
      { password }
    );
    return result.message;
  }

  logoutAction = async () => {
    await storageService.delete("token");
    await storageService.delete("id");
    this.token = null;
    this.id = null;
  };
}

export const authService = new AuthService();
