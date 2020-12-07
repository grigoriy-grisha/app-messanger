import { ChangeEvent } from "react";

export function valueDecorator(setter: (value: string) => void) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };
}
