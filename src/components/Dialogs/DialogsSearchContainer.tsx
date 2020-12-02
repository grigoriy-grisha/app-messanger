import React, { useCallback, useEffect } from "react";
import { DialogItem } from "./DialogItem";
import styled from "styled-components";
import { dialogsService } from "../../store/DialogsService";
import { observer } from "mobx-react-lite";
import message from "../../static/img/message.svg";

// @ts-ignore
import { addDialogsModalService } from "../../store/ModalService/AddDialogsModalService";

const DialogsWrap = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  height: 93%;
`;

const DialogsSearchContainer = () => {
  useEffect(() => {
    dialogsService.getAllDialogs();
  }, []);

  const onDialogItemClick = useCallback((id: string) => {
    addDialogsModalService.setDialogId(id);
    addDialogsModalService.open();
  }, []);

  return (
    <DialogsWrap>
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
    </DialogsWrap>
  );
};

export default React.memo(observer(DialogsSearchContainer));
