import styled from "styled-components";
import React from "react";
import { Avatar } from "../../Message/MessageItem";

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
  onUserItemClick: (id: string) => void;
  id: string;
}

export const UserItem = ({
  fullname,
  active,
  onUserItemClick,
  id,
}: PropsInterface) => {
  return (
    <UserItemBLock onClick={() => onUserItemClick(id)} active={active}>
      <Avatar />
      <UserItemName>{fullname}</UserItemName>
    </UserItemBLock>
  );
};
