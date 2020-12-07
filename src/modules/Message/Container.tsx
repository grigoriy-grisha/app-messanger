import MessageItem from "./Item";
import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { observe } from "mobx";
import styled from "styled-components";

import { messageService } from "store/MessagesService";
import { dialogsService } from "store/DialogsService/DialogsService";
import { socketIoService } from "store/SocketService";

import Loader from "components/Loader";
import {
  CenterElement,
  PreventiveMessage,
} from "components/StyleComponents/GlobalStyleComponents";

const MessageWrap = styled.div`
  position: relative;
  height: 85%;
  padding: 25px;
  overflow-y: scroll;
`;

const Container = () => {
  const [messageRef, setMessageRef] = useState<HTMLDivElement | null>();
  const params = useParams<{ id: string }>();

  const getMessagesByParams = useCallback(
    async function () {
      messageService.clearMessages();
      await messageService.getMessagesByDialogId(params.id);
      socketIoService.joinToDialog(params.id);
    },
    [params.id]
  );

  useEffect(() => {
    const unsubscribe = socketIoService.subscribeToNewMessage();
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!params.id) return;
    getMessagesByParams();
  }, [getMessagesByParams, params.id]);

  useEffect(() => {
    const unsubscribe = observe(messageService.messages, () => {
      if (messageRef) messageRef.scrollTop = messageRef.scrollHeight;
    });
    return () => {
      unsubscribe();
    };
  }, [messageRef]);

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
          {dialogsService.currentDialog?._id ? (
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
            typeMessage={typeMessage}
          />
        )
      )}
    </MessageWrap>
  );
};

export default React.memo(observer(Container));
