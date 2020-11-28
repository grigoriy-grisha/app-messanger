import React from "react";
import styled from "styled-components";
import {DialogSearchItem} from "./DialogSearchItem";
import MessageItem from "./MessageItem";
import {TopSide} from "./TopSide";
import messagesService from "../store/MessagesService"
import {ChatInput} from "./ChatInput";

const DialogsContainer = styled.div`
  width: 40%;
  overflow-y: scroll;
  max-height: 100%;
`
const MessagesContainer = styled.div`
  padding: 25px;
  width: 100%;
  overflow-y: scroll;
  max-height: 100%;
`
const MessengerWrapper = styled.div`
  width: 1400px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
  margin: 0 auto;
 
`

const PersonContainer = styled.div`
    display:flex;
    height:calc(93vh - 1px) ;
`

export const MessengerContainer = () => {
  return (
    <>
      <MessengerWrapper>
        <TopSide/>
        <PersonContainer>
          <DialogsContainer>
            <DialogSearchItem/>
            <DialogSearchItem/>
            <DialogSearchItem/>
            <DialogSearchItem/>
          </DialogsContainer>
          <MessagesContainer>
            <div>
              {messagesService.messages.map((item: any) => {
                return <MessageItem key={item._id + Math.random().toFixed(6)} id={item._id} text={item.text}/>
              })}
            </div>
            {/*<ChatInput/>*/}
          </MessagesContainer>
        </PersonContainer>

      </MessengerWrapper>
    </>

  )
}