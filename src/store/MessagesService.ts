import { makeAutoObservable } from "mobx";
import { catchAlertsDecorator } from "utils/decorators/catchAlertsDecorator";
import { getAction, postAction } from "utils/fetchActions";
import { MessageInterface } from "types";

import { dialogsService } from "./DialogsService/DialogsService";

interface ResultMessageInterface {
  messages: MessageInterface[];
  message: string;
}

class MessagesService {
  messages: MessageInterface[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  @catchAlertsDecorator
  async getMessagesByDialogId(dialogId: string) {
    this.isLoading = true;
    const result: ResultMessageInterface = await getAction(
      `/message/get/${dialogId}`
    );
    this.isLoading = false;
    this.messages = result.messages;
  }

  @catchAlertsDecorator
  async sendMessage(message: string) {
    await postAction(`/message/${dialogsService.currentDialogId}/add`, {
      text: message,
    });
  }

  clearMessages() {
    this.messages = [];
  }
}

export const messageService = new MessagesService();
