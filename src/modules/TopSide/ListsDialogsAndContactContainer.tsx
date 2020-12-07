import React, { useCallback } from "react";
import styled from "styled-components";

import { changeModeService } from "store/DialogsService/ChangeModeService";
import messageIcon from "static/img/message.svg";
import chatIcon from "static/img/chat.svg";

import { ImgBlock } from "./TopSide";
import { SearchDialogsModeEnum } from "../../types/SearchDialogsModeType";
import { observer } from "mobx-react-lite";

const ListsDialogsAndContactWrap = styled.div`
  border-bottom: 1px solid #dddddd;
  width: 100%;
  height: 7%;
  display: flex;
`;

interface ListsTypeInterface {
  isActive: boolean;
}

const ListType = styled.div<ListsTypeInterface>`
  width: 50%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: ${({ isActive }) => (isActive ? "#f3f7ff" : "#ffffff")}};
  &:hover {
    background: #f3f7ff;
  }
`;

const ListsDialogsAndContactContainer = () => {
  const closeSearchDialogsMode = useCallback(() => {
    changeModeService.toggleSearchDialogsMode(SearchDialogsModeEnum.MY_DIALOGS);
  }, []);

  const openSearchDialogsMode = useCallback(() => {
    changeModeService.toggleSearchDialogsMode(
      SearchDialogsModeEnum.SEARCH_DIALOGS
    );
  }, []);

  return (
    <ListsDialogsAndContactWrap>
      <ListType
        isActive={
          SearchDialogsModeEnum.SEARCH_DIALOGS ===
          changeModeService.selectedDialogMode
        }
        onClick={openSearchDialogsMode}
      >
        <ImgBlock src={messageIcon} alt="messageIcon" />
        Список Диалогов
      </ListType>
      <ListType
        isActive={
          SearchDialogsModeEnum.MY_DIALOGS ===
          changeModeService.selectedDialogMode
        }
        onClick={closeSearchDialogsMode}
      >
        <ImgBlock src={chatIcon} alt="chatIcon" />
        Мои диалоги
      </ListType>
    </ListsDialogsAndContactWrap>
  );
};

export default React.memo(observer(ListsDialogsAndContactContainer));
