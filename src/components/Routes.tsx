import { Redirect, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RedirectPage } from "../pages/redirect/RedirectPage";
import { Main } from "../pages/main/Main";
import Auth from "../pages/auth";
import { authService } from "../store/AuthService";
import { cookiesService } from "../store/CookiesService";
import { ChangePassword } from "../pages/auth/changePassword/ChangePassword";

const Routes = () => {
  useEffect(() => {
    cookiesService.getCookie();
  }, []);

  if (cookiesService.redirect) return <RedirectPage />;

  return (
    <div className="App">
      {authService.isAuth ? (
        <>
          <Switch>
            <Route path={["/dialogs/:id", "/dialogs"]} exact>
              <Main />
            </Route>
            <Route path="/changePassword">
              <ChangePassword />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <Auth />
        </>
      )}
    </div>
  );
};

export default observer(Routes);
