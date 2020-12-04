import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import CreateDialog from "./Modal/CreateDialog/CreateDialog";
import Modal from "./Modal/Modal";
import { ImgBlock } from "./TopSide/TopSide";

import { createDialogModalService } from "store/ModalService/CreateDialogModalService";
import { authService } from "store/AuthService";
import { dialogsService } from "store/DialogsService/DialogsService";
import { messageService } from "store/MessagesService";

import createDialog from "static/img/createDialog.svg";
import key from "static/img/key.svg";
import logout from "static/img/logout.svg";

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

  return (
    <AsideBarContainer>
      <AsideBarBlock>
        <AsideItem
          src={logout}
          alt="createDialog"
          onClick={() => {
            messageService.clearMessages();
            dialogsService.clearDialogs();
            authService.logoutAction();
          }}
        />
        <AsideItem
          src={createDialog}
          alt="createDialog"
          onClick={createDialogModalService.open}
        />
        <AsideItem
          src={key}
          alt="key"
          onClick={() => history.push("/ChangePassword")}
        />
      </AsideBarBlock>

      {createDialogModalService.isOpen && (
        <Modal>
          <CreateDialog />
        </Modal>
      )}
    </AsideBarContainer>
  );
};

export default observer(AsideBar);
