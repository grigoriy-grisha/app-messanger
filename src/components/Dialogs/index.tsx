import { ListsDialogsAndContactContainer } from "../TopSide/ListsDialogsAndContactContainer";
import React from "react";
import styled from "styled-components";
import DialogsAddedContainer from "./DialogsAddedContainer";
import DialogsSearchContainer from "./DialogsSearchContainer";
import { dialogsService } from "../../store/DialogsService";
import { observer } from "mobx-react-lite";

const DialogsContainerWrapper = styled.div`
  width: 29%;
  max-height: 100%;
`;

const Dialogs = () => {
  return (
    <DialogsContainerWrapper>
      <ListsDialogsAndContactContainer />
      <>
        {dialogsService.searchDialogsMode ? (
          <DialogsSearchContainer />
        ) : (
          <DialogsAddedContainer />
        )}
      </>
    </DialogsContainerWrapper>
  );
};

export default observer(Dialogs);
