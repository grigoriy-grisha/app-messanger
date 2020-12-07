import { makeAutoObservable } from "mobx";
import { SearchDialogsModeEnum } from "types/SearchDialogsModeType";

class ChangeModeService {
  selectedDialogMode: SearchDialogsModeEnum = SearchDialogsModeEnum.MY_DIALOGS;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSearchDialogsMode = (mode: SearchDialogsModeEnum) => {
    this.selectedDialogMode = mode;
  };
}

export const changeModeService = new ChangeModeService();
