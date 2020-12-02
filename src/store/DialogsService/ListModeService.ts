import { makeAutoObservable } from "mobx";

class ListModeService {
  message: string = "";
  isSearchDialogsMode: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  changeDialogsMode(state: boolean) {
    this.isSearchDialogsMode = state;
  }
}

export const listModeService = new ListModeService();
