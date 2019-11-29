export interface IFieldInitial<TValue = any> {
  value: TValue;
  onChange?: (value: TValue, apply?: () => void) => void;
  onValidate?: (value: TValue) => void;
}

export type FieldExtra<TField extends IFieldInitial> = TField & {
  name: string;
  valid: boolean;
  errors: string[];
  onChange: (value: TField['value']) => void;
};

export type FieldsInitial = Record<string, IFieldInitial>;

export type FieldsExtra<TFields extends FieldsInitial> = {
  [TKey in keyof TFields]: FieldExtra<TFields[TKey]>
};
