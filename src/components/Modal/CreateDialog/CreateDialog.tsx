import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import { Wrapper } from "../Modal";
import CreateDialogForm from "./CreateDialogForm";
import UsersContainer from "./UsersContainer";

import { usersService } from "store/UsersService";
import { createDialogModalService } from "store/ModalService/CreateDialogModalService";

const CreateDialogBlock = styled.div`
  width: 400px;
  height: 700px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
  background: #fff;
  opacity: 1;
  display: flex;
  flex-direction: column;
`;

const CreateDialog = () => {
  useEffect(() => {
    usersService.getUsers();
  }, []);

  const closeModal = (e: any) => {
    if (!e.target.classList.contains("modal")) return;
    createDialogModalService.idUserAwaitingAddition = [];
    createDialogModalService.close();
  };

  return (
    <Wrapper onClick={(e) => closeModal(e)} className="modal">
      <CreateDialogBlock>
        <CreateDialogForm />
        <UsersContainer />
      </CreateDialogBlock>
    </Wrapper>
  );
};

export default observer(CreateDialog);
