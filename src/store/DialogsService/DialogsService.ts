import { makeAutoObservable, toJS } from "mobx";
import { catchAlerts } from "../../utils/catchAlerts";
import { getAction, postAction } from "../../utils/fetchActions";
import { DialogInterface } from "../../types";

class DialogsService {
  currentDialogId: string | null = null;
  dialogs: DialogInterface[] = [];
  currentDialog: DialogInterface | null = null;
  linkDialog: string | null = null;
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  @catchAlerts
  async getDialogs() {
    this.dialogs = await getAction("/dialog/get");
  }

  @catchAlerts
  async getAllDialogs() {
    const result = await getAction("/dialog/all");
    this.dialogs = result.dialogs;
  }

  @catchAlerts
  async userAddInDialog(dialogId: object) {
    return await postAction("/dialog/addUser", dialogId);
  }

  @catchAlerts
  async getDialogInfo(id: string) {
    this.currentDialog = await getAction("/dialog/getDialog/" + id);
    console.log(toJS(this.currentDialog));
  }

  changeCurrentId(id: string) {
    this.currentDialogId = id;
  }

  clearDialogs() {
    this.currentDialogId = null;
    this.dialogs = [];
    this.currentDialog = null;
  }
}

export const dialogsService = new DialogsService();
