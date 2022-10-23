import _ from 'lodash';

interface CheckboxWrapperProps {
  children: React.ReactNode;
  label: string;
}

const CheckboxWrapper = ({ children, label }: CheckboxWrapperProps) => {
  return (
    <div className="formik__content mb-10 flex gap-5 align-items-center">
      {children}
      <label className="formik__label disable-select" htmlFor={_.camelCase(label)}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxWrapper;
