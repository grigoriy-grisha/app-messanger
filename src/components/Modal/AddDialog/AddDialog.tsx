import { Wrap } from "../CreateDialog/CreateDialog";
import React from "react";
import styled from "styled-components";
import { PreventiveMessage } from "../../../App";
import { observer } from "mobx-react-lite";
import { addDialogsModalService } from "../../../store/ModalService/AddDialogsModalService";
import { dialogsService } from "../../../store/DialogsService";
import { useHistory } from "react-router-dom";
import { listModeService } from "../../../store/DialogsService/ListModeService";

const AddDialogBlock = styled.div`
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
  background: #fff;
  opacity: 1;
  width: 300px;
  height: 150px;
  text-align: center;
`;

const ButtonsBlock = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-around;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const YesButton = styled(Button)`
  background: #4ca5ff;
  padding: 15px;
  width: 50px;
  height: 25px;
`;

const NoButton = styled(Button)`
  padding: 15px;
  width: 70px;
  height: 25px;
  color: #666666;
`;

export const AddDialog = observer(() => {
  const history = useHistory();

  if (!addDialogsModalService.isOpen) return null;

  const onAcceptButtonClick = () => {
    const postData = {
      dialog: addDialogsModalService.currentDialogId,
    };
    dialogsService.userAddInDialog(postData).then((res) => {
      if (res) {
        addDialogsModalService.close();
        addDialogsModalService.removeDialogId();
        listModeService.changeDialogsMode(false);
        history.push("/" + res);
      } else {
        addDialogsModalService.close();
        addDialogsModalService.removeDialogId();
        history.push("/");
      }
    });
  };

  const onCancelButtonCLick = () => {
    addDialogsModalService.close();
    addDialogsModalService.removeDialogId();
  };

  return (
    <Wrap>
      <AddDialogBlock>
        <PreventiveMessage>Хотите Добавиться в чат?</PreventiveMessage>
        <ButtonsBlock>
          <YesButton onClick={onAcceptButtonClick}>Да</YesButton>
          <NoButton onClick={onCancelButtonCLick}>Отмена</NoButton>
        </ButtonsBlock>
      </AddDialogBlock>
    </Wrap>
  );
});
