import classNames from 'classnames';
import { Field, Form, Formik } from 'formik';

import { EllipsisLoading } from '$/components/loading';
import InputWrapper from '$/components/input-wrapper/InputWrapper';

import * as userServices from '$/services/user.service';

import { success } from '$/utils/toast.util';
import { setAccessToken } from '$/utils/token.util';
import { handleError } from '$/utils/handle-error.util';

import registerFormSchema from '$/schemas/registerForm.schema';

import { ToastMessageType, UserToastMessageType } from '$/constants/toast-message.constants';

interface RegisterFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  closeModal?: () => void;
}

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
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' }
];

const RegisterForm = ({ isLoading, setIsLoading, closeModal }: RegisterFormProps) => {
  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: ''
  };

  const createUser = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);

      const { data: user } = await userServices.create(data);

      setAccessToken(user.token);

      closeModal && closeModal();

      success({ title: ToastMessageType.SUCCESS, message: UserToastMessageType.ADD_SUCCESS });
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerFormSchema}
      validateOnBlur
      onSubmit={(values: RegisterFormValues) => createUser(values)}
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
            <button type="submit" disabled={isLoading} className="button primary-button min-wpx-100">
              <span className={classNames({ invisible: isLoading })}>Register</span>
              {isLoading && <EllipsisLoading color="white" position="absolute" />}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
