import { ListsDialogsAndContactContainer } from "../TopSide/ListsDialogsAndContactContainer";
import DialogsContainer from "./DialogsContainer";
import React from "react";
import styled from "styled-components";

const DialogsContainerWrapper = styled.div`
  width: 29%;
  max-height: 100%;
`;

const Dialogs = () => {
  return (
    <DialogsContainerWrapper>
      <ListsDialogsAndContactContainer />
      <DialogsContainer />
    </DialogsContainerWrapper>
  );
};

export default Dialogs;
