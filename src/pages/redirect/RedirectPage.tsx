import React, { useEffect } from "react";
import { dialogsService } from "../../store/DialogsService/DialogsService";
import { cookie } from "../../utils/cookie";
import { cookiesService } from "../../store/CookiesService";
import { useHistory } from "react-router-dom";
import { changeModeService } from "../../store/DialogsService/ChangeModeService";
import socket from "../../utils/socket";

export const RedirectPage = () => {
  const history = useHistory();
  useEffect(() => {
    dialogsService
      .userAddInDialog({ dialog: cookie.get("dialogId") })
      .then((res) => {
        cookie.delete("dialogId");
        cookiesService.removeCookie("redirect");
        changeModeService.changeDialogsMode(false);

        if (res) {
          socket.emit("DIALOGS:JOIN", res);
          return history.push(`/dialogs/${res}`);
        }

        history.push("/");
      });
  });

  return <div />;
};
