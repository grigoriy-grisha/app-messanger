import { makeAutoObservable, toJS } from "mobx";
import { postAction } from "utils/fetchActions";
import { catchAlerts } from "utils/catchAlerts";

class CreateDialogModalService {
  isOpen: boolean = false;
  idUserAwaitingAddition: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  close = () => (this.isOpen = false);
  open = () => (this.isOpen = true);
  addAndRemoveIdUser(id: string) {
    let clone = toJS(this.idUserAwaitingAddition);
    const index = clone.findIndex((item) => id === item);
    if (index === -1) {
      clone.push(id);
    } else {
      clone.splice(index, 1);
    }
    this.idUserAwaitingAddition = clone;
  }

  @catchAlerts
  createDialog(name: string, protect: boolean) {
    const users = this.idUserAwaitingAddition;
    return postAction("/dialog/createDialog", { name, users, protect });
  }
}

export const createDialogModalService = new CreateDialogModalService();
