import React from "react";
import styled from "styled-components";

import { dialogsService } from "store/DialogsService/DialogsService";

import { Wrapper } from "../Modal";

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

export const DialogInfoModal = () => {
  return (
    <Wrapper>
      <DialogInfoBlock>
        <LinkBlock>
          Ссылка: {window.location.origin}/dialogs/
          {dialogsService.currentDialogId}
        </LinkBlock>
      </DialogInfoBlock>
      <div>x</div>
    </Wrapper>
  );
};
