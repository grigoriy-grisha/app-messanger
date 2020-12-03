import { observer } from "mobx-react-lite";
import { usersService } from "../../../store/UsersService";
import UserItem from "./UserItem";
import { createDialogModalService } from "../../../store/ModalService/CreateDialogModalService";
import React, { useCallback } from "react";
import styled from "styled-components";
import { UserInterface } from "../../../types";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const UsersContainer = () => {
  const onUserItemClick = useCallback((id: string) => {
    createDialogModalService.addAndRemoveIdUser(id);
  }, []);

  return (
    <Container>
      {usersService.users.map((item: UserInterface) => {
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
    </Container>
  );
};

export default React.memo(observer(UsersContainer));
