import { makeAutoObservable } from "mobx";
import { catchAlerts } from "utils/catchAlerts";
import { getAction, postAction } from "utils/fetchActions";

import { DialogInterface } from "types";

import { messageService } from "../MessagesService";
import { DialogInfoInterface } from "../../types/DialogInfoTypes";

class DialogsService {
  currentDialogId: string | null = null;
  dialogs: DialogInterface[] = [];
  currentDialog: DialogInterface | null = null;
  linkDialog: string | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  @catchAlerts
  async getDialogs() {
    dialogsService.isLoading = true;
    this.dialogs = await getAction("/dialog/get");
    dialogsService.isLoading = false;
  }

  @catchAlerts
  async getAllDialogs() {
    dialogsService.isLoading = true;
    const result = await getAction("/dialog/all");
    dialogsService.isLoading = false;
    this.dialogs = result.dialogs;
  }

  @catchAlerts
  async userAddInDialog(): Promise<string> {
    return await postAction("/dialog/addUser", {
      dialog: dialogsService.currentDialogId!,
    });
  }

  @catchAlerts
  async getDialogInfo(id: string) {
    messageService.isLoading = true;
    const result: DialogInfoInterface = await getAction(
      "/dialog/getDialog/" + id
    );
    messageService.isLoading = false;
    this.currentDialog = result.dialog;
    return result;
  }

  changeCurrentId(id: string) {
    this.currentDialogId = id;
  }

  clearDialogs() {
    this.dialogs = [];
    this.currentDialog = null;
  }

  setCurrentDialog(id: string) {
    this.currentDialogId = id;
  }
}

export const dialogsService = new DialogsService();
