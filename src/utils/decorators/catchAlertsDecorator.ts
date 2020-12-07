import { alertService } from "../../store/AlertService";

export function catchAlertsDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const classMethod: Function = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      return await classMethod.apply(this, args);
    } catch (e) {
      alertService.showAlert(e.message);
    }
  };
}
