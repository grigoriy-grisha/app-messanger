import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { dialogsService } from "store/DialogsService/DialogsService";

import MessageContainer from "./Message/Container";
import TopSide, { TopSideWrapper } from "./TopSide/TopSide";
import Dialogs from "./Dialogs";
import ChatInput from "./Message/ChatInput";

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

const Messenger = () => {
  return (
    <MessengerWrapper>
      <Dialogs />
      <MessagesContainerWrapper>
        {dialogsService.currentDialog ? <TopSide /> : <TopSideWrapper />}
        <MessageContainer />
        <ChatInput />
      </MessagesContainerWrapper>
    </MessengerWrapper>
  );
};

export default React.memo(observer(Messenger));
