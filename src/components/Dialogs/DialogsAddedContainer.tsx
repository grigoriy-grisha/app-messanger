import React, { useCallback, useEffect } from "react";
import DialogItem from "./DialogItem";
import arrow from "../../static/img/arrow.svg";
import { observer } from "mobx-react-lite";
import { dialogsService } from "../../store/DialogsService/DialogsService";
import { CenterElement, PreventiveMessage } from "../../App";
import { DialogInterface } from "../../types";
import { DialogsWrapper } from "./index";
import { Loader } from "../Loader";
import { useHistory } from "react-router-dom";
import socket from "../../utils/socket";

export const DialogsAddedContainer = () => {
  const history = useHistory();
  const addDialog = (dialog: DialogInterface) => {
    dialogsService.dialogs.push(dialog);
  };

  useEffect(() => {
    dialogsService.isLoading = true;
    dialogsService.getDialogs().then(() => {
      dialogsService.isLoading = false;
    });
  }, []);

  const onDialogItemClick = useCallback((id: string) => {
    socket.emit("DIALOGS:JOIN", id);
    socket.addEventListener("SERVER:NEW_DIALOG", (dialog: DialogInterface) => {
      console.log(dialog);
      addDialog(dialog);
    });
    history.push(`/dialogs/${id}`);
    dialogsService.currentDialogId = id;
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
      {dialogsService.dialogs.length ? (
        dialogsService.dialogs.map((dialog: DialogInterface) => {
          return (
            <DialogItem
              onDialogItemClick={onDialogItemClick}
              active={dialogsService.currentDialogId == dialog._id}
              key={dialog._id}
              id={dialog._id}
              name={dialog.name}
              users={dialog.users}
              img={arrow}
            />
          );
        })
      ) : (
        <CenterElement>
          <PreventiveMessage>Пока что нет диалогов!</PreventiveMessage>
        </CenterElement>
      )}
    </DialogsWrapper>
  );
};

export default observer(DialogsAddedContainer);
