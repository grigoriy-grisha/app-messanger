import { Redirect, Switch } from "react-router-dom";
import { Main } from "../pages/main/Main";
import { Auth } from "../pages/auth";
import React from "react";
import authService from "../store/AuthService";
import { observer } from "mobx-react-lite";

const Routes = () => {
  console.log(authService.isAuth);
  return (
    <div className="App">
      <Switch>
        {authService.isAuth ? (
          <Main />
        ) : (
          <>
            <Auth />
            <Redirect from="/" to="/auth/register" />
          </>
        )}
      </Switch>
    </div>
  );
};

export default observer(Routes);
