import React, { FormEvent, useState } from "react";
import {
  AuthContainer,
  AuthInputValidate,
  AuthLink,
  AuthSubmitButton,
  AuthWrap,
  ErrorText,
} from "../index";

import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useValidateEmail } from "../../../hooks/useValidateEmail";
import authService from "../../../store/AuthService";

interface IProps {}

export const Login: React.FC<IProps> = (AuthService) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const validateEmail = useValidateEmail(emailValue);

  const onSubmitRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailValue && !passwordValue) return;

    const body = {
      email: emailValue,
      password: passwordValue,
    };

    setEmailValue("");
    setPasswordValue("");

    await authService
      .loginAction(body)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <AuthWrap>
      <AuthContainer>
        <form onSubmit={onSubmitRequest}>
          <AuthInputValidate
            placeholder="Введите почту"
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
            validate={validateEmail}
          />
          {validateEmail ? (
            <ErrorText>Введите правильный email!</ErrorText>
          ) : null}
          <AuthInputValidate
            placeholder="Пароль"
            type="password"
            onChange={(e) => setPasswordValue(e.target.value)}
            value={passwordValue}
            validate={!passwordValue}
          />
          {validateEmail ? <ErrorText>Введите пароль!</ErrorText> : null}
          <AuthSubmitButton>Войти в аккаунт</AuthSubmitButton>
        </form>
        <Link to="/auth/register">
          <AuthLink>Зарегестрироваться</AuthLink>
        </Link>
      </AuthContainer>
    </AuthWrap>
  );
};

export default observer(Login);
