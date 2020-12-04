import { useEffect, useState } from "react";

export function useValidateEmail(emailValue: string) {
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    const match = emailValue.match(/@/);
    if (match) setValidEmail(false);
    if (emailValue && !match) setValidEmail(true);
  }, [emailValue]);

  return validEmail;
}
