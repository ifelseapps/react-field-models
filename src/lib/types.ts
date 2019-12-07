export type Mode = 'view' | 'edit' | 'loading';
export type OnChange<TValue> = (value: TValue) => void;
export type SetMode = (mode: Mode) => void;

export interface IFieldInitial<TValue = any> {
  type: string;
  value: TValue;
  mode?: Mode;
  onChangeAsync?: (apply: OnChange<TValue>, setMode: SetMode) => OnChange<TValue>;
  onValidate?: (value: TValue) => null | string[];
}

export type FieldExtra<TField extends IFieldInitial> = TField & {
  name: string;
  mode: Mode;
  errors: null | string[];
  onChange: OnChange<TField['value']>;
  setMode: SetMode;
};

export type FieldsInitial = Record<string, IFieldInitial>;

export type FieldsExtra<TFields extends FieldsInitial> = {
  [TKey in keyof TFields]: FieldExtra<TFields[TKey]>
};
