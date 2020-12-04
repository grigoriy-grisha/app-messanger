import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import { CenterElement, PreventiveMessage } from "App";

import { dialogsService } from "store/DialogsService/DialogsService";
import Loader from "components/Loader";
import socket from "utils/socket";
import arrow from "static/img/arrow.svg";

import { DialogInterface } from "types";

import DialogItem from "./Item";
import { DialogsWrapper } from "./index";

export const AddedContainer = () => {
  const history = useHistory();

  useEffect(() => {
    dialogsService.getDialogs();
  }, []);

  const onDialogItemClick = useCallback((id: string) => {
    socket.emit("DIALOGS:JOIN", id);

    history.push(`/dialogs/${id}`);
    dialogsService.setCurrentDialog(id);
  }, []);

  if (dialogsService.isLoading)
    return (
      <DialogsWrapper>
        <CenterElement>
          <Loader />
        </CenterElement>
      </DialogsWrapper>
    );

  if (!dialogsService.dialogs.length) {
    return (
      <DialogsWrapper>
        <CenterElement>
          <PreventiveMessage>Пока что нет диалогов!</PreventiveMessage>
        </CenterElement>
      </DialogsWrapper>
    );
  }

  return (
    <DialogsWrapper>
      {dialogsService.dialogs.map((dialog) => {
        return (
          <DialogItem
            key={dialog._id}
            selected={dialogsService.currentDialogId == dialog._id}
            id={dialog._id}
            name={dialog.name}
            users={dialog.users}
            img={arrow}
            onDialogItemClick={onDialogItemClick}
          />
        );
      })}
    </DialogsWrapper>
  );
};

export default React.memo(observer(AddedContainer));
