import React, { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import { dialogsService } from "store/DialogsService/DialogsService";
import { messageService } from "store/MessagesService";
import { preventedDecorator } from "utils/decorators/preventedDecorator";
import { valueDecorator } from "utils/decorators/valueDecorator";

import send from "static/img/send.svg";

import { ImgBlockPointer } from "../TopSide/TopSide";

const ChatInputContainer = styled.div`
  width: 100%;
  height: 102px;
  display: flex;
  align-items: center;
  padding: 30px 34px;
  border-top: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
`;

const Input = styled.input`
  width: 95%;
  height: 40px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  padding: 14px;
  font-size: 18px;
  outline: none;
  &::placeholder {
    color: #999999;
  }
  margin-right: 23px;
`;

const ChatInput = () => {
  const [value, setValue] = useState("");

  const sendMessage = useCallback(
    preventedDecorator(() => {
      if (!value) return;
      messageService.sendMessage(value).then(() => setValue(""));
    }),
    [value]
  );

  return (
    <form onSubmit={sendMessage}>
      <ChatInputContainer>
        {dialogsService.currentDialog && (
          <>
            <Input
              type="text"
              placeholder="Введите сообщение..."
              onChange={valueDecorator(setValue)}
              value={value}
            />
            <ImgBlockPointer src={send} alt="send" onClick={sendMessage} />
          </>
        )}
      </ChatInputContainer>
    </form>
  );
};

export default React.memo(observer(ChatInput));
