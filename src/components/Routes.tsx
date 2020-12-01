import { Redirect, Switch, Route } from "react-router-dom";
import { Main } from "../pages/main/Main";
import { Auth } from "../pages/auth";
import React, { useEffect, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { authService } from "../store/AuthService";
import { RedirectPage } from "../pages/redirect/RedirectPage";
import { cookiesService } from "../store/CookiesService";

const Routes = observer(() => {
  useEffect(() => {
    cookiesService.getCookie();
  }, []);

  if (cookiesService.redirect) {
    return <RedirectPage />;
  }
  return (
    <div className="App">
      {authService.isAuth ? (
        <>
          <Redirect from="/auth/" to="/" />
          <Switch>
            <Route path={["/:id", "/"]} exact>
              <Main />
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
});

export default Routes;
