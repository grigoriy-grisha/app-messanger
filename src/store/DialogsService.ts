import { makeAutoObservable } from "mobx";
import { http } from "../utils/Http";
import { catchAlerts } from "../utils/catchAlerts";
import { log } from "util";
import { getAction, postAction } from "../utils/fetchActions";

class DialogsService {
  currentId: string | null = null;
  dialogs: DialogsInterface[] = [];
  currentDialog: DialogsInterface | null = null;
  searchDialogsMode: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  @catchAlerts
  async getDialogs() {
    const response = await http.get("/dialog/get");
    const result: any = await response.json();
    if (!response.ok) throw new Error(result.message);
    this.dialogs = result;
  }

  @catchAlerts
  async getAllDialogs() {
    const result = await getAction("/dialog/all");
    this.dialogs = result.dialogs;
  }

  @catchAlerts
  async addDialogs(body: any) {
    await postAction("/redirect", body);
  }

  changeDialogsMode(state: boolean) {
    this.searchDialogsMode = state;
  }

  changeCurrentId(id: string) {
    this.currentId = id;
  }
}

export const dialogsService = new DialogsService();
