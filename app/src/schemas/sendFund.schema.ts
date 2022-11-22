import * as Yup from 'yup';

import { getRequiredErrorLabel } from '$/utils/string.util';

const sendFundSchema = Yup.object({
  email: Yup.string().email().required(getRequiredErrorLabel('email')),
  amount: Yup.number().required(getRequiredErrorLabel('amount')).min(100).max(10000),
  type: Yup.string().required(getRequiredErrorLabel('type')),
  remark: Yup.string().required(getRequiredErrorLabel('remark')).min(3)
});

export default sendFundSchema;
