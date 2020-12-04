export function valueSetter(setter: (str: string) => void) {
  return (e: any) => {
    setter(e.target.value);
  };
}
