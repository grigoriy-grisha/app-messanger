import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { format } from "timeago.js";

import { authService } from "store/AuthService";
import { generateColorAvatar } from "utils/generateAvatar";
import { TypeMessageEnum } from "../../types/typeMessage";

interface IsMeInterface {
  isMe?: boolean;
}

interface AvatarInterface {
  background: number[];
}

const MessageContainer = styled.div<IsMeInterface>`
  display: flex;
  align-items: center;
  justify-content: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
  margin-bottom: 30px;
`;
const MessageColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageText = styled.div<IsMeInterface>`
  max-width: 355px;
  background: ${({ isMe }) => (isMe ? "#ffffff" : "#3674FF")};
  box-shadow: 0px 5px 5px
    rgba(${({ isMe }) => (isMe ? "0, 0, 0," : "54, 116, 255,")} 0.196733);
  font-size: 14px;
  line-height: 20px;
  border-radius: 12px 12px ${({ isMe }) => (isMe ? "0px 12px" : "12px 0px")}; // изменение углов
  color: ${({ isMe }: IsMeInterface) => (isMe ? "#202020" : "#ffffff")};
  padding: 10px 15px 13px 19px;
  word-break: break-word;
`;

export const Avatar = styled.div<AvatarInterface>`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: rgb(${({ background }) => `${background.join()}`});
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: #dddddd;
`;

const MessageAvatar = styled(Avatar)`
  margin: 13px 13px 24px 13px;
`;

const MessageTimer = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #bbbbbb;
  margin-top: 10px;
`;

const MessageFlexEnd = styled.div<IsMeInterface>`
  display: flex;
  align-items: flex-end;
  flex-direction: ${({ isMe }) => (isMe ? "row-reverse" : "row")};
`;

const JoinedMessage = styled.div`
  width: 100%;
  height: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
`;

interface MessageItemInterface {
  id: string;
  text: string;
  date: Date;
  name: string;
  typeMessage: TypeMessageEnum;
}

const Item = ({ id, text, date, name, typeMessage }: MessageItemInterface) => {
  const isMe = authService.id === id;

  if (typeMessage === TypeMessageEnum.JOIN_TO_DIALOG_MESSAGE) {
    return <JoinedMessage>{text}</JoinedMessage>;
  }

  return (
    <MessageContainer isMe={isMe}>
      <MessageFlexEnd isMe={isMe}>
        <MessageAvatar background={generateColorAvatar(id)}>
          {name[0]}
        </MessageAvatar>
        <MessageColumn>
          <MessageText isMe={isMe}>{text}</MessageText>
          <MessageTimer>{format(date)}</MessageTimer>
        </MessageColumn>
      </MessageFlexEnd>
    </MessageContainer>
  );
};

export default React.memo(observer(Item));
