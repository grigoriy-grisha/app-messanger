import { URLServer } from "../constant";
import { storageService } from "../store/StorageService";

class Http {
  MyHeaders: Headers;

  constructor() {
    this.MyHeaders = new Headers();
    this.MyHeaders.append("Content-Type", "application/json");
  }

  async get(url: string) {
    await this.getToken();
    return await fetch(URLServer + url, { headers: this.MyHeaders });
  }

  async post(url: string, body = {}) {
    await this.getToken();
    return await fetch(URLServer + url, {
      method: "POST",
      headers: this.MyHeaders,
      body: JSON.stringify(body),
    });
  }

  async delete(url: string, body = {}) {
    await this.getToken();
    return await fetch(URLServer + url, {
      method: "DELETE",
      headers: this.MyHeaders,
      body: JSON.stringify(body),
    });
  }

  async put(url: string) {
    await this.getToken();
    return await fetch(URLServer + url, {
      method: "PUT",
      headers: this.MyHeaders,
      redirect: "follow",
    });
  }

  async getToken() {
    this.MyHeaders.delete("Authorization");
    this.MyHeaders.append(
      "Authorization",
      "Bearer " + (await storageService.get("token"))
    );
  }
}

export const http = new Http();
