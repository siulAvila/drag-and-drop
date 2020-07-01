import { Form } from '../models/form';
import { Validator } from '../models/validator';
import { ValidatorFunctions } from '../models/validator-functions';
import { FieldValidator } from '../models/field-validator';

export const validator: Validator = {} as Validator;

export const validatorFunctions: ValidatorFunctions = {
  required: (value: string | number) => {
    return String(value).trim() != '' ? true : false;
  },
  numberPositive: (value: number) => {
    return value > 0 ? true : false;
  },
};

export function formValidateFields(form: Form) {
  for (const key in validator) {
    if (validator.hasOwnProperty(key)) {
      const element: FieldValidator[] = validator[key];

      for (const fieldValidator of element) {
        const field = form[key];
        const type = fieldValidator.type;
        const validatorFn = validatorFunctions[type];
        const isValid = validatorFn(field.value);
        field.error = !isValid;
        form.valid = isValid;
      }
    }
  }
}
