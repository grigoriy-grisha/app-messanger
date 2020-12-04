import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import { UserInterface } from "types";

interface SearchContainerInterface {
  selected: boolean;
}

const DialogSearchContainer = styled.div<SearchContainerInterface>`
  width: 100%;
  padding: 10px 35px;
  transition: 0.1s;
  background: ${({ selected }) => (selected ? "#f3f7ff" : "#ffffff")};
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
  users: UserInterface[];
  id: string;
  img: string;
  selected?: boolean;
  onDialogItemClick: (id: string) => void;
}

const Item = ({
  name,
  users,
  id,
  img,
  selected = false,
  onDialogItemClick,
}: DialogItemInterface) => {
  return (
    <DialogSearchContainer
      selected={selected}
      onClick={() => onDialogItemClick(id)}
    >
      <div>
        <DialogSearchName>{name}</DialogSearchName>
        <DialogSearchCountUsers>
          {users.length} участников
        </DialogSearchCountUsers>
      </div>
      <DialogSearchIcon>
        <img src={img} alt="dialog" />
      </DialogSearchIcon>
    </DialogSearchContainer>
  );
};
export default React.memo(observer(Item));
