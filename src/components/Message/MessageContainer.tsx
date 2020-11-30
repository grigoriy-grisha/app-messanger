import { messageService } from "../../store/MessagesService";
import MessageItem from "./MessageItem";
import React, { useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import socket from "../../utils/socket";

const MessageWrap = styled.div`
  max-height: 85%;
  height: 85%;
  padding: 25px;
  overflow-y: scroll;
`;

interface IProps {}

export const MessageContainer: React.FC<IProps> = observer(() => {
  useEffect(() => {
    socket.on("SERVER:NEW_MESSAGE", (data: any) => {
      console.log(data);
      if (data) {
        console.log(data);
      }
    });

    return () => {
      socket.off("SERVER:NEW_MESSAGE", (data: any) => {});
    };
  });

  return (
    <MessageWrap>
      {messageService.messages.map((item: any) => {
        return (
          <MessageItem
            key={item._id + Math.random().toFixed(6)}
            id={item.author}
            text={item.text}
          />
        );
      })}
    </MessageWrap>
  );
});
