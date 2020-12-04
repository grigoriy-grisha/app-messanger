import React, { FormEvent, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { authService } from "store/AuthService";
import { useValidatePassword } from "hooks/useValidatePassword";
import { useValidateEmail } from "hooks/useValidateEmail";
import {
  AuthContainer,
  AuthInput,
  AuthInputValidate,
  AuthLink,
  AuthSubmitButton,
  AuthWrap,
  ErrorText,
} from "../index";

import { alertService } from "../../../store/AlertService";
import { valueSetter } from "../../../utils/valueDecorator";

const Register = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repeatPasswordValue, setRepeatPasswordValue] = useState("");

  const validatePassword = useValidatePassword(
    passwordValue,
    repeatPasswordValue
  );
  const validateEmail = useValidateEmail(emailValue);

  const onSubmitData = (e: FormEvent) => {
    e.preventDefault();
    if (!emailValue || !passwordValue || !repeatPasswordValue || !name) {
      alertService.showAlert("Заполните все поля!");
      return;
    }
    if (passwordValue !== repeatPasswordValue) return;

    authService
      .registerAction({
        email: emailValue,
        password: repeatPasswordValue,
        fullname: name,
      })
      .then((res) => {
        setName("");
        setEmailValue("");
        setPasswordValue("");
        setRepeatPasswordValue("");

        if (res) history.push("/auth/login");
      });
  };

  const onSubmitRequest = useCallback((e: FormEvent) => {
    onSubmitData(e);
  }, []);

  return (
    <AuthWrap>
      <AuthContainer>
        <form onSubmit={onSubmitRequest}>
          <AuthInputValidate
            placeholder="Введите почту"
            onChange={valueSetter(setEmailValue)}
            value={emailValue}
            validate={validateEmail}
            type="email"
          />
          {validateEmail && <ErrorText>Введите правильный email!</ErrorText>}
          <AuthInput
            placeholder="Введите имя"
            onChange={valueSetter(setName)}
            value={name}
          />
          <AuthInputValidate
            placeholder="Пароль"
            type="password"
            onChange={valueSetter(setPasswordValue)}
            value={passwordValue}
            validate={validatePassword}
          />
          <AuthInputValidate
            placeholder="Повторите Пароль"
            type="password"
            onChange={valueSetter(setRepeatPasswordValue)}
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
