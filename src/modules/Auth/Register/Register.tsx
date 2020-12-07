import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { authService } from "store/AuthService";
import { alertService } from "store/AlertService";
import { valueDecorator } from "utils/decorators/valueDecorator";
import { preventedDecorator } from "utils/decorators/preventedDecorator";
import { usePasswordIsNotValid } from "hooks/usePasswordIsValid";
import { useEmailIsNotValid } from "hooks/useValidateEmail";

import {
  AuthContainer,
  AuthInput,
  AuthInputValidate,
  AuthLink,
  AuthSubmitButton,
  AuthWrap,
  ErrorText,
} from "../index";

const Register = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [repeatPasswordValue, setRepeatPassword] = useState("");

  const validatePassword = usePasswordIsNotValid(
    passwordValue,
    repeatPasswordValue
  );
  const validateEmail = useEmailIsNotValid(emailValue);

  const onSubmitData = async () => {
    if (!validateEmail || !validatePassword || !name) {
      alertService.showAlert("Заполните все поля!");
      return;
    }

    const result = await authService.register({
      email: emailValue,
      password: repeatPasswordValue,
      fullname: name,
    });

    setName("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");

    if (result) history.push("/auth/login");
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
            onChange={valueDecorator(setEmail)}
            value={emailValue}
            validate={validateEmail}
            type="email"
          />
          {validateEmail && <ErrorText>Введите правильный email!</ErrorText>}
          <AuthInput
            placeholder="Введите имя"
            onChange={valueDecorator(setName)}
            value={name}
          />
          <AuthInputValidate
            placeholder="Пароль"
            type="password"
            onChange={valueDecorator(setPassword)}
            value={passwordValue}
            validate={validatePassword}
          />
          <AuthInputValidate
            placeholder="Повторите Пароль"
            type="password"
            onChange={valueDecorator(setRepeatPassword)}
            value={repeatPasswordValue}
            validate={validatePassword}
          />
          {validatePassword && <ErrorText>Пароли должны совпадать!</ErrorText>}
          <AuthSubmitButton type="submit" onSubmit={onSubmitRequest}>
            Войти в аккаунт
          </AuthSubmitButton>
          <Link to="/auth/login">
            <AuthLink>Войти в аккаунт</AuthLink>
          </Link>
        </form>
      </AuthContainer>
    </AuthWrap>
  );
};

export default Register;
