import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import { observer } from "mobx-react-lite";
import Auth from "modules/auth";
import Main from "modules/main/Main";
import ChangePassword from "modules/auth/ChangePassword/ChangePassword";
import { CenterElement } from "App";
import { authService } from "store/AuthService";

import Loader from "../components/Loader";

const Routes = () => {
  if (authService.loading) {
    return (
      <CenterElement>
        <Loader />
      </CenterElement>
    );
  }

  return (
    <div className="App">
      {authService.isAuth ? (
        <>
          <Switch>
            <Route path={["/dialogs/:id", "/dialogs"]}>
              <Main />
            </Route>
            <Route path="/changePassword">
              <ChangePassword />
            </Route>
            <Redirect to="/dialogs" />
          </Switch>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default observer(Routes);
