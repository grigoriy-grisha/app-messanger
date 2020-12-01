import { makeAutoObservable } from "mobx";
import { http } from "../utils/Http";
import { dialogsService } from "./DialogsService";
import { catchAlerts } from "../utils/catchAlerts";
import { getAction, postAction } from "../utils/fetchActions";

class MessagesService {
  messages: Array<any> = [];

  constructor() {
    makeAutoObservable(this);
  }

  @catchAlerts
  async getMessagesById(id: string) {
    const result = await getAction(`/message/get/${id}`);
    dialogsService.currentDialog = result.dialog;
    this.messages = result.messages;
    return result;
  }

  @catchAlerts
  async sendMessage(message: string) {
    const postData = {
      text: message,
      dialog: dialogsService.currentId,
    };
    return await postAction("/redirect", postData);
  }
}

export const messageService = new MessagesService();
