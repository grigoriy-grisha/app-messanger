import React, { useCallback } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { PreventiveMessage } from "App";
import { changeModeService } from "store/DialogsService/ChangeModeService";

import { dialogsService } from "store/DialogsService/DialogsService";

import Modal, { Wrapper } from "../Modal";

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

interface AddDialogInterface {
  toggleOpenModal: (state: boolean) => void;
}

const AddDialog = ({ toggleOpenModal }: AddDialogInterface) => {
  const history = useHistory();

  async function addUserInDialog() {
    const dialogId = await dialogsService.userAddInDialog();

    toggleOpenModal(false);
    if (!dialogId) return history.push("/dialogs/");

    changeModeService.changeDialogsMode(false);
    history.push("/dialogs/" + dialogId);
  }

  const onAcceptButtonClick = useCallback(addUserInDialog, []);

  const onCloseModalCLick = useCallback(() => {
    toggleOpenModal(false);
  }, []);

  return (
    <Modal>
      <Wrapper>
        <AddDialogBlock>
          <PreventiveMessage>Хотите Добавиться в чат?</PreventiveMessage>
          <ButtonsBlock>
            <YesButton onClick={onAcceptButtonClick}>Да</YesButton>
            <NoButton onClick={onCloseModalCLick}>Отмена</NoButton>
          </ButtonsBlock>
        </AddDialogBlock>
      </Wrapper>
    </Modal>
  );
};

export default AddDialog;
