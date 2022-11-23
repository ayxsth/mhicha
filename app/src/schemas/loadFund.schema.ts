import * as Yup from 'yup';

import { getRequiredErrorLabel } from '$/utils/string.util';

const loadFundSchema = Yup.object({
  amount: Yup.number().required(getRequiredErrorLabel('amount')).min(100).max(10000),
  type: Yup.string().required(getRequiredErrorLabel('type'))
});

export default loadFundSchema;
