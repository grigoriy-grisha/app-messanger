import { Redirect, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Main } from "../pages/main/Main";
import Auth from "../pages/auth";
import { authService } from "../store/AuthService";
import { ChangePassword } from "../pages/auth/changePassword/ChangePassword";
import { Loader } from "./Loader";
import { CenterElement } from "../App";

const Routes = () => {
  if (authService.loading)
    return (
      <CenterElement>
        <Loader />
      </CenterElement>
    );
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
