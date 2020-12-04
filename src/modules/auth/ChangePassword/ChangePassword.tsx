import React, { FormEvent, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { authService } from "store/AuthService";
import { alertService } from "store/AlertService";
import { messageService } from "store/MessagesService";
import { dialogsService } from "store/DialogsService/DialogsService";

import {
  AuthContainer,
  AuthInput,
  AuthLink,
  AuthSubmitButton,
  AuthWrap,
} from "../index";
import { valueSetter } from "../../../utils/valueDecorator";

const ChangePassword = () => {
  const history = useHistory();
  const [passwordValue, setPasswordValue] = useState("");

  const logoutClick = async (e: FormEvent) => {
    e.preventDefault();
    if (!passwordValue) return;

    const message = await authService.changePassword(passwordValue);

    alertService.showAlert(message);
    messageService.clearMessages();
    dialogsService.clearDialogs();
    authService.logoutAction();
    history.push("/auth/login");
  };

  const onChangePasswordSubmit = useCallback(
    (e: FormEvent) => logoutClick(e),
    []
  );

  return (
    <AuthWrap>
      <AuthContainer>
        <form onSubmit={onChangePasswordSubmit}>
          <AuthInput
            placeholder="Пароль для изменения"
            type="password"
            onChange={valueSetter(setPasswordValue)}
            value={passwordValue}
          />
          <AuthSubmitButton onClick={onChangePasswordSubmit}>
            Изменить Пароль
          </AuthSubmitButton>
          <Link to="/dialogs">
            <AuthLink>Вернуться обратно</AuthLink>
          </Link>
        </form>
      </AuthContainer>
    </AuthWrap>
  );
};

export default ChangePassword;
