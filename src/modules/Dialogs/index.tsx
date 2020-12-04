import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import ListsDialogsAndContactContainer from "../../components/TopSide/ListsDialogsAndContactContainer";
import DialogsAddedContainer from "./AddedContainer";
import DialogsSearchContainer from "./SearchContainer";

import { changeModeService } from "store/DialogsService/ChangeModeService";

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

      {changeModeService.isSearchDialogsMode ? (
        <DialogsSearchContainer />
      ) : (
        <DialogsAddedContainer />
      )}
    </DialogsContainerWrapper>
  );
};

export default React.memo(observer(Dialogs));
