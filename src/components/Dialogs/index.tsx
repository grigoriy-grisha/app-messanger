import { ListsDialogsAndContactContainer } from "../TopSide/ListsDialogsAndContactContainer";
import React, { useEffect } from "react";
import styled from "styled-components";
import DialogsAddedContainer from "./DialogsAddedContainer";
import DialogsSearchContainer from "./DialogsSearchContainer";
import { observer } from "mobx-react-lite";
import { changeModeService } from "../../store/DialogsService/ChangeModeService";
import { DialogInterface, MessageInterface } from "../../types";
import { dialogsService } from "../../store/DialogsService/DialogsService";
import socket from "../../utils/socket";
import { useHistory } from "react-router-dom";
import { messageService } from "../../store/MessagesService";

const DialogsContainerWrapper = styled.div`
  width: 29%;
  max-height: 100%;
`;

export const DialogsWrapper = styled.div`
  overflow-y: scroll;
  position: relative;
  max-height: 100%;
  height: 93%;
`;

const Dialogs = () => {
  const addMessage = (message: MessageInterface) => {
    messageService.messages.push(message);
  };

  return (
    <DialogsContainerWrapper>
      <ListsDialogsAndContactContainer />
      <>
        {changeModeService.isSearchDialogsMode ? (
          <DialogsSearchContainer />
        ) : (
          <DialogsAddedContainer />
        )}
      </>
    </DialogsContainerWrapper>
  );
};

export default observer(Dialogs);
