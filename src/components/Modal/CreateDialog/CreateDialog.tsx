import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import { usersService } from "store/UsersService";

import { Wrapper } from "../Modal";
import CreateDialogForm from "./CreateDialogForm";
import UsersContainer from "./UsersContainer";

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

  return (
    <Wrapper>
      <CreateDialogBlock>
        <CreateDialogForm />
        <UsersContainer />
      </CreateDialogBlock>
      <div>x</div>
    </Wrapper>
  );
};

export default observer(CreateDialog);
