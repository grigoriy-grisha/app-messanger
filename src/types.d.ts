interface DialogsInterface {
  _id: string;
  name: string;
  author: string;
  link: string;
  lastMessage: string;
  protected: boolean;
  users: UsersInterface[];
}

interface UsersInterface {
  _id: string;
  fullname: string;
  dialogs: DialogsInterface[];
}
