import styled from "styled-components";
import { Wrapper } from "../Modal";
import React, { useEffect, useRef } from "react";
import { dialogInfoService } from "../../../store/ModalService/DialogInfoService";
import { dialogsService } from "../../../store/DialogsService/DialogsService";

const DialogInfoBlock = styled.div`
  width: 400px;
  height: 300px;
  padding: 20px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
  background: #fff;
  opacity: 1;
  display: flex;
  flex-direction: column;
`;

const LinkBlock = styled.div`
  padding: 20px;
`;

export const DialogInfoModal = () => {
  const linkRef = useRef(null);

  const closeModal = (e: any) => {
    if (!e.target.classList.contains("modal")) return;
    dialogInfoService.close();
  };

  return (
    <Wrapper ref={linkRef} onClick={(e) => closeModal(e)} className="modal">
      <DialogInfoBlock>
        <LinkBlock>
          Ссылка: {window.location.origin}/dialogs/
          {dialogsService.currentDialogId}
        </LinkBlock>
      </DialogInfoBlock>
    </Wrapper>
  );
};
