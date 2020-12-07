import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { authService } from "store/AuthService";
import { alertService } from "store/AlertService";
import { messageService } from "store/MessagesService";
import { dialogsService } from "store/DialogsService/DialogsService";
import { valueDecorator } from "utils/decorators/valueDecorator";
import { preventedDecorator } from "utils/decorators/preventedDecorator";
import {
  AuthContainer,
  AuthInput,
  AuthLink,
  AuthSubmitButton,
  AuthWrap,
} from "../index";

const ChangePassword = () => {
  const history = useHistory();
  const [passwordValue, setPasswordValue] = useState("");

  const logoutClick = async () => {
    if (!passwordValue) return;

    const messagePasswordWasChanged = await authService.changePassword(
      passwordValue
    );

    alertService.showAlert(messagePasswordWasChanged);
    messageService.clearMessages();
    dialogsService.clearDialogs();
    await authService.logoutAction();
    history.push("/auth/login");
  };

  const onChangePasswordSubmit = useCallback(
    preventedDecorator(logoutClick),
    []
  );

  return (
    <AuthWrap>
      <AuthContainer>
        <form onSubmit={onChangePasswordSubmit}>
          <AuthInput
            placeholder="Пароль для изменения"
            type="password"
            onChange={valueDecorator(setPasswordValue)}
            value={passwordValue}
          />
          <AuthSubmitButton onClick={onChangePasswordSubmit}>
            Изменить Пароль
          </AuthSubmitButton>
          <Link to="/currentDialogs">
            <AuthLink>Вернуться обратно</AuthLink>
          </Link>
        </form>
      </AuthContainer>
    </AuthWrap>
  );
};

export default ChangePassword;
