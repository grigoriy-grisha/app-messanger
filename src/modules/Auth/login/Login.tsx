import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { authService } from "store/AuthService";
import { useEmailIsNotValid } from "hooks/useValidateEmail";
import { valueDecorator } from "utils/decorators/valueDecorator";

import {
  AuthContainer,
  AuthInput,
  AuthInputValidate,
  AuthLink,
  AuthSubmitButton,
  AuthWrap,
  ErrorText,
} from "../index";
import { preventedDecorator } from "utils/decorators/preventedDecorator";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const validateEmail = useEmailIsNotValid(emailValue);

  const onSubmitData = async () => {
    if (validateEmail || !passwordValue) return;

    setPasswordValue("");
    await authService.login({
      email: emailValue,
      password: passwordValue,
    });
  };

  const onSubmitRequest = useCallback(preventedDecorator(onSubmitData), [
    onSubmitData,
  ]);

  return (
    <AuthWrap>
      <AuthContainer>
        <form onSubmit={onSubmitRequest}>
          <AuthInputValidate
            placeholder="Введите почту"
            onChange={valueDecorator(setEmailValue)}
            value={emailValue}
            type="email"
            validate={validateEmail}
          />
          {validateEmail && <ErrorText>Введите правильный email!</ErrorText>}
          <AuthInput
            placeholder="Пароль"
            type="password"
            onChange={valueDecorator(setPasswordValue)}
            value={passwordValue}
          />
          <AuthSubmitButton>Войти в аккаунт</AuthSubmitButton>
        </form>
        <Link to="/auth/register">
          <AuthLink>Зарегестрироваться</AuthLink>
        </Link>
      </AuthContainer>
    </AuthWrap>
  );
};

export default React.memo(Login);
