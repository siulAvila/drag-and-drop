import { FieldValidator } from './field-validator';
export interface Validator {
  [name: string]: FieldValidator[];
}
