import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Modal from "components/Modal";

import { authService } from "store/AuthService";
import { dialogsService } from "store/DialogsService/DialogsService";
import { messageService } from "store/MessagesService";

import createDialogIcon from "static/img/createDialog.svg";
import keyIcon from "static/img/key.svg";
import logoutIcon from "static/img/logout.svg";

import CreateDialog from "./CreateDialog/CreateDialog";
import { ImgBlock } from "./TopSide/TopSide";

const AsideBarContainer = styled.div`
  position: fixed;
  left: -50px;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 70px;
  transition: 0.3s;
  height: 100vh;
  z-index: 999;
  &:hover {
    z-index: 999;
    left: 0px;
  }
`;

const AsideBarBlock = styled.div`
  height: 70vh;
  width: 70px;
  z-index: 999;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1204);
  border-radius: 3px;
`;

const AsideItem = styled(ImgBlock)`
  box-sizing: content-box;
  padding: 19px;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;
  &:hover {
    background: #f3f7ff;
  }
`;

const AsideBar = () => {
  const history = useHistory();
  const [createDialogOpened, setCreateDialogOpened] = useState(false);

  const logoutClick = useCallback(() => {
    messageService.clearMessages();
    dialogsService.clearDialogs();
    authService.logoutAction();
  }, []);

  const changePasswordClick = useCallback(() => {
    history.push("/changePassword");
  }, [history]);

  const closeCreateDialog = useCallback(() => {
    setCreateDialogOpened(false);
  }, []);

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpened(true);
  }, []);

  return (
    <AsideBarContainer>
      <AsideBarBlock>
        <AsideItem
          src={logoutIcon}
          alt="createDialogIcon"
          onClick={logoutClick}
        />
        <AsideItem
          src={createDialogIcon}
          alt="createDialogIcon"
          onClick={openCreateDialog}
        />
        <AsideItem src={keyIcon} alt="keyIcon" onClick={changePasswordClick} />
      </AsideBarBlock>

      {createDialogOpened && (
        <Modal>
          <CreateDialog closeCreateDialog={closeCreateDialog} />
        </Modal>
      )}
    </AsideBarContainer>
  );
};

export default React.memo(observer(AsideBar));
