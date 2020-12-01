import { ImgBlock } from "./TopSide";
import message from "../../static/img/message.svg";
import chat from "../../static/img/chat.svg";
import React, { useState } from "react";
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
    return theme.value === theme.number ? "#f3f7ff" : "#ffffff";
  }};
  &:hover {
    background: #f3f7ff;
  }
`;

interface IProps {}

export const ListsDialogsAndContactContainer: React.FC<IProps> = () => {
  const [value, setValue] = useState(1);

  return (
    <ListsDialogsAndContactWrap>
      <ListType
        theme={{ value, number: 0 }}
        onClick={() => {
          setValue(0);
          dialogsService.changeDialogsMode(true);
        }}
      >
        <ImgBlock src={message} alt="message" />
        Список Диалогов
      </ListType>
      <ListType
        theme={{ value, number: 1 }}
        onClick={() => {
          setValue(1);
          dialogsService.getDialogs().then();
          dialogsService.changeDialogsMode(false);
        }}
      >
        <ImgBlock src={chat} alt="chat" />
        Мои диалоги
      </ListType>
    </ListsDialogsAndContactWrap>
  );
};
