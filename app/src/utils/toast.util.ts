import { notify } from '$/components/toast/Toast';

interface ToastParams {
  className?: string;
  message: string;
  title: string;
}

export const success = ({ title, message, className }: ToastParams) => {
  notify({ type: 'success', data: { title, message }, className });
};

export const error = ({ title, message, className }: ToastParams) => {
  notify({ type: 'danger', data: { title, message }, className });
};

export const warning = ({ title, message, className }: ToastParams) => {
  notify({ type: 'warning', data: { title, message }, className });
};

export const info = ({ title, message, className }: ToastParams) => {
  notify({ type: 'info', data: { title, message }, className });
};
