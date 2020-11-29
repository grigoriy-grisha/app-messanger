import styled from "styled-components";
import React, {ChangeEvent, useState} from "react";
import {ImgBlockPointer} from "./TopSide";
import send from "../static/img/send.svg"

const ChatInputContainer = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border-top: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
`
const ChatInputPlaceholder = styled.span`
  
  color: #999999;
  font-size: 15px;
  z-index: -1;
`
const Input = styled.input`
  width: 95%;
  height: 40px;
  color: #999999;
  border: 1px solid #E9E9E9;
  border-radius: 4px;
  padding: 10px;
  font-size: 18px;
  outline: none;
  &::placeholder {
    color: #999999;
  }
  margin-right: 23px;
`

export const ChatInput = () => {
  const [value, setValue] = useState('')
  return (
    <ChatInputContainer>
      <Input
        type="text"
        placeholder="Введите сообщение..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ImgBlockPointer src={send} alt="send"/>
    </ChatInputContainer>
  )
}