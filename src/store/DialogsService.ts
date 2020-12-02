import { makeAutoObservable } from "mobx";
import { catchAlerts } from "../utils/catchAlerts";
import { getAction, postAction } from "../utils/fetchActions";

class DialogsService {
  currentDialogId: string | null = null;
  dialogs: DialogsInterface[] = [];
  currentDialog: DialogsInterface | null = null;

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
  }

  changeCurrentId(id: string) {
    this.currentDialogId = id;
  }
}

export const dialogsService = new DialogsService();
