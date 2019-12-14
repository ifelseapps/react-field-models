import React, { FC, useCallback, useEffect, useState } from 'react'
import { render } from 'react-dom';
import { FieldExtra, IFieldProperties } from './lib/types';
import { useFieldsModel } from './lib/useFieldsModel';

type InputProps = Partial<HTMLInputElement & { onChange: (value: string) => void, onBlur: () => void, errors: null | string[] }>;

const Input: FC<InputProps> = ({ onChange, onBlur, name, value, errors }) =>
  <input className={'form-control' + (errors ? ' is-invalid' : '')} name={name} value={value} type="text" onChange={e => onChange(e.target.value)} onBlur={onBlur}/>;

const CustomInput: FC<{ label: string, field: FieldExtra<IFieldProperties<string>> }> = ({ label, field }) => {
  const [value, setValue] = useState<string>(field.value);

  const editHandler = useCallback(() => field.setMode('edit'), []);
  const cancelHandler = useCallback(() => {
    setValue(field.value);
    field.setMode('view');
  }, []);
  const applyHandler = useCallback(() => {
    field.onChange(value);
    if (!field.onChangeAsync) {
      field.setMode('view');
    }
  }, [value]);

  switch (field.mode) {
    case 'view':
      return (
        <div className="form-group">
          <span>{label}:</span>
          {field.value}
          <button className="btn btn-link" onClick={editHandler}>Edit</button>
        </div>
      );
    case 'edit':
      return (
        <div className="form-group">
          <label>
            <span>{label}:</span>
            <Input value={value} onChange={setValue} errors={field.errors}/>
          </label>
          <button onClick={applyHandler}>Apply</button>
          <button onClick={cancelHandler}>Cancel</button>
        </div>
      );
    case 'loading':
      return (
        <div className="form-group">
          <span>{label}:</span>
          Save...
        </div>
      );
    default:
      return null;
  }
};

const App: FC = () => {
  const fields = useFieldsModel({
    name: {
      type: 'input',
      value: 'Василий Фтулкин',
      mode: 'view',
    },
    email: {
      type: 'input',
      value: ''
    }
  }, {
    name: {
      validate: value => {

        console.log('__VALIDATE__', value);

        if (!value.length) {
          return ['Поле обязательно для заполнения'];
        }

        return null;
      },
      onChangeAsync: (apply, setMode) => value => {
        setMode('loading');
        setTimeout(() => {
          apply(value);
          setMode('view');
        }, 2000);
      }
    },
    email: {
      validate: value => {
        if (value.length && !/[a-z]+@[a-z]+\.[a-z]/.test(value)) {
          return ['Неверный формат'];
        }

        return null;
      }
    }
  });

  useEffect(() => console.log('__FIELDS_CHANGED__', fields), [fields]);
  console.log('<App/> render');

  return (
    <div>
      <CustomInput label="Имя" field={fields.name}/>
      <label className="form-group">
        E-mail:
        <Input className="form-control" value={fields.email.value} onChange={fields.email.onChange} onBlur={fields.email.onValidate} errors={fields.email.errors}/>
      </label>
      <code>
        <pre><code>{JSON.stringify(fields, null, '  ')}</code></pre>
      </code>
    </div>
  )
};

render(<App/>, document.getElementById('app'));
