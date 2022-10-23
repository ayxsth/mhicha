import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import InputWrapper from '$/components/input-wrapper/InputWrapper';
import CheckboxWrapper from '$/components/checkbox-wrapper/CheckboxWrapper';

import loginFormSchema from '$/schemas/loginFormSchema';

interface LoginFormValues {
  email: string;
  password: string;
  showPassword: boolean;
}

const LoginForm = () => {
  const initialValues: LoginFormValues = { email: '', password: '', showPassword: false };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormSchema}
      validateOnBlur
      onSubmit={(values: LoginFormValues) => console.log(values)}
    >
      {({ values, errors, touched }) => (
        <Form className="formik">
          <InputWrapper label="email" touched={touched.email} error={errors.email} required>
            <Field type="text" id="email" name="email" className="formik__input" />
          </InputWrapper>

          <InputWrapper label="password" touched={touched.password} error={errors.password} required>
            <Field
              type={values.showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="formik__input"
            />
          </InputWrapper>

          <CheckboxWrapper label="Show Password">
            <Field type="checkbox" id="showPassword" name="showPassword" />
          </CheckboxWrapper>

          <div className="formik__content mt-40 flex align-items-center justify-content-space-between">
            <button type="submit" className="button primary-button min-wpx-100">
              Login
            </button>

            <Link className="forgot-password" to="#">
              Forgot password?
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
