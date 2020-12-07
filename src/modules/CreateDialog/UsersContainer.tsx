import React, { useCallback } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { usersService } from "store/UsersService";

import UserItem from "./UserItem";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

interface UsersContainerInterface {
  addUsersIds: string[];
  setUsersIds: any;
}

const UsersContainer = ({
  addUsersIds,
  setUsersIds,
}: UsersContainerInterface) => {
  const toggleIdUser = useCallback(
    (id: string) => {
      const findIndex = addUsersIds.findIndex((item) => id === item);
      if (findIndex === -1) {
        setUsersIds((preValue: string[]) => [...preValue, id]);
        return;
      }
      setUsersIds(addUsersIds.splice(findIndex, 1));
    },
    [addUsersIds, setUsersIds]
  );

  return (
    <Container>
      {usersService.users.map((item) => (
        <UserItem
          key={item._id}
          fullname={item.fullname}
          active={addUsersIds.includes(item._id)}
          id={item._id}
          onUserItemClick={toggleIdUser}
        />
      ))}
    </Container>
  );
};

export default React.memo(observer(UsersContainer));
