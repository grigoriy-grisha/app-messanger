import { useEffect, useState } from "react";

export function useValidatePassword(password: string, repeatPassword: string) {
  const [equalPassword, setEqualPassword] = useState(false);
  useEffect(() => {
    if (password !== repeatPassword) setEqualPassword(true);
    if (password && password === repeatPassword) setEqualPassword(false);
    if (!password && !repeatPassword) setEqualPassword(false);
  }, [repeatPassword, password]);

  return equalPassword;
}
