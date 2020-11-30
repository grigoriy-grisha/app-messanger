import { makeAutoObservable } from "mobx";
import { http } from "../utils/Http";

class AuthService {
  isAuth: boolean = !!window.localStorage.token;
  token: string = window.localStorage.token;
  id: string = window.localStorage.id;

  constructor() {
    makeAutoObservable(this);
  }

  async registerAction(body: object) {
    const response = await http.post("/user/signup", body);
    const result = await response.json();
    if (response.ok) return result;

    throw new Error(result.message);
  }

  async setUserFetchAction(token: string, id: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    this.token = token;
    this.id = id;
    this.isAuth = true;
  }

  async loginAction(body: object) {
    const response = await http.post("/user/signin", body);
    const result: any = await response.json();
    if (!response.ok) throw new Error(result.message);

    await this.setUserFetchAction(result.token, result._id);
    return result;
  }
}

export const authService = new AuthService();
