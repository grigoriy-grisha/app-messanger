import { makeAutoObservable } from "mobx";

class AlertService {
  message: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  showAlert(message: string, ms = 3300) {
    this.message = message;
    setTimeout(() => {
      this.message = "";
    }, ms);
  }
}

export const alertService = new AlertService();
