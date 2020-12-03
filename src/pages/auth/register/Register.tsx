import React, { FormEvent, useState } from "react";
import {
  AuthContainer,
  AuthInput,
  AuthInputValidate,
  AuthLink,
  AuthSubmitButton,
  AuthWrap,
  ErrorText,
} from "../index";
import { authService } from "../../../store/AuthService";
import { Link, useHistory } from "react-router-dom";
import { useValidatePassword } from "../../../hooks/useValidatePassword";
import { useValidateEmail } from "../../../hooks/useValidateEmail";

export const Register = () => {
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

  const onSubmitRequest = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!emailValue && !repeatPasswordValue && !name) return;
    setName("");
    setEmailValue("");
    setPasswordValue("");
    setRepeatPasswordValue("");
    await authService
      .registerAction({
        email: emailValue,
        password: repeatPasswordValue,
        fullname: name,
      })
      .then((res) => {
        if (res) history.push("/auth/login");
      });
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
            type="email"
          />
          {validateEmail && <ErrorText>Введите правильный email!</ErrorText>}
          <AuthInput
            placeholder="Введите имя"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <AuthInputValidate
            placeholder="Пароль"
            type="password"
            onChange={(e) => setPasswordValue(e.target.value)}
            value={passwordValue}
            validate={validatePassword}
          />
          <AuthInputValidate
            placeholder="Повторите Пароль"
            type="password"
            onChange={(e) => setRepeatPasswordValue(e.target.value)}
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
