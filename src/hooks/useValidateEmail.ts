import { useEffect, useState } from "react";

export function useValidateEmail(emailValue: string) {
  const [validateEmail, setValidateEmail] = useState(false);

  useEffect(() => {
    const match = emailValue.match(/@/);

    if (match) {
      setValidateEmail(false);
    } else if (!validateEmail && !match) {
      setValidateEmail(true);
    }
  }, [emailValue]);

  return validateEmail;
}
