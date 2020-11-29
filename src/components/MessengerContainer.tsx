import React from "react";
import styled from "styled-components";
import {DialogSearchItem} from "./DialogSearchItem";
import {ImgBlock, TopSide} from "./TopSide";

import message from "../static/img/message.svg";
import chat from "../static/img/chat.svg";
import messageService from "../store/MessagesService"
import MessageItem from "./MessageItem";
import {ChatInput} from "./ChatInput";


const ListsDialogsAndContactContainer = styled.div`
  border-bottom:1px solid #dddddd;
  width: 100%;
  height: 7%;
  display: flex;
`

const ListType = styled.div`
  width: 50%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
     background: #F3F7FF;
  }
`
const DialogsWrapper = styled.div`
  width: 29%;
  max-height: 100%;
`

const DialogsContainer = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  height: 93%;
`
const MessagesWrapper = styled.div`

  width: 71%;
  
  max-height: 100%;
  height: 100%;
`

const MessageContainer = styled.div`
  height: 85%;
  padding: 25px;
  overflow-y: scroll;
  
`
const MessengerWrapper = styled.div`
  width: 1400px;
  height: 100vh;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
  margin: 0 auto;
  display: flex;
 
`

const PersonContainer = styled.div`
    display:flex;
    height:calc(93vh - 1px) ;
`

export const MessengerContainer = () => {
  return (
    <>
      <MessengerWrapper>

        <DialogsWrapper>
          <ListsDialogsAndContactContainer>
            <ListType>
              <ImgBlock src={message} alt="message"/>
              Список Диалогов
            </ListType>
            <ListType>
              <ImgBlock src={chat} alt="chat"/>
              Мои диалоги
            </ListType>
          </ListsDialogsAndContactContainer>
          <DialogsContainer>
            <DialogSearchItem/>
            <DialogSearchItem/>
            <DialogSearchItem/>
            <DialogSearchItem/>
            <DialogSearchItem/>
            <DialogSearchItem/>
            <DialogSearchItem/>
            <DialogSearchItem/>
          </DialogsContainer>
        </DialogsWrapper>

        {/*</div>*/}


        <MessagesWrapper>
          <TopSide />
          <MessageContainer>
            {messageService.messages.map((item: any) => {
              return <MessageItem key={item._id + Math.random().toFixed(6)} id={item._id} text={item.text}/>
            })}
          </MessageContainer>
          <ChatInput/>
        </MessagesWrapper>


      </MessengerWrapper>
    </>

  )
}