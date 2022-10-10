import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import loginFormSchema from '$/schemas/loginFormShema';

interface LoginFormValues {
  email: string;
  password: string;
  showPassword: boolean;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const initialValues: LoginFormValues = { email: '', password: '', showPassword: false };
  const initialErrors: LoginFormErrors = {};

  return (
    <Formik
      initialValues={initialValues}
      initialErrors={initialErrors}
      validationSchema={loginFormSchema}
      validateOnBlur
      onSubmit={(values: LoginFormValues) => console.log(values)}
    >
      {({ values, errors, touched }) => (
        <Form className="formik">
          <div className="formik__content mb-10">
            <label className="formik__label required" htmlFor="email">
              Email
            </label>
            <Field type="text" id="email" name="email" className="formik__input" />
            <span className="error">{touched.email && errors.email}</span>
          </div>
          <div className="formik__content mb-10">
            <label className="formik__label required" htmlFor="password">
              Password
            </label>
            <Field
              type={values.showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="formik__input"
            />
            <span className="error">{touched.password && errors.password}</span>
          </div>
          <div className="formik__content mb-10 flex gap-5 align-items-center">
            <Field type="checkbox" id="showPassword" name="showPassword" />
            <label className="formik__label disable-select" htmlFor="showPassword">
              Show Password
            </label>
          </div>
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
