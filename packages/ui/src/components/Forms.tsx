import React from 'react';
import { observer } from 'mobx-react';
import { ListInline } from './Utils';
import { FieldState } from 'formstate';

interface FieldProps<T> {
  id: string;
  label?: string;
  fieldState: FieldState<T> | T;
  placeholder?: string;
  width?: number;
  onChange?: (value: string) => void; // Leave it out with readonly
  readonly?: boolean;
}

interface Option {
  label: string;
  value: string;
}

interface TextProps extends FieldProps<string> {
  unit?: string;
  numeric?: boolean;
}

interface NumberInputProps extends FieldProps<number> {
  unit?: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string | null;
  placeholder?: string;
  width?: number;
  onChange?: (value: string) => void; // Leave it out with readonly
  readonly?: boolean;
  options: Option[];
}

interface RadioProps extends SelectProps {}

interface FormProps {
  // Expecting to see `<Field />` nested
  // or `<dif class="form-row"><Field /><Field/>`
  children?: any;
  onSubmit?: () => void;
}

interface FormRowProps {
  children?: any;
  splits: number[];
}

interface FileUploaderProps {
  id: string;
  label: string;
  width?: number;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function controlClass(props: FieldProps<any>) {
  if (props.readonly) {
    return 'form-control';
  }
  let validity = !props.fieldState.hasBeenValidated
    ? ''
    : props.fieldState.hasError
    ? 'is-invalid'
    : '';
  return ['form-control', validity].join(' ');
}

export const TextField = observer((props: TextProps) => {
  let v: string;
  let errorMsg = null;
  if (props.fieldState instanceof FieldState) {
    v = props.fieldState.value as string;
    errorMsg = props.fieldState.error;
  } else {
    v = props.fieldState as string;
  }
  let input = (
    <input
      className={controlClass(props)}
      id={props.id}
      type="text"
      placeholder={props.placeholder}
      value={v}
      readOnly={props.readonly || false}
      onChange={e => {
        if (!(props.readonly || props.fieldState instanceof String)) {
          (props.fieldState as FieldState<string>).onChange(e.target.value);
        }
      }}
      onBlur={() => {
        if (!(props.readonly || props.fieldState instanceof String)) {
          (props.fieldState as FieldState<
            string
          >).enableAutoValidationAndValidate();
        }
      }}
    />
  );
  let cu = (props.unit && 'has-unit') || '';
  let cn = (props.numeric && 'numeric') || '';
  return (
    <div className={[cu, cn].filter(x => x !== '').join(' ')}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      {(props.unit && (
        <div className="input-group">
          {input}
          <div className="input-group-addon">{props.unit}</div>
        </div>
      )) ||
        input}
      {errorMsg && <div className="invalid-feedback">{errorMsg}</div>}
    </div>
  );
});

export const NumberField = observer((props: NumberInputProps) => {
  let input = (
    <input
      className={controlClass(props)}
      id={props.id}
      type="number"
      placeholder={props.placeholder}
      value={(props.fieldState as FieldState<number>).value.toString()}
      readOnly={props.readonly || false}
      onChange={e => {
        const strValue = e.target.value;
        if (isNaN(+strValue)) {
        } else {
          (props.fieldState as FieldState<number>).onChange(+strValue);
        }
      }}
    />
  );
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {(props.unit && (
        <div className="input-group">
          {input}
          <div className="input-group-addon">{props.unit}</div>
        </div>
      )) ||
        input}
      {(props.fieldState as FieldState<number>).hasError && (
        <div className="invalid-feedback">
          {(props.fieldState as FieldState<number>).error}
        </div>
      )}
    </div>
  );
});

export const SelectField = observer((props: SelectProps) => (
  <div>
    <label htmlFor={props.id}>{props.label}</label>
    <select
      className={'form-control'}
      id={props.id}
      value={props.value || ''}
      onChange={e => props.onChange && props.onChange(e.target.value)}
    >
      {props.placeholder && (
        <option disabled value="">
          --- {props.placeholder} ---
        </option>
      )}
      {props.options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
));

export const RadioField = observer((props: RadioProps) => (
  <div>
    {
      <div>
        <label>{props.label}</label>

        <ListInline>
          {props.options.map((opt, i) => {
            const id = `${props.id}/${i}`;
            return (
              <div key={i} className="ml-2">
                <input
                  className="mr-1"
                  id={id}
                  name={props.id}
                  type="radio"
                  value={opt.value}
                  readOnly={props.readonly || false}
                  onChange={e => props.onChange!(e.target.value)}
                  checked={opt.value === props.value}
                />
                <label htmlFor={id}>{opt.label}</label>
              </div>
            );
          })}
        </ListInline>
      </div>
    }
  </div>
));

export const FileSelect = (props: FileUploaderProps) => (
  <div className={`custom-file col-md-${props.width ?? 12}`}>
    <input
      type="file"
      className="custom-file-input"
      id={props.id}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        props.handleFileSelect(e)
      }
    />
    <label className="custom-file-label" htmlFor={props.id}>
      {props.label}
    </label>
  </div>
);

export const Form = (props: FormProps) => {
  const children = [].concat(props.children);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit && props.onSubmit();
        return false;
      }}
    >
      {children.map((group: any, idx: number) => (
        <div className="form-group" key={idx}>
          {group}
        </div>
      ))}
    </form>
  );
};

export const FormRow = (props: FormRowProps) => (
  <div className="form-row">
    {props.children.map((child: any, idx: number) => (
      <div className={`col-md-${props.splits[idx] ?? 12}`}>{child}</div>
    ))}
  </div>
);

export const ErrorMessage = (props: { error: string | null }) =>
  props.error ? (
    <div className="alert alert-danger" role="alert">
      {props.error}
    </div>
  ) : null;

export const TextArea = (props: {
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">{props.label}</label>
    <textarea
      className="form-control"
      id="exampleFormControlTextarea1"
      disabled={props.disabled}
    >
      {props.children}
    </textarea>
  </div>
);
