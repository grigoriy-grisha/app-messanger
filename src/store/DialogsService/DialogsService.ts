import { makeAutoObservable } from "mobx";
import { catchAlertsDecorator } from "utils/decorators/catchAlertsDecorator";
import { getAction, postAction } from "utils/fetchActions";

import { DialogInterface } from "types";
import { DialogInfoInterface } from "types/DialogInfoTypes";

class DialogsService {
  selectedDialogId: string | null = null;
  currentDialogs: DialogInterface[] = [];
  currentDialog: DialogInterface | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  @catchAlertsDecorator
  async getMyDialogs() {
    dialogsService.isLoading = true;
    this.currentDialogs = await getAction("/dialog/get");
    dialogsService.isLoading = false;
  }

  @catchAlertsDecorator
  async getAllDialogs() {
    dialogsService.isLoading = true;
    const result = await getAction("/dialog/all");
    dialogsService.isLoading = false;
    this.currentDialogs = result.dialogs;
  }

  @catchAlertsDecorator
  async addUserInDialog(dialogId: string) {
    await postAction("/dialog/addUser", {
      dialog: dialogId,
    });
  }

  @catchAlertsDecorator
  async createDialog(
    name: string,
    protect: boolean,
    users: string[]
  ): Promise<DialogInterface> {
    return await postAction("/dialog/createDialog", {
      name,
      users,
      protect,
    });
  }

  @catchAlertsDecorator
  async getDialogInfo(id: string) {
    const result: DialogInfoInterface = await getAction(
      "/dialog/getDialog/" + id
    );
    this.currentDialog = result.dialog;
    return result;
  }

  clearDialogs() {
    this.currentDialogs = [];
    this.currentDialog = null;
  }

  get currentDialogId() {
    if (this.currentDialog!) {
      return this.currentDialog!._id;
    }
  }

  setSelectedDialogId(dialogId: string) {
    this.selectedDialogId = dialogId;
  }

  pushDialogToCurrentDialogs(dialog: DialogInterface) {
    this.currentDialogs.push(dialog);
  }
}

export const dialogsService = new DialogsService();
