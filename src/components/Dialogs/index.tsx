import React, { useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import ListsDialogsAndContactContainer from "../TopSide/ListsDialogsAndContactContainer";
import DialogsAddedContainer from "./DialogsAddedContainer";
import DialogsSearchContainer from "./DialogsSearchContainer";

import { changeModeService } from "store/DialogsService/ChangeModeService";
import { usersService } from "store/UsersService";
import socket from "utils/socket";

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
