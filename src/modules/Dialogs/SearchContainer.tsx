import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Loader from "components/Loader";

import { dialogsService } from "store/DialogsService/DialogsService";
import message from "static/img/message.svg";

import { DialogsWrapper } from "./index";
import DialogItem from "./Item";
import AddToDialog from "../AddToDialog/AddToDialog";
import { CenterElement } from "../../components/StyleComponents/GlobalStyleComponents";

const SearchContainer = () => {
  const [opened, setOpened] = useState(false);
  const [selectedDialogId, setSelectedDialogId] = useState<string | null>(null);
  const onCloseModal = useCallback(() => {
    setSelectedDialogId(null);
    setOpened(false);
  }, []);

  const onOpenModal = useCallback((id: string) => {
    setSelectedDialogId(id);
    setOpened(true);
  }, []);

  useEffect(() => {
    dialogsService.getAllDialogs();
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
        {dialogsService.currentDialogs.map((dialog) => (
          <DialogItem
            key={dialog._id}
            id={dialog._id}
            name={dialog.name}
            users={dialog.users}
            img={message}
            onDialogItemClick={onOpenModal}
          />
        ))}
      </DialogsWrapper>
      {opened && (
        <AddToDialog
          selectedDialogId={selectedDialogId}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};

export default React.memo(observer(SearchContainer));
