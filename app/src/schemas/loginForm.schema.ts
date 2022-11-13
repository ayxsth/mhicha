import * as Yup from 'yup';

import { getRequiredErrorLabel } from '$/utils/string.util';

const loginFormSchema = Yup.object({
  email: Yup.string().email().required(getRequiredErrorLabel('email')),
  password: Yup.string().required(getRequiredErrorLabel('password'))
});

export default loginFormSchema;
