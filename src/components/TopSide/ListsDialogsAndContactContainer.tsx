import { ImgBlock } from "./TopSide";
import message from "../../static/img/message.svg";
import chat from "../../static/img/chat.svg";
import React from "react";
import styled from "styled-components";
import { dialogsService } from "../../store/DialogsService";

const ListsDialogsAndContactWrap = styled.div`
  border-bottom: 1px solid #dddddd;
  width: 100%;
  height: 7%;
  display: flex;
`;

const ListType = styled.div`
  width: 50%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: ${({ theme }) => {
    console.log(theme);
    return theme === 1 ? "#ffffff" : "#f3f7ff";
  }};
  &:hover {
    background: #f3f7ff;
  }
`;

interface IProps {}

export const ListsDialogsAndContactContainer: React.FC<IProps> = () => {
  return (
    <ListsDialogsAndContactWrap>
      <ListType onClick={() => dialogsService.getAllDialogs()}>
        <ImgBlock src={message} alt="message" />
        Список Диалогов
      </ListType>
      <ListType onClick={() => dialogsService.getDialogs()}>
        <ImgBlock src={chat} alt="chat" />
        Мои диалоги
      </ListType>
    </ListsDialogsAndContactWrap>
  );
};
