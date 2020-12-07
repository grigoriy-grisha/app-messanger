import { TypeMessageEnum } from "./types/typeMessage";

export interface DialogInterface {
  _id: string;
  name: string;
  author: string;
  link: string;
  lastMessage: string;
  protected: boolean;
  date: Date;
  users: UserInterface[];
}

export interface UserInterface {
  _id: string;
  fullname: string;
  dialogs: DialogInterface[];
}

export interface MessageInterface {
  typeMessage: TypeMessageEnum;
  _id: string;
  author: UserInterface;
  text: string;
  dialog: DialogInterface;
  createdAt: Date;
}
