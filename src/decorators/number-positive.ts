import { validator } from '../util/validator';
import { FieldValidator } from '../models/field-validator';

export function NumberPositive(_: any, name: string) {
  const actualValidation = validator[name];
  const fieldValidator: FieldValidator = {
    type: 'numberPositive',
    isValid: true,
    errorMessage: 'Number must be major then zero',
  };

  validator[name] = actualValidation
    ? [...actualValidation, fieldValidator]
    : [fieldValidator];
}
