import React from "react";
import styled from "styled-components";
import { TopSide } from "./TopSide/TopSide";
import { ChatInput } from "./Message/ChatInput";
import { MessageContainer } from "./Message/MessageContainer";
import Dialogs from "./Dialogs";

const MessagesContainerWrapper = styled.div`
  width: 71%;
  max-height: 100%;
  height: 100%;
`;

const MessengerWrapper = styled.div`
  width: 1400px;
  height: 100vh;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
  margin: 0 auto;
  display: flex;
`;

export const Messenger = () => {
  return (
    <>
      <MessengerWrapper>
        <Dialogs />
        <MessagesContainerWrapper>
          <TopSide />
          <MessageContainer />
          <ChatInput />
        </MessagesContainerWrapper>
      </MessengerWrapper>
    </>
  );
};
