import { ChangeEvent } from "react";

export const checkedDecorator = (setter: (check: boolean) => void) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.checked);
  };
};
