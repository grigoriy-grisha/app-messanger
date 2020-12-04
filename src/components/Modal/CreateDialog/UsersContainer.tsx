import React, { useCallback } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import UserItem from "./UserItem";
import { UserInterface } from "types";

import { usersService } from "store/UsersService";
import { createDialogModalService } from "store/ModalService/CreateDialogModalService";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const UsersContainer = () => {
  const onUserItemClick = (id: string) => {
    createDialogModalService.addAndRemoveIdUser(id);
  };

  return (
    <Container>
      {usersService.users.map((item: UserInterface) => (
        <UserItem
          key={item._id}
          fullname={item.fullname}
          active={createDialogModalService.idUserAwaitingAddition.includes(
            item._id
          )}
          id={item._id}
          onUserItemClick={onUserItemClick}
        />
      ))}
    </Container>
  );
};

export default React.memo(observer(UsersContainer));
