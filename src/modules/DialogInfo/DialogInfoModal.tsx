import React from "react";
import styled from "styled-components";
import { Wrapper } from "components/Modal";

import { dialogsService } from "store/DialogsService/DialogsService";
import { linkService } from "../../store/LinkService";

const DialogInfoBlock = styled.div`
  width: 560px;
  height: 100px;
  padding: 20px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04204);
  background: #fff;
  opacity: 1;
  display: flex;
  flex-direction: column;
`;

const LinkBlock = styled.div`
  padding: 20px;
  color: #999999;
`;

interface DialogInfoModalInterface {
  closeModalDialogInfo: () => void;
}

export const DialogInfoModal = ({
  closeModalDialogInfo,
}: DialogInfoModalInterface) => {
  return (
    <Wrapper>
      <DialogInfoBlock>
        <LinkBlock>
          Ссылка:
          {linkService.generateUrl(
            `/dialogs/${dialogsService.currentDialogId}`
          )}
        </LinkBlock>
      </DialogInfoBlock>
      <div onClick={closeModalDialogInfo}>x</div>
    </Wrapper>
  );
};
