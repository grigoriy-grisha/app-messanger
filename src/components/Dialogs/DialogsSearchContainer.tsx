import React, { useEffect } from "react";
import { DialogItem } from "./DialogItem";
import styled from "styled-components";
import { dialogsService } from "../../store/DialogsService";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import message from "../../static/img/message.svg";

const DialogsWrap = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  height: 93%;
`;

interface DialogsContainerInterface {}

export const DialogsSearchContainer = ({}: DialogsContainerInterface) => {
  const history = useHistory();

  useEffect(() => {
    dialogsService.getAllDialogs().then();
  }, []);

  const clickOnDialogItem = (id: string) => {
    history.push(`${id}`);
    dialogsService.changeCurrentId(id);
  };

  return (
    <DialogsWrap>
      {dialogsService.dialogs.map((dialog: DialogsInterface) => {
        return (
          <DialogItem
            clickOnDialogItem={clickOnDialogItem}
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
