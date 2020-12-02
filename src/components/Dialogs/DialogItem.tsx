import styled from "styled-components";
import React from "react";

const DialogSearchContainer = styled.div`
  width: 100%;
  padding: 10px 35px;
  transition: 0.1s;
  background: ${({ active }: { active: boolean }) =>
    active ? "#f3f7ff" : "#ffffff"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: #f3f7ff;
  }
`;

export const DialogSearchName = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #202020;
  padding: 3px;
`;

export const DialogSearchCountUsers = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #cccccc;
  padding: 3px;
`;

const DialogSearchIcon = styled.div`
  width: 23px;
  height: 23px;
`;

interface DialogItemInterface {
  name: string;
  users: UsersInterface[];
  id: string;
  onDialogItemClick: (id: string) => void;
  img: any;
  active?: boolean;
}

export const DialogItem = React.memo(
  ({
    name,
    users,
    id,
    onDialogItemClick,
    img,
    active = false,
  }: DialogItemInterface) => {
    return (
      <DialogSearchContainer
        active={active}
        onClick={() => onDialogItemClick(id)}
      >
        <div>
          <DialogSearchName>{name}</DialogSearchName>
          <DialogSearchCountUsers>
            {users.length} Участников
          </DialogSearchCountUsers>
        </div>
        <DialogSearchIcon>
          <img src={img} alt="dialog" />
        </DialogSearchIcon>
      </DialogSearchContainer>
    );
  }
);
