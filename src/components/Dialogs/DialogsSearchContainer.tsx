import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { CenterElement } from "App";
import { DialogsWrapper } from "./index";
import DialogItem from "./DialogItem";
import Modal from "../Modal/Modal";
import AddDialog from "../Modal/AddDialog/AddDialog";
import Loader from "../Loader";

import { addDialogsModalService } from "store/ModalService/AddDialogsModalService";
import { dialogsService } from "store/DialogsService/DialogsService";
import message from "static/img/message.svg";

const DialogsSearchContainer = () => {
  useEffect(() => {
    dialogsService.isLoading = true;
    dialogsService.getAllDialogs().then(() => {
      dialogsService.isLoading = false;
    });
  }, []);

  const onDialogItemClick = useCallback((id: string) => {
    addDialogsModalService.setDialogId(id);
    addDialogsModalService.open();
  }, []);

  if (dialogsService.isLoading)
    return (
      <DialogsWrapper>
        <CenterElement>
          <Loader />
        </CenterElement>
      </DialogsWrapper>
    );

  return (
    <>
      <DialogsWrapper>
        {dialogsService.dialogs.map((dialog) => {
          return (
            <DialogItem
              onDialogItemClick={onDialogItemClick}
              key={dialog._id}
              id={dialog._id}
              name={dialog.name}
              users={dialog.users}
              img={message}
            />
          );
        })}
      </DialogsWrapper>
      {addDialogsModalService.isOpen && (
        <Modal>
          <AddDialog />
        </Modal>
      )}
    </>
  );
};

export default observer(DialogsSearchContainer);
