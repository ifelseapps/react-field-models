import { Reducer, useReducer } from 'react';
import { FieldsCallbacks, FieldsExtra, FieldsInitial, Mode } from './types';
import { getObjectKeys, isFunction } from './utils';

type Action =
  | { type: 'set_value', payload: { name: string, value: any } }
  | { type: 'set_mode', payload: { name: string, mode: Mode } }
  | { type: 'validate', payload: { name: string } }

const reducer: Reducer<FieldsExtra<FieldsInitial>, Action> = (prevState, action) => {
  switch (action.type) {
    case 'set_mode':
      return {
        ...prevState,
        [action.payload.name]: {
          ...prevState[action.payload.name],
          mode: action.payload.mode
        }
      };

    case 'set_value':
      return {
        ...prevState,
        [action.payload.name]: {
          ...prevState[action.payload.name],
          value: action.payload.value
        }
      };

    case 'validate':
      return {
        ...prevState,
        [action.payload.name]: {
          ...prevState[action.payload.name],
          errors: prevState[action.payload.name].validate(prevState[action.payload.name].value)
        }
      };

    default:
      return prevState;
  }
};

export function useFieldsModel<TInitial extends FieldsInitial>(initial: TInitial, callbacks: FieldsCallbacks<TInitial>): FieldsExtra<TInitial> {
  const [fields, dispatch] = useReducer<Reducer<FieldsExtra<TInitial>, Action>>(
    reducer as Reducer<FieldsExtra<TInitial>, Action>,
    {} as FieldsExtra<TInitial>,
    (() => {
      return getObjectKeys(initial).reduce<FieldsExtra<TInitial>>((result, name) => {
        const current = initial[name];
        const currentCallbacks = callbacks[name];
        const onChange = value => dispatch({ type: 'set_value', payload: { name: name as string, value } });
        const onValidate = () => dispatch({ type: 'validate', payload: { name: name as string } });
        const setMode = mode => dispatch({ type: 'set_mode', payload: { name: name as string, mode } });

        return {
          ...result,
          [name]: {
            ...current,
            ...currentCallbacks,
            name,
            mode: current.mode || 'edit',
            errors: isFunction(currentCallbacks.validate) ? currentCallbacks.validate(current.value) : null,
            onChange: isFunction(currentCallbacks.onChangeAsync) ? currentCallbacks.onChangeAsync(onChange, setMode) : onChange,
            onValidate: isFunction(currentCallbacks.validate) ? onValidate : undefined,
            setMode,
          }
        };
      }, {} as FieldsExtra<TInitial>)
    }) as any
  );

  return fields;
}
