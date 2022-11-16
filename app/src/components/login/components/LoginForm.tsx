import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import { EllipsisLoading } from '$/components/loading';
import InputWrapper from '$/components/input-wrapper/InputWrapper';
import CheckboxWrapper from '$/components/checkbox-wrapper/CheckboxWrapper';

import * as userServices from '$/services/user.service';

import { success } from '$/utils/toast.util';
import { setAccessToken } from '$/utils/token.util';
import { handleError } from '$/utils/handle-error.util';

import loginFormSchema from '$/schemas/loginForm.schema';

import { ToastMessageType, UserToastMessageType } from '$/constants/toast-message.constants';

interface LoginFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  closeModal?: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
  showPassword: boolean;
}

const LoginForm = ({ isLoading, setIsLoading, closeModal }: LoginFormProps) => {
  const initialValues: LoginFormValues = { email: '', password: '', showPassword: false };

  const login = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);

      const { showPassword, ...filteredData } = data;

      const { data: user } = await userServices.login(filteredData);

      setAccessToken(user.token);

      closeModal && closeModal();

      success({ title: ToastMessageType.SUCCESS, message: UserToastMessageType.LOGIN_SUCCESS });
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormSchema}
      validateOnBlur
      onSubmit={(values: LoginFormValues) => login(values)}
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
            <button type="submit" disabled={isLoading} className="button primary-button min-wpx-100">
              <span className={classNames({ invisible: isLoading })}>Login</span>
              {isLoading && <EllipsisLoading color="white" position="absolute" />}
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
