import { URLServer } from "constant";
import { storageService } from "store/StorageService";

function setToken(target: any, key: string, descriptor: PropertyDescriptor) {
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

class Http {
  MyHeaders = new Headers();

  constructor() {
    this.MyHeaders.append("Content-Type", "application/json");
  }

  private getUrl(url: string) {
    return URLServer + url;
  }

  @setToken
  async get(url: string) {
    return await fetch(this.getUrl(url), { headers: this.MyHeaders });
  }

  @setToken
  async post(url: string, body = {}) {
    return await fetch(this.getUrl(url), {
      method: "POST",
      headers: this.MyHeaders,
      body: JSON.stringify(body),
    });
  }

  @setToken
  async delete(url: string, body = {}) {
    return await fetch(this.getUrl(url), {
      method: "DELETE",
      headers: this.MyHeaders,
      body: JSON.stringify(body),
    });
  }

  @setToken
  async put(url: string) {
    return await fetch(this.getUrl(url), {
      method: "PUT",
      headers: this.MyHeaders,
      redirect: "follow",
    });
  }
}

export const http = new Http();
