import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import DialogItem from "./DialogItem";
import Loader from "../Loader";
import { CenterElement, PreventiveMessage } from "App";
import { DialogsWrapper } from "./index";

import { DialogInterface } from "types";

import { dialogsService } from "store/DialogsService/DialogsService";
import socket from "utils/socket";
import arrow from "static/img/arrow.svg";

export const DialogsAddedContainer = () => {
  const history = useHistory();

  useEffect(() => {
    dialogsService.isLoading = true;
    dialogsService.getDialogs().then(() => {
      dialogsService.isLoading = false;
    });
  }, []);

  const onDialogItemClick = useCallback((id: string) => {
    socket.emit("DIALOGS:JOIN", id);

    history.push(`/dialogs/${id}`);
    dialogsService.currentDialogId = id;

    return () => {
      socket.removeAllListeners();
    };
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
