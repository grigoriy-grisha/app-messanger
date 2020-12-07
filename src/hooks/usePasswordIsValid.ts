import { useEffect, useState } from "react";

export function usePasswordIsNotValid(
  password: string,
  repeatPassword: string
) {
  const [passwordAreEqual, setEqualPassword] = useState(false);
  useEffect(() => {
    if (!password && !repeatPassword) {
      setEqualPassword(false);
      return;
    }
    if (password !== repeatPassword) {
      setEqualPassword(true);
      return;
    }
    if (password === repeatPassword) setEqualPassword(false);
  }, [repeatPassword, password]);

  return passwordAreEqual;
}
