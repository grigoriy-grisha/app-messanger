import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import { dialogsService } from "store/DialogsService/DialogsService";
import Loader from "components/Loader";
import { socketIoService } from "store/SocketService";
import arrow from "static/img/arrow.svg";

import DialogItem from "./Item";
import { DialogsWrapper } from "./index";
import {
  CenterElement,
  PreventiveMessage,
} from "../../components/StyleComponents/GlobalStyleComponents";

export const AddedContainer = () => {
  const history = useHistory();

  useEffect(() => {
    dialogsService.getMyDialogs();
  }, []);

  const onDialogItemClick = useCallback(
    (dialogId: string) => {
      socketIoService.joinToDialog(dialogId);
      dialogsService.setSelectedDialogId(dialogId);
      history.push(`/dialogs/${dialogId}`);
    },
    [history]
  );

  if (dialogsService.isLoading)
    return (
      <DialogsWrapper>
        <CenterElement>
          <Loader />
        </CenterElement>
      </DialogsWrapper>
    );

  if (!dialogsService.currentDialogs.length) {
    return (
      <DialogsWrapper>
        <CenterElement>
          <PreventiveMessage>Пока что нет диалогов!</PreventiveMessage>
        </CenterElement>
      </DialogsWrapper>
    );
  }

  return (
    <DialogsWrapper>
      {dialogsService.currentDialogs.map((dialog) => (
        <DialogItem
          key={dialog._id}
          selected={dialogsService.currentDialogId === dialog._id}
          id={dialog._id}
          name={dialog.name}
          users={dialog.users}
          img={arrow}
          onDialogItemClick={onDialogItemClick}
        />
      ))}
    </DialogsWrapper>
  );
};

export default React.memo(observer(AddedContainer));
