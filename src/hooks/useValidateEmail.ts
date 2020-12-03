import { useEffect, useState } from "react";

export function useValidateEmail(emailValue: string) {
  const [validateEmail, setValidateEmail] = useState(false);

  useEffect(() => {
    const match = emailValue.match(/@/);
    if (match) return setValidateEmail(false);
    if (emailValue && !match) setValidateEmail(true);
  }, [emailValue]);

  return validateEmail;
}
