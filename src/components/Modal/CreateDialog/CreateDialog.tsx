import styled from "styled-components";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { usersService } from "../../../store/UsersService";
import { observer } from "mobx-react-lite";
import { UserItem } from "./UserItem";
import { createDialogModalService } from "../../../store/ModalService/CreateDialogModalService";
import { alertService } from "../../../store/AlertService";

export const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateDialogBlock = styled.div`
  width: 400px;
  height: 700px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
  background: #fff;
  opacity: 1;
  display: flex;
  flex-direction: column;
`;

const PersonsContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const CreateDialogFrom = styled.form`
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
const CreateDialog = () => {
  const [value, setValue] = useState("");
  const [active, setActive] = useState(true);
  useEffect(() => {
    usersService.getUsers();
  }, []);

  const closeModal = (e: any) => {
    if (!e.target.classList.contains("modal")) return;
    createDialogModalService.idUserAwaitingAddition = [];
    createDialogModalService.close();
  };

  const onCreateButtonClick = (e: FormEvent) => {
    e.preventDefault();
    if (!value) return alertService.showAlert("Введите название чата!");
    createDialogModalService.createDialog(value, active).then(() => {
      setValue("");
      createDialogModalService.idUserAwaitingAddition = [];
      createDialogModalService.close();
    });
  };

  const onUserItemClick = useCallback((id: string) => {
    createDialogModalService.addAndRemoveIdUser(id);
  }, []);

  return (
    <Wrap onClick={(e: any) => closeModal(e)} className="modal">
      <CreateDialogBlock>
        <CreateDialogFrom onSubmit={onCreateButtonClick}>
          <Input
            type="text"
            placeholder="Введите название"
            onChange={(e: any) => setValue(e.target.value)}
            value={value}
          />
          <Button onClick={onCreateButtonClick}>Создать</Button>
        </CreateDialogFrom>
        <CheckBoxBlock>
          <input
            type="checkbox"
            onChange={(e) => {
              setActive(e.target.checked);
            }}
            checked={active}
            id="checked"
          />
          <Label htmlFor="checked">Защищенный диалог</Label>
        </CheckBoxBlock>
        <PersonsContainer>
          {usersService.users.map((item: UsersInterface) => {
            return (
              <UserItem
                key={item._id}
                onUserItemClick={onUserItemClick}
                fullname={item.fullname}
                active={createDialogModalService.idUserAwaitingAddition.includes(
                  item._id
                )}
                id={item._id}
              />
            );
          })}
        </PersonsContainer>
      </CreateDialogBlock>
    </Wrap>
  );
};

export default observer(CreateDialog);
