import React, { useEffect } from "react";
import { dialogsService } from "../../store/DialogsService";
import { cookie } from "../../utils/cookie";
import { cookiesService } from "../../store/CookiesService";

export const RedirectPage = () => {
  useEffect(() => {
    const postData = {
      dialog: cookie.get("dialogId"),
    };
    dialogsService.addDialogs(postData).then(() => {
      cookie.delete("dialogId");
      cookiesService.removeCookie("redirect");
    });
  });

  return <div>redirect</div>;
};
