import React, { useEffect } from "react";
import { DialogSearchItem } from "./DialogSearchItem";
import styled from "styled-components";
import { dialogsService } from "../../store/DialogsService";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { messageService } from "../../store/MessagesService";
import {alertService} from "../../store/AlertService";

const DialogsWrap = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  height: 93%;
`;

interface IProps {}

export const DialogsContainer: React.FC<IProps> = () => {
  const history = useHistory();
  useEffect(() => {
    dialogsService.getDialogs().catch((err) => console.log(err));
  }, []);

  const clickOnDialogItem = (id: string) => {
    messageService
      .getMessagesById(id)
      .then((res) => {
        history.push(`${res.index}`);
        dialogsService.currentId = id;
      })
      .catch((err) => alertService.showAlert(err.message));
  };

  return (
    <DialogsWrap>
      {dialogsService.dialogs.map((dialog: DialogsInterface) => {
        return (
          <DialogSearchItem
            clickOnDialogItem={clickOnDialogItem}
            key={dialog._id}
            id={dialog._id}
            name={dialog.name}
            users={dialog.users}
          />
        );
      })}
    </DialogsWrap>
  );
};

export default React.memo(observer(DialogsContainer));
