import { makeAutoObservable } from "mobx";

class StorageService {
  constructor() {
    makeAutoObservable(this);
  }

  async get(key: string) {
    return localStorage.getItem(key);
  }

  async set(key: string, data: string) {
    return localStorage.setItem(key, data);
  }

  async delete(key: string) {
    return localStorage.removeItem(key);
  }
}

export const storageService = new StorageService();
