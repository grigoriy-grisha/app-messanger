import {
  AuthContainer,
  AuthInput,
  AuthLink,
  AuthSubmitButton,
  AuthWrap,
  ErrorText,
} from "../index";
import React, { FormEvent, useState } from "react";
import { authService } from "../../../store/AuthService";
import { alertService } from "../../../store/AlertService";
import { Link, useHistory } from "react-router-dom";
import { messageService } from "../../../store/MessagesService";
import { dialogsService } from "../../../store/DialogsService/DialogsService";

export const ChangePassword = () => {
  const history = useHistory();
  const [passwordValue, setPasswordValue] = useState("");

  const onChangePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!passwordValue) return;
    authService.changePassword(passwordValue).then((mes: string) => {
      alertService.showAlert(mes);
      messageService.clearMessages();
      dialogsService.clearDialogs();
      authService.logoutAction();
      history.push("/auth/login");
    });
  };

  return (
    <AuthWrap>
      <AuthContainer>
        <form onSubmit={onChangePasswordSubmit}>
          <AuthInput
            placeholder="Пароль для изменения"
            type="password"
            onChange={(e) => setPasswordValue(e.target.value)}
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
