import { makeAutoObservable } from "mobx";
import { dialogsService } from "./DialogsService/DialogsService";
import { catchAlerts } from "../utils/catchAlerts";
import { getAction, postAction } from "../utils/fetchActions";
import { MessageInterface } from "../types";

class MessagesService {
  messages: MessageInterface[] = [];
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  @catchAlerts
  async getMessagesById(id: string) {
    const result = await getAction(`/message/get/${id}`);
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

  clearMessages() {
    this.messages = [];
  }
}

export const messageService = new MessagesService();
