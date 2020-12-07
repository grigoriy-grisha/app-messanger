import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { changeModeService } from "store/DialogsService/ChangeModeService";
import { dialogsService } from "store/DialogsService/DialogsService";

import ListsDialogsAndContactContainer from "../TopSide/ListsDialogsAndContactContainer";
import DialogsAddedContainer from "./AddedContainer";
import DialogsSearchContainer from "./SearchContainer";

import { SearchDialogsModeEnum } from "types/SearchDialogsModeType";

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
  const params = useParams<{ id: string }>();

  const getDialogInfoByParams = useCallback(
    async function () {
      const dialogInfo = await dialogsService.getDialogInfo(params.id);
      if (dialogInfo.dialogWasCreated === "DIALOG_WAS_CREATE") {
        dialogsService.pushDialogToCurrentDialogs(dialogInfo.dialog);
      }
    },
    [params.id]
  );

  useEffect(() => {
    if (!params.id) return;
    getDialogInfoByParams();
  }, [getDialogInfoByParams, params.id]);

  return (
    <DialogsContainerWrapper>
      <ListsDialogsAndContactContainer />
      {changeModeService.selectedDialogMode ===
      SearchDialogsModeEnum.SEARCH_DIALOGS ? (
        <DialogsSearchContainer />
      ) : (
        <DialogsAddedContainer />
      )}
    </DialogsContainerWrapper>
  );
};

export default React.memo(observer(Dialogs));
