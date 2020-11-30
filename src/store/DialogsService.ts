import { makeAutoObservable } from "mobx";
import { http } from "../utils/Http";

class DialogsService {
  currentId: string | null = null;
  dialogs: DialogsInterface[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  async getDialogs() {
    const response = await http.get("/dialog/get");
    const result: any = await response.json();
    console.log(result.dialogs);
    if (!response.ok) throw new Error(result.message);

    this.dialogs = result.dialogs;
  }

  async getAllDialogs() {
    const response = await http.get("/dialog/all");
    const result: any = await response.json();
    console.log(result.dialogs);
    if (!response.ok) throw new Error(result.message);

    this.dialogs = result.dialogs;
  }
}

export const dialogsService = new DialogsService();
