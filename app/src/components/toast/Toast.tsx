import { toast, ToastContainer } from 'react-toastify';

import { FaTimesCircle, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const ICON_SIZE = 22;

type StatusType = 'success' | 'warning' | 'danger' | 'info';

interface CustomToastProps {
  statusType: StatusType;
  toastMessage: { title: string; message: string };
  toastClassName?: string;
}

function CustomToast({ statusType, toastMessage, toastClassName }: CustomToastProps) {
  const toasts = {
    danger: {
      className: 'danger',
      icon: <FaTimesCircle size={ICON_SIZE} />
    },
    success: {
      className: 'success',
      icon: <FaCheckCircle size={ICON_SIZE} />
    },
    warning: {
      className: 'warning',
      icon: <FaExclamationCircle size={ICON_SIZE} />
    },
    info: {
      className: 'info',
      icon: <FaInfoCircle size={ICON_SIZE} />
    }
  };

  const toastType = toasts[statusType];

  return (
    <div>
      {toastType && toastType !== undefined && (
        <div className={`toast toast--${toastType.className} ${toastClassName}`}>
          <div className="toast__icon">{toastType.icon}</div>
          <div className="toast__content">
            <div className="toast__title">{toastMessage.title}</div>
            <div className="toast__message">{toastMessage.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}

interface NotifyProps {
  autoClose?: number;
  className?: string;
  data: { title: string; message: string };
  draggable?: boolean;
  type: StatusType;
}

export const notify = (props: NotifyProps) => {
  const { autoClose = 3000, data, draggable = false, type } = props;

  toast(<CustomToast statusType={type} toastMessage={data} />, {
    autoClose,
    closeButton: false,
    draggable,
    hideProgressBar: true,
    progressClassName: 'toast__progress-bar'
  });
};

const Toast = () => {
  return <ToastContainer className="toast__container" />;
};

export default Toast;
