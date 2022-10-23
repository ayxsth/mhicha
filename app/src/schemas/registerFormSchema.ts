import 'yup-phone';
import * as Yup from 'yup';

import { getRequiredErrorLabel } from '$/utils/string';

const registerFormSchema = Yup.object({
  name: Yup.string().required(getRequiredErrorLabel('name')),
  email: Yup.string().email().required(getRequiredErrorLabel('email')),
  phone: Yup.string().required(getRequiredErrorLabel('phone')).phone('NP', true, '${path} must be valid phone number'),
  password: Yup.string().required(getRequiredErrorLabel('password')),
  gender: Yup.string().required(getRequiredErrorLabel('gender'))
});

export default registerFormSchema;
