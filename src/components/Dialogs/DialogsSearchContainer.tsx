import React, { useCallback, useEffect } from "react";
import DialogItem from "./DialogItem";

import { dialogsService } from "../../store/DialogsService/DialogsService";
import { observer } from "mobx-react-lite";
import message from "../../static/img/message.svg";
import { addDialogsModalService } from "../../store/ModalService/AddDialogsModalService";
import { DialogsWrapper } from "./index";
import { CenterElement } from "../../App";
import { Loader } from "../Loader";

const DialogsSearchContainer = () => {
  useEffect(() => {
    dialogsService.isLoading = true;
    dialogsService.getAllDialogs().then(() => {
      dialogsService.isLoading = false;
    });
  }, []);
  const onDialogItemClick = useCallback((id: string) => {
    addDialogsModalService.setDialogId(id);
    addDialogsModalService.open();
  }, []);

  if (dialogsService.isLoading)
    return (
      <DialogsWrapper>
        <CenterElement>
          <Loader />
        </CenterElement>
      </DialogsWrapper>
    );

  return (
    <DialogsWrapper>
      {dialogsService.dialogs.map((dialog) => {
        return (
          <DialogItem
            onDialogItemClick={onDialogItemClick}
            key={dialog._id}
            id={dialog._id}
            name={dialog.name}
            users={dialog.users}
            img={message}
          />
        );
      })}
    </DialogsWrapper>
  );
};

export default observer(DialogsSearchContainer);
