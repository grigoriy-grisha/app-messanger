import { makeAutoObservable } from "mobx";

class DialogInfoService {
  isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  close = () => (this.isOpen = false);
  open = () => (this.isOpen = true);
}

export const dialogInfoService = new DialogInfoService();
