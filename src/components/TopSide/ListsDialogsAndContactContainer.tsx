import React from "react";
import styled from "styled-components";

import { changeModeService } from "store/DialogsService/ChangeModeService";
import messageIcon from "static/img/message.svg";
import chatIcon from "static/img/chat.svg";

import { ImgBlock } from "./TopSide";

const ListsDialogsAndContactWrap = styled.div`
  border-bottom: 1px solid #dddddd;
  width: 100%;
  height: 7%;
  display: flex;
`;

interface ListTypeInterface {
  isActive: boolean;
}

const ListType = styled.div<ListTypeInterface>`
  width: 50%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: ${({ isActive }) =>
    isActive === changeModeService.isSearchDialogsMode
      ? "#f3f7ff"
      : "#ffffff"}};
  &:hover {
    background: #f3f7ff;
  }
`;

const ListsDialogsAndContactContainer = () => {
  return (
    <ListsDialogsAndContactWrap>
      <ListType
        isActive
        onClick={() => {
          changeModeService.toggleSearchDialogsMode(true);
        }}
      >
        <ImgBlock src={messageIcon} alt="messageIcon" />
        Список Диалогов
      </ListType>
      <ListType
        isActive={false}
        onClick={() => {
          changeModeService.toggleSearchDialogsMode(false);
        }}
      >
        <ImgBlock src={chatIcon} alt="chatIcon" />
        Мои диалоги
      </ListType>
    </ListsDialogsAndContactWrap>
  );
};

export default ListsDialogsAndContactContainer;
