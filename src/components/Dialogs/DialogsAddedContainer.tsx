import React, { useCallback, useEffect } from "react";
import { DialogItem } from "./DialogItem";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { dialogsService } from "../../store/DialogsService";
import { CenterElement, PreventiveMessage } from "../../App";
import arrow from "../../static/img/arrow.svg";
import socket from "../../utils/socket";

const DialogsWrapper = styled.div`
  overflow-y: scroll;
  position: relative;
  max-height: 100%;
  height: 93%;
`;

export const DialogsAddedContainer = () => {
  const history = useHistory();

  const addDialog = (dialog: any) => {
    dialogsService.dialogs.push(dialog);
    history.push("/" + dialog._id);
  };

  useEffect(() => {
    dialogsService.getDialogs();
    socket.on("SERVER:DIALOG_CREATED", ({ dialog }: any) => {
      addDialog(dialog);
    });
    return () => {
      socket.off("SERVER:DIALOG_CREATED", ({ dialog }: any) => {
        addDialog(dialog);
      });
    };
  }, []);

  const onDialogItemClick = useCallback((id: string) => {
    history.push(`${id}`);
  }, []);

  return (
    <DialogsWrapper>
      {dialogsService.dialogs.length ? (
        dialogsService.dialogs.map((dialog: DialogsInterface) => {
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

export default React.memo(observer(DialogsAddedContainer));
