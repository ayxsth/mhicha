import 'yup-phone';
import * as Yup from 'yup';

import { getRequiredErrorLabel } from '$/utils/string.util';

const serviceFundSchema = Yup.object({
  email: Yup.string().email().required(getRequiredErrorLabel('email')),
  amount: Yup.number().required(getRequiredErrorLabel('amount')).min(100).max(10000),
  type: Yup.string().required(getRequiredErrorLabel('type')),
  remark: Yup.string().required(getRequiredErrorLabel('remark')).min(3),
  phone: Yup.string().required(getRequiredErrorLabel('phone')).phone('NP', true, '${path} must be valid phone number'),
  username: Yup.string().required(getRequiredErrorLabel('username'))
});

export default serviceFundSchema;
