import _ from 'lodash';
import classNames from 'classnames';

interface InputWrapperProps {
  children: React.ReactNode;
  label: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

const InputWrapper = ({ children, label, error, touched, required }: InputWrapperProps) => {
  return (
    <div className="formik__content mb-10">
      <label className={classNames('formik__label', { required: required })} htmlFor={_.camelCase(label)}>
        {label}
      </label>
      {children}
      {error && touched && <span className="error">{error}</span>}
    </div>
  );
};

export default InputWrapper;
