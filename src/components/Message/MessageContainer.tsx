import MessageItem from "./MessageItem";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { observe } from "mobx";
import styled from "styled-components";

import { CenterElement, PreventiveMessage } from "App";

import { MessageInterface } from "types";

import { messageService } from "store/MessagesService";
import { dialogsService } from "store/DialogsService/DialogsService";
import socket from "utils/socket";

import Loader from "../Loader";

const MessageWrap = styled.div`
  position: relative;
  height: 85%;
  padding: 25px;
  overflow-y: scroll;
`;

interface ParamsInterface {
  id: string;
}

const MessageContainer = () => {
  const [messageRef, setMessageRef] = useState<HTMLDivElement | null>(null);
  const params = useParams<ParamsInterface>();

  const addMessage = ({ message }: { message: MessageInterface }) => {
    messageService.messages.push(message);
  };

  const getDialogInfoByParams = async () => {
    const dialogInfo = await dialogsService.getDialogInfo(params.id);
    if (dialogInfo.dialogWasCreated) {
      dialogsService.dialogs.push(dialogInfo.dialog);
    }
  };

  const getMessagesByParams = async () => {
    await messageService.getMessagesById(params.id);
    socket.emit("DIALOGS:JOIN", params.id);
    dialogsService.changeCurrentId(params.id);
  };

  useEffect(() => {
    socket.addEventListener("SERVER:NEW_MESSAGE", addMessage);
    return () => {
      socket.removeListener("SERVER:NEW_MESSAGE", addMessage);
    };
  }, []);

  useEffect(() => {
    if (!params.id) return;
    getDialogInfoByParams();
    getMessagesByParams();
  }, [params.id]);

  useEffect(
    observe(messageService.messages, () => {
      if (messageRef) messageRef.scrollTop = messageRef.scrollHeight;
    }),
    []
  );

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
      <MessageWrap>
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
    <MessageWrap ref={setMessageRef}>
      {messageService.messages.map(
        ({ _id, author, text, createdAt, typeMessage }) => (
          <MessageItem
            key={_id}
            id={author._id}
            text={text}
            date={createdAt}
            name={author.fullname}
            type={typeMessage}
          />
        )
      )}
    </MessageWrap>
  );
};

export default observer(MessageContainer);
