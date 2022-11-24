import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from '$/constants/date.constant';

export const getCurrentYear = () => {
  return moment().year();
};

export const getFormattedDate = (date: string, format = DEFAULT_DATE_FORMAT) => {
  return moment(date).format(format);
};
