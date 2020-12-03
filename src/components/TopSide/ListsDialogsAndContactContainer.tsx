import { ImgBlock } from "./TopSide";
import message from "../../static/img/message.svg";
import chat from "../../static/img/chat.svg";
import React, { useState } from "react";
import styled from "styled-components";
import { dialogsService } from "../../store/DialogsService/DialogsService";
import { changeModeService } from "../../store/DialogsService/ChangeModeService";

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

export const ListsDialogsAndContactContainer = () => {
  return (
    <ListsDialogsAndContactWrap>
      <ListType
        isActive={true}
        onClick={() => {
          changeModeService.changeDialogsMode(true);
        }}
      >
        <ImgBlock src={message} alt="message" />
        Список Диалогов
      </ListType>
      <ListType
        isActive={false}
        onClick={() => {
          changeModeService.changeDialogsMode(false);
        }}
      >
        <ImgBlock src={chat} alt="chat" />
        Мои диалоги
      </ListType>
    </ListsDialogsAndContactWrap>
  );
};
