import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  AuthContainer,
  AuthInput,
  AuthInputValidate,
  AuthLink,
  AuthSubmitButton,
  AuthWrap,
  ErrorText,
} from "../index";
import { authService } from "store/AuthService";
import { useValidateEmail } from "hooks/useValidateEmail";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const validateEmail = useValidateEmail(emailValue);

  const onSubmitRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailValue || !passwordValue) return;

    setPasswordValue("");
    await authService.loginAction({
      email: emailValue,
      password: passwordValue,
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
            type="email"
            validate={validateEmail}
          />
          {validateEmail && <ErrorText>Введите правильный email!</ErrorText>}
          <AuthInput
            placeholder="Пароль"
            type="password"
            onChange={(e) => setPasswordValue(e.target.value)}
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

export default Login;
