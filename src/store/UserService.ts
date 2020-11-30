import { makeAutoObservable } from "mobx";

class UserService {
  dialogs: DialogsInterface[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  getDialogs() {}
}
