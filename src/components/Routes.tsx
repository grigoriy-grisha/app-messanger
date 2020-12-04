import { Redirect, Switch, Route } from "react-router-dom";
import React from "react";
import { observer } from "mobx-react-lite";
import Auth from "pages/auth";
import Main from "pages/main/Main";
import ChangePassword from "pages/auth/ChangePassword/ChangePassword";
import Loader from "./Loader";
import { CenterElement } from "App";
import { authService } from "store/AuthService";

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
      {authService.getToken ? (
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
