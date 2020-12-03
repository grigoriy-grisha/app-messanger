import { makeAutoObservable } from "mobx";

class ChangeModeService {
  message: string = "";
  isSearchDialogsMode: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  changeDialogsMode = (state: boolean) => (this.isSearchDialogsMode = state);
}

export const changeModeService = new ChangeModeService();
