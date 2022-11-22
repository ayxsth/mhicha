export enum ToastMessageType {
  ERROR = 'error',
  SUCCESS = 'success'
}

export enum UserToastMessageType {
  LOGIN_SUCCESS = 'User logged in successfully',
  ADD_SUCCESS = 'User created successfully',
  LOGOUT_SUCCESS = 'User logged out successfully'
}

export enum TransactionToastMessageType {
  SEND_SUCCESS = 'Transaction successfully',
  LOAD_SUCCESS = 'Load successfully'
}

export const SOMETHING_WENT_WRONG = 'Internal Server Error';
