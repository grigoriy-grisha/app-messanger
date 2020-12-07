import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import { observer } from "mobx-react-lite";
import Auth from "modules/Auth";

import ChangePassword from "modules/Auth/ChangePassword/ChangePassword";

import { authService } from "store/AuthService";

import Loader from "components/Loader";
import Main from "modules/Main/Main";
import { CenterElement } from "components/StyleComponents/GlobalStyleComponents";

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
