import { ListsDialogsAndContactContainer } from "../TopSide/ListsDialogsAndContactContainer";
import React from "react";
import styled from "styled-components";
import DialogsAddedContainer from "./DialogsAddedContainer";
import DialogsSearchContainer from "./DialogsSearchContainer";
import { observer } from "mobx-react-lite";
import { listModeService } from "../../store/DialogsService/ListModeService";

const DialogsContainerWrapper = styled.div`
  width: 29%;
  max-height: 100%;
`;

const Dialogs = () => {
  return (
    <DialogsContainerWrapper>
      <ListsDialogsAndContactContainer />
      <>
        {listModeService.isSearchDialogsMode ? (
          <DialogsSearchContainer />
        ) : (
          <DialogsAddedContainer />
        )}
      </>
    </DialogsContainerWrapper>
  );
};

export default observer(Dialogs);
