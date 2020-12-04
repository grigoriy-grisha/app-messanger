import MessageItem from "./MessageItem";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { toJS } from "mobx";
import styled from "styled-components";

import { CenterElement, PreventiveMessage } from "App";
import Loader from "../Loader";
import { MessageInterface } from "types";

import { messageService } from "store/MessagesService";
import { dialogsService } from "store/DialogsService/DialogsService";
import socket from "utils/socket";

const MessageWrap = styled.div`
  position: relative;
  height: 85%;
  padding: 25px;
  overflow-y: scroll;
`;

const MessageContainer = () => {
  const messageRef = useRef<HTMLDivElement>(null);
  const params: { id: string } = useParams();

  const addMessage = (message: MessageInterface) => {
    messageService.messages.push(message);
  };

  useEffect(() => {
    socket.addEventListener(
      "SERVER:NEW_MESSAGE",
      ({ message }: { message: MessageInterface }) => addMessage(message)
    );
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (!params.id) return;
    messageService.isLoading = true;
    dialogsService.getDialogInfo(params.id).then((res) => {
      if (res.message) dialogsService.dialogs.push(res.dialog);

      messageService.getMessagesById(params.id).then(() => {
        socket.emit("DIALOGS:JOIN", params.id);
        messageService.isLoading = false;
        dialogsService.changeCurrentId(params.id);
      });
    });
  }, [params.id]);

  useLayoutEffect(() => {
    if (messageRef.current)
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [toJS(messageService.messages)]);

  if (messageService.isLoading)
    return (
      <MessageWrap>
        <CenterElement>
          <Loader />
        </CenterElement>
      </MessageWrap>
    );

  if (messageService.messages.length === 0) {
    return (
      <MessageWrap ref={messageRef}>
        <CenterElement>
          {dialogsService.currentDialogId ? (
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
        return (
          <MessageItem
            key={item._id}
            id={item.author._id}
            text={item.text}
            date={item.createdAt}
            name={item.author.fullname}
            type={item.typeMessage}
          />
        );
      })}
    </MessageWrap>
  );
};

export default observer(MessageContainer);
