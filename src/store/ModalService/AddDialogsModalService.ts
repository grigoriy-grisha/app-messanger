import { makeAutoObservable } from "mobx";

class AddDialogsModalService {
  isOpen: boolean = false;
  currentDialogId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  close = () => (this.isOpen = false);
  open = () => (this.isOpen = true);
  setDialogId = (id: string) => (this.currentDialogId = id);
  removeDialogId = () => (this.currentDialogId = null);
}

export const addDialogsModalService = new AddDialogsModalService();
