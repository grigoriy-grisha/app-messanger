import React, { FormEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { DialogInterface } from "types";
import socket from "utils/socket";

import { alertService } from "store/AlertService";
import { createDialogModalService } from "store/ModalService/CreateDialogModalService";
import { dialogsService } from "store/DialogsService/DialogsService";
import { changeModeService } from "store/DialogsService/ChangeModeService";

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

const CreateDialogForm = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [active, setActive] = useState(true);

  const onCreateButtonClick = (e: FormEvent) => {
    e.preventDefault();
    if (!value) return alertService.showAlert("Введите название чата!");
    createDialogModalService
      .createDialog(value, active)
      .then((dialog: DialogInterface) => {
        socket.emit("DIALOGS:JOIN", dialog._id);
        dialogsService.dialogs.push(dialog);
        changeModeService.changeDialogsMode(false);
        createDialogModalService.idUserAwaitingAddition = [];
        createDialogModalService.close();
        history.push("/dialogs/" + dialog._id);
      });
  };

  return (
    <>
      <Form onSubmit={onCreateButtonClick}>
        <Input
          type="text"
          placeholder="Введите название"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <Button onClick={onCreateButtonClick}>Создать</Button>
      </Form>
      <CheckBoxBlock>
        <input
          type="checkbox"
          onChange={(e) => setActive(e.target.checked)}
          checked={active}
          id="checked"
        />
        <Label htmlFor="checked">Защищенный диалог</Label>
      </CheckBoxBlock>
    </>
  );
};

export default React.memo(observer(CreateDialogForm));
