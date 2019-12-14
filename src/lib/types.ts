export type Mode = 'view' | 'edit' | 'loading';
export type OnChange<TValue> = (value: TValue) => void;
export type SetMode = (mode: Mode) => void;

export interface IFieldProperties<TValue = any> {
  type: string;
  value: TValue;
  mode?: Mode;
}

export interface IFieldCallbacks<TValue> {
  onChangeAsync?: (apply: OnChange<TValue>, setMode: SetMode) => OnChange<TValue>;
  validate?: (value: TValue) => null | string[];
}

export type FieldExtra<TProperties extends IFieldProperties> = IFieldProperties<TProperties['value']> & IFieldCallbacks<TProperties['value']> & {
  name: string;
  mode: Mode;
  errors: null | string[];
  onChange: OnChange<TProperties['value']>;
  onValidate?: () => null | string[];
  setMode: SetMode;
};

export type FieldsInitial = Record<string, IFieldProperties>;

export type FieldsCallbacks<TInitial extends FieldsInitial> = Partial<{
  [TKey in keyof TInitial]: IFieldCallbacks<TInitial[TKey]['value']>;
}>;

export type FieldsExtra<TInitials extends FieldsInitial> = {
  [TKey in keyof TInitials]: FieldExtra<TInitials[TKey]>
};
