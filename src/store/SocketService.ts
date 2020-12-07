// @ts-ignore
import { messageService } from "./MessagesService";
// @ts-ignore
import { MessageInterface } from "../types";
import io from "socket.io-client";
import { URLServer } from "../constant";

class SocketIoService {
  socket = io(URLServer);

  addMessage = ({ message }: { message: MessageInterface }) => {
    messageService.messages.push(message);
  };

  subscribeToNewMessage() {
    this.socket.addEventListener("SERVER:NEW_MESSAGE", this.addMessage);
    return () => {
      this.socket.removeListener("SERVER:NEW_MESSAGE", this.addMessage);
    };
  }

  joinToDialog(dialogId: string) {
    this.socket.emit("DIALOGS:JOIN", dialogId);
  }
}

export const socketIoService = new SocketIoService();
