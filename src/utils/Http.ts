import { URLServer } from "../constant";
import { storageService } from "../store/StorageService";

class Http {
  MyHeaders = new Headers();
  static setToken(target: any, key: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = async function (this: Http, ...args: any) {
      this.MyHeaders.delete("Authorization");
      this.MyHeaders.append(
        "Authorization",
        "Bearer " + (await storageService.get("token"))
      );

      return originalMethod.apply(this, args);
    };
  }

  constructor() {
    this.MyHeaders.append("Content-Type", "application/json");
  }

  private getUrl(url: string) {
    return URLServer + url;
  }

  async get(url: string) {
    return await fetch(this.getUrl(url), { headers: this.MyHeaders });
  }

  async post(url: string, body = {}) {
    return await fetch(this.getUrl(url), {
      method: "POST",
      headers: this.MyHeaders,
      body: JSON.stringify(body),
    });
  }

  async delete(url: string, body = {}) {
    return await fetch(this.getUrl(url), {
      method: "DELETE",
      headers: this.MyHeaders,
      body: JSON.stringify(body),
    });
  }

  async put(url: string) {
    return await fetch(this.getUrl(url), {
      method: "PUT",
      headers: this.MyHeaders,
      redirect: "follow",
    });
  }
}

export const http = new Http();
