import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Modal, { Wrapper } from "components/Modal";
import { PreventiveMessage } from "components/StyleComponents/GlobalStyleComponents";

import { changeModeService } from "store/DialogsService/ChangeModeService";
import { dialogsService } from "store/DialogsService/DialogsService";
import { SearchDialogsModeEnum } from "../../types/SearchDialogsModeType";

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
  selectedDialogId: string | null;
  onCloseModal: () => void;
}

const AddToDialog = ({
  onCloseModal,
  selectedDialogId,
}: AddDialogInterface) => {
  const history = useHistory();

  const onAcceptButtonClick = useCallback(
    async function () {
      await dialogsService.addUserInDialog(selectedDialogId!);
      onCloseModal();
      changeModeService.toggleSearchDialogsMode(
        SearchDialogsModeEnum.MY_DIALOGS
      );
      history.push("/dialogs/" + selectedDialogId);
    },
    [history, onCloseModal, selectedDialogId]
  );

  return (
    <Modal>
      <Wrapper>
        <AddDialogBlock>
          <PreventiveMessage>Хотите Добавиться в чат?</PreventiveMessage>
          <ButtonsBlock>
            <YesButton onClick={onAcceptButtonClick}>Да</YesButton>
            <NoButton onClick={onCloseModal}>Отмена</NoButton>
          </ButtonsBlock>
        </AddDialogBlock>
      </Wrapper>
    </Modal>
  );
};

export default React.memo(AddToDialog);
