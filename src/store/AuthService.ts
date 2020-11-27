import { action, observable } from "mobx";
import { http } from "../utils/Http";

class AuthService {
  @observable isAuth: boolean = !!window.localStorage.token;
  @observable token: string = window.localStorage.token;

  @action
  async registerAction(body: object) {
    const response = await http.post("/user/signup", body);
    if (response.ok) return response.json();

    return response;
  }

  @action
  setUserFetchAction(token: string, id: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    this.token = token;
    this.isAuth = true;
  }

  @action
  async loginAction(body: object) {
    const response = await http.post("/user/signin", body);
    if (response.ok) {
      const result: any = await response.json();

      this.setUserFetchAction(result.token, result._id);
      return result;
    }

    return response.json();
  }
}

const authService = new AuthService();
export default authService;
