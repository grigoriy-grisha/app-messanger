import {makeAutoObservable} from "mobx";

class AlertService {
  message: string = ''

  constructor() {
    makeAutoObservable(this);
  }

  showAlert(message: string, ms = 2000) {
    this.message = message
    const timeout = setTimeout(() => {
      this.message = ''
      clearTimeout(timeout)
    }, ms)
  }

}

export const alertService = new AlertService()