import styled from "styled-components";
import React, { FormEvent, useState } from "react";
import { ImgBlockPointer } from "../TopSide/TopSide";
import send from "../../static/img/send.svg";
import { messageService } from "../../store/MessagesService";

const ChatInputContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border-top: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
`;
const Input = styled.input`
  width: 95%;
  height: 40px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  padding: 10px;
  font-size: 18px;
  outline: none;
  &::placeholder {
    color: #999999;
  }
  margin-right: 23px;
`;

export const ChatInput = () => {
  const [value, setValue] = useState("");

  const sendMessage = (e: FormEvent<HTMLFormElement | HTMLImageElement>) => {
    e.preventDefault();
    if (!value) return;
    messageService
      .sendMessage(value)
      .then((res) => {
        console.log(res);
        setValue("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={sendMessage}>
      <ChatInputContainer>
        <Input
          type="text"
          placeholder="Введите сообщение..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ImgBlockPointer src={send} alt="send" onClick={sendMessage} />
      </ChatInputContainer>
    </form>
  );
};