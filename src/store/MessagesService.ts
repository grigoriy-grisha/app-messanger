import { makeAutoObservable } from "mobx";
import { http } from "../utils/Http";
import { dialogsService } from "./DialogsService";
import { catchAlerts } from "../utils/catchAlerts";
import { getAction, postAction } from "../utils/fetchActions";

class MessagesService {
  messages: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @catchAlerts
  async getMessagesById(id: string) {
    const result = await getAction(`/message/get/${id}`);
    console.log(result);
    this.messages = result.messages;
    return result;
  }

  @catchAlerts
  async sendMessage(message: string) {
    const postData = { text: message };
    return await postAction(
      `/message/${dialogsService.currentDialogId}/add`,
      postData
    );
  }
}

export const messageService = new MessagesService();
