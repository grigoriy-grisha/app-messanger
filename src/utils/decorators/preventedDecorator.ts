export function preventedDecorator(func: Function) {
  return (e: any, ...args: any) => {
    e.preventDefault();
    func(args);
  };
}
