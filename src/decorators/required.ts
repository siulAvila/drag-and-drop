import { validator } from '../util/validator';

export function Required(_: any, name: string) {
  const actualValidation = validator[name];
  const fieldValidator = {
    type: 'required',
    isValid: true,
    errorMessage: 'Required Field',
  };
  validator[name] = actualValidation
    ? [...actualValidation, fieldValidator]
    : [fieldValidator];
}
