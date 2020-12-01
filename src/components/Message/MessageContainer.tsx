import { messageService } from "../../store/MessagesService";
import MessageItem from "./MessageItem";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { CenterElement } from "../../App";
import { dialogsService } from "../../store/DialogsService";

const MessageWrap = styled.div`
  position: relative;
  height: 85%;
  padding: 25px;
  overflow-y: scroll;
`;

const PreventiveMessage = styled.h2`
  font-size: 21px;
  color: #666666;
`;

interface IProps {}

export const MessageContainer: React.FC<IProps> = observer(() => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageRef.current!.scrollTop = 9999;
  }, [messageService.messages]);

  return (
    <MessageWrap ref={messageRef}>
      {messageService.messages.length ? (
        messageService.messages.map((item: any) => {
          return (
            <MessageItem
              key={item._id}
              id={item.author}
              text={item.text}
              date={item.createdAt}
            />
          );
        })
      ) : (
        <CenterElement>
          {dialogsService.currentId ? (
            <PreventiveMessage>Пока что нет сообщений!</PreventiveMessage>
          ) : (
            <PreventiveMessage>Откройте Диалог</PreventiveMessage>
          )}
        </CenterElement>
      )}
    </MessageWrap>
  );
});
