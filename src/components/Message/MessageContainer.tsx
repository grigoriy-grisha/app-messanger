import { messageService } from "../../store/MessagesService";
import MessageItem from "./MessageItem";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { CenterElement, PreventiveMessage } from "../../App";
import { dialogsService } from "../../store/DialogsService";
import { useParams } from "react-router-dom";
import socket from "../../utils/socket";
import {toJS} from "mobx";

const MessageWrap = styled.div`
  position: relative;
  height: 85%;
  padding: 25px;
  overflow-y: scroll;
`;

export const MessageContainer = observer(() => {


  const messageRef = useRef<HTMLDivElement>(null);
  const params: { id: string } = useParams();
  const addMessage = (message: any) => {
    messageService.messages.push(message);
  };
  //TODO при выходе отчищать все
  useEffect(() => {
    socket.on("SERVER:NEW_MESSAGE", ({ message }: any) => {
      console.log(message);
      addMessage(message);
    });
    return () => {
      socket.off("SERVER:NEW_MESSAGE", ({ message }: any) => {
        addMessage(message);
      });
    };
  }, []);

  useEffect(() => {
    if (messageRef.current) messageRef.current.scrollTop = 9999;
  }, [messageService.messages]);

  useEffect(() => {
    if (!params.id) return;

    dialogsService.getDialogInfo(params.id);
    messageService.getMessagesById(params.id).then(() => {
      dialogsService.changeCurrentId(params.id);
    });
  }, [params.id]);
  if (messageService.messages.length === 0) {
    return (
      <MessageWrap ref={messageRef}>
        <CenterElement>
          {!!dialogsService.currentDialogId ? (
            <PreventiveMessage>Пока что нет сообщений!</PreventiveMessage>
          ) : (
            <PreventiveMessage>Откройте Диалог</PreventiveMessage>
          )}
        </CenterElement>
      </MessageWrap>
    );
  }

  return (
    <MessageWrap ref={messageRef}>
      {messageService.messages.map((item) => {
        console.log(toJS(item))
        return (
          <MessageItem
            key={item._id}
            id={item.author._id}
            text={item.text}
            date={item.createdAt}
            name={item.author.fullname}
          />
        );
      })}
    </MessageWrap>
  );
});
