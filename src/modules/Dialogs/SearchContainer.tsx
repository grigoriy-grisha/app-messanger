import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { CenterElement } from "App";

import { dialogsService } from "store/DialogsService/DialogsService";
import message from "static/img/message.svg";

import { DialogsWrapper } from "./index";
import DialogItem from "./Item";
import AddDialog from "../../components/Modal/AddDialog/AddDialog";
import Loader from "../../components/Loader";

const SearchContainer = () => {
  const [openUp, setOpenUp] = useState(false);

  const toggleOpenModal = useCallback((state = false) => {
    setOpenUp(state);
  }, []);

  useEffect(() => {
    dialogsService.getAllDialogs();
  }, []);

  const onDialogItemClick = useCallback(() => {
    toggleOpenModal(true);
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
        {dialogsService.dialogs.map((dialog) => (
          <DialogItem
            key={dialog._id}
            id={dialog._id}
            name={dialog.name}
            users={dialog.users}
            img={message}
            onDialogItemClick={onDialogItemClick}
          />
        ))}
      </DialogsWrapper>
      {openUp && <AddDialog toggleOpenModal={toggleOpenModal} />}
    </>
  );
};

export default React.memo(observer(SearchContainer));
