import React, { FormEvent, useCallback, useState } from "react";
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
import { valueSetter } from "../../../utils/valueDecorator";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const validateEmail = useValidateEmail(emailValue);

  const onSubmitData = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailValue || !passwordValue) return;

    setPasswordValue("");
    await authService.loginAction({
      email: emailValue,
      password: passwordValue,
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
            type="email"
            validate={validateEmail}
          />
          {validateEmail && <ErrorText>Введите правильный email!</ErrorText>}
          <AuthInput
            placeholder="Пароль"
            type="password"
            onChange={valueSetter(setEmailValue)}
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
