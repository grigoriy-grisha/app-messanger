import {Redirect, Switch, Route} from "react-router-dom";
import {Main} from "../pages/main/Main";
import {Auth} from "../pages/auth";
import React from "react";
import {observer} from "mobx-react-lite";
import {authService} from "../store/AuthService";
import {RedirectPage} from "../pages/redirect/RedirectPage";

const Routes = observer(() => {
  return (
    <div className="App">
      {authService.isAuth ? (
        <Switch>
          <Route path="/redirect" exact={true}>
            <RedirectPage/>
          </Route>
          <Route path={["/:id", '/']}>
            <Main/>
          </Route>
        </Switch>
      ) : (
        <>
          <Auth/>
          <Redirect from="/" to="/auth/register"/>
        </>
      )}
    </div>
  );
});

export default Routes;

