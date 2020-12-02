import React, { useEffect } from "react";
import { dialogsService } from "../../store/DialogsService";
import { cookie } from "../../utils/cookie";
import { cookiesService } from "../../store/CookiesService";
import { useHistory } from "react-router-dom";
import { addDialogsModalService } from "../../store/ModalService/AddDialogsModalService";
import { listModeService } from "../../store/DialogsService/ListModeService";

export const RedirectPage = () => {
  const history = useHistory();
  useEffect(() => {
    const postData = {
      dialog: cookie.get("dialogId"),
    };
    dialogsService.userAddInDialog(postData).then((res) => {
      cookie.delete("dialogId");
      console.log(res);
      cookiesService.removeCookie("redirect");
      if (res) {
        listModeService.changeDialogsMode(false);
        history.push("/" + res);
      } else {
        addDialogsModalService.close();
        addDialogsModalService.removeDialogId();
        history.push("/");
      }
    });
  });

  return <div>redirect</div>;
};
