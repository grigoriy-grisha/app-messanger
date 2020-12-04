import { makeAutoObservable } from "mobx";

class ChangeModeService {
  isSearchDialogsMode: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  toggleSearchDialogsMode = (state: boolean) =>
    (this.isSearchDialogsMode = state);
}

export const changeModeService = new ChangeModeService();
