import { Field, Form, Formik } from 'formik';

import InputWrapper from '$/components/input-wrapper/InputWrapper';

import registerFormSchema from '$/schemas/registerFormSchema';

interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
}

interface GenderType {
  value: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
}

const genders: GenderType[] = [
  { value: '', label: 'Select', disabled: true, hidden: true },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

const RegisterForm = () => {
  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerFormSchema}
      validateOnBlur
      onSubmit={(values: RegisterFormValues) => console.log(values)}
    >
      {({ errors, touched }) => (
        <Form className="formik">
          <InputWrapper label="name" error={errors.name} touched={touched.name} required>
            <Field type="text" id="name" name="name" className="formik__input" />
          </InputWrapper>

          <InputWrapper label="email" touched={touched.email} error={errors.email} required>
            <Field type="text" id="email" name="email" className="formik__input" />
          </InputWrapper>

          <InputWrapper label="phone" touched={touched.phone} error={errors.phone} required>
            <Field type="text" id="phone" name="phone" className="formik__input" />
          </InputWrapper>

          <InputWrapper label="password" touched={touched.password} error={errors.password} required>
            <Field type="password" id="password" name="password" className="formik__input" />
          </InputWrapper>

          <InputWrapper label="gender" touched={touched.gender} error={errors.gender} required>
            <Field as="select" id="gender" name="gender" className="formik__input">
              {genders.map(({ label, value, disabled, hidden }: GenderType, index: number) => (
                <option key={index} value={value} disabled={disabled} hidden={hidden}>
                  {label}
                </option>
              ))}
            </Field>
          </InputWrapper>

          <div className="formik__content mt-40 flex align-items-center justify-content-space-between">
            <button type="submit" className="button primary-button min-wpx-100">
              Register
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
