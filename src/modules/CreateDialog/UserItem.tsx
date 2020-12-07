import React, { useCallback } from "react";
import styled from "styled-components";
import { Avatar } from "../Message/Item";
import { generateColorAvatar } from "utils/generateAvatar";

interface UserItemProps {
  active: boolean;
}

const UserItemBLock = styled.div<UserItemProps>`
  width: 100%;
  height: 60px;
  padding: 10px 25px;
  display: flex;
  background: ${({ active }) => (active ? "#f3f7ff" : "#ffffff")};
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #f3f7ff;
  }
`;

const UserItemName = styled.div`
  margin-left: 30px;
  color: #666666;
`;

interface PropsInterface {
  fullname: string;
  active: boolean;
  id: string;
  onUserItemClick: (id: string) => void;
}

const UserItem = ({
  fullname,
  active,
  id,
  onUserItemClick,
}: PropsInterface) => {
  const toggleUser = useCallback(() => {
    onUserItemClick(id);
  }, [id, onUserItemClick]);

  return (
    <UserItemBLock onClick={toggleUser} active={active}>
      <Avatar background={generateColorAvatar(id)}>{fullname[0]}</Avatar>
      <UserItemName>{fullname}</UserItemName>
    </UserItemBLock>
  );
};

export default React.memo(UserItem);
