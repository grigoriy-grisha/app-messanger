import styled from "styled-components";
import React, { useEffect } from "react";
import { userService } from "../../store/UserService";
import { observer } from "mobx-react-lite";

const CreateDialogWrap = styled.div`
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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const PersonsContainer = styled.div`
  width: 100%;
  height: 100%;
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

export const CreateDialog = () => {
  useEffect(() => {
    userService.getUsers().then();
  }, []);

  return (
    <CreateDialogWrap>
      <CreateDialogBlock>
        <CreateDialogFrom>
          <Input type="text" placeholder="Введите название" />
          <Button>Создать</Button>
        </CreateDialogFrom>
        <PersonsContainer>
          {userService.users.map((item: UsersInterface) => {
            return <div>{item.fullname}</div>;
          })}
        </PersonsContainer>
      </CreateDialogBlock>
    </CreateDialogWrap>
  );
};

export default observer(CreateDialog);
