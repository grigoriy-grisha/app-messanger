import { makeAutoObservable } from "mobx";
import { cookie } from "../utils/cookie";

class CookiesService {
  redirect: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  getCookie() {
    this.redirect = !!cookie.get("redirect");
    console.log(this.redirect);
  }

  removeCookie(name: "redirect") {
    cookie.delete(name);
    this.redirect = false;
  }
}

export const cookiesService = new CookiesService();
