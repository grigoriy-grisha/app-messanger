import styled from "styled-components";
import React from "react";

const DialogSearchContainer = styled.div`
  width: 100%;
  padding: 10px 35px;
  transition: 0.1s;
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

interface IProps {
  name: string;
  users: UsersInterface[];
  id: string;
  clickOnDialogItem: (id: string) => void;
  img: any;
}

export const DialogItem: React.FC<IProps> = ({
  name,
  users,
  id,
  clickOnDialogItem,
  img,
}) => {
  return (
    <DialogSearchContainer onClick={() => clickOnDialogItem(id)}>
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
};
