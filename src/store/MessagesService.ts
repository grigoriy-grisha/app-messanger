import { makeAutoObservable } from "mobx";
import { http } from "../utils/Http";
import { dialogsService } from "./DialogsService";

class MessagesService {
  messages: Array<any> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getMessagesById(id: string) {
    const response = await http.get(`/message/get/${id}`);
    const result: any = await response.json();
    if (!response.ok) throw new Error(result.message);

    this.messages = result.messages;
    return result;
  }

  async sendMessage(message: string) {
    const postData = {
      text: message,
      dialog: dialogsService.currentId,
    };

    console.log(postData);
    const response = await http.post("/message/add", postData);
    const result: any = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  }
}

export const messageService = new MessagesService();
