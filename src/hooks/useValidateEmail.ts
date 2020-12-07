import { useEffect, useState } from "react";

export function useEmailIsNotValid(emailValue: string) {
  const [isNotValidEmail, setIsNotValidEmail] = useState(false);

  useEffect(() => {
    const match = emailValue.match(/@/);
    if (match) {
      setIsNotValidEmail(false);
      return;
    }
    if (emailValue) {
      setIsNotValidEmail(true);
      return;
    }
  }, [emailValue]);

  return isNotValidEmail;
}
