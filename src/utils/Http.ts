import { URL } from "../constant";

class Http {
  private readonly MyHeaders: Headers;

  constructor() {
    this.MyHeaders = new Headers();
    this.MyHeaders.append("Content-Type", "application/json");
    this.MyHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.token
    );
  }

  get(url: string) {
    return fetch(URL + url, { headers: this.MyHeaders });
  }

  post(url: string, body = {}) {
    return fetch(URL + url, {
      method: "POST",
      headers: this.MyHeaders,
      body: JSON.stringify(body),
    });
  }

  delete(url: string, body = {}) {
    return fetch(URL + url, {
      method: "DELETE",
      headers: this.MyHeaders,
      body: JSON.stringify(body),
    });
  }

  put(url: string) {
    return fetch(URL + url, {
      method: "PUT",
      headers: this.MyHeaders,
      redirect: "follow",
    });
  }
}

export const http = new Http();
