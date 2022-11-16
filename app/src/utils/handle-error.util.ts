import { isArray } from 'lodash';
import { error as errorToast } from '$/utils/toast.util';
import { SOMETHING_WENT_WRONG, ToastMessageType } from '$/constants/toast-message.constants';

export const handleError = (error: Error | unknown | any) => {
  const { message = SOMETHING_WENT_WRONG } = error;

  const errorMessage = isArray(message) ? message[0] : message;

  errorToast({ title: ToastMessageType.ERROR, message: errorMessage });
};
