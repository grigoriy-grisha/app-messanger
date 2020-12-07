import React, { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { alertService } from "store/AlertService";
import { dialogsService } from "store/DialogsService/DialogsService";
import { changeModeService } from "store/DialogsService/ChangeModeService";
import { valueDecorator } from "utils/decorators/valueDecorator";
import { checkedDecorator } from "utils/decorators/checkedDecorator";
import { preventedDecorator } from "utils/decorators/preventedDecorator";
import { socketIoService } from "../../store/SocketService";
import { SearchDialogsModeEnum } from "../../types/SearchDialogsModeType";

const Form = styled.form`
  padding: 30px;
  display: flex;
  border-bottom: 1px solid #dddddd;
`;

const Input = styled.input`
  width: 85%;
  height: 22px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  padding: 14px;
  font-size: 18px;
  outline: none;
  &::placeholder {
    color: #999999;
  }
  margin-right: 23px;
`;

const Button = styled.button`
  background: #4ca5ff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const CheckBoxBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 28px;
  width: 100%;
  border-bottom: 1px solid #dddddd;
`;
const Label = styled.label`
  color: #999999;
  margin-left: 10px;
  display: block;
`;

interface CreateDialogFormInterface {
  addUsersIds: string[];
  closeCreateDialog: () => void;
}

const CreateDialogForm = ({
  addUsersIds,
  closeCreateDialog,
}: CreateDialogFormInterface) => {
  const history = useHistory();
  const [currentDialogName, setCurrentDialogName] = useState("");
  const [protectedDialog, setProtectedDialog] = useState(true);

  const createDialog = async () => {
    const dialog = await dialogsService.createDialog(
      currentDialogName,
      protectedDialog,
      addUsersIds
    );

    socketIoService.joinToDialog(dialog._id);
    dialogsService.pushDialogToCurrentDialogs(dialog);
    changeModeService.toggleSearchDialogsMode(SearchDialogsModeEnum.MY_DIALOGS);
    closeCreateDialog();
    history.push("/dialogs/" + dialog._id);
  };

  const onCreateButtonClick = useCallback(
    preventedDecorator(() => {
      if (!currentDialogName) {
        alertService.showAlert("Введите название чата!");
        return;
      }
      createDialog();
    }),
    [createDialog, currentDialogName]
  );

  return (
    <>
      <Form onSubmit={onCreateButtonClick}>
        <Input
          type="text"
          placeholder="Введите название"
          onChange={valueDecorator(setCurrentDialogName)}
          value={currentDialogName}
        />
        <Button onClick={onCreateButtonClick}>Создать</Button>
      </Form>
      <CheckBoxBlock>
        <input
          type="checkbox"
          onChange={checkedDecorator(setProtectedDialog)}
          checked={protectedDialog}
          id="checked"
        />
        <Label htmlFor="checked">Защищенный диалог</Label>
      </CheckBoxBlock>
    </>
  );
};

export default React.memo(observer(CreateDialogForm));
