export interface FormField {
  error?: boolean;
  value: string | number;
}

export interface Form {
  [name: string]: FormField;
}
