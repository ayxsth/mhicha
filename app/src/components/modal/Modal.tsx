import Modal from 'react-modal';
import classNames from 'classnames';
import { GrFormClose } from 'react-icons/gr';

interface MhichaModalProps {
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnOverlayClick?: boolean;
}

const MhichaModal = (props: MhichaModalProps) => {
  const {
    isOpen,
    closeModal,
    className,
    overlayClassName,
    children,
    shouldCloseOnEsc = true,
    shouldCloseOnOverlayClick = true
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      className={classNames('modal', className)}
      onRequestClose={closeModal}
      overlayClassName={classNames('modal__overlay', overlayClassName)}
      ariaHideApp={false}
      preventScroll
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldReturnFocusAfterClose
    >
      <div className="flex justify-content-flex-end">
        <div className="flex cursor-pointer">
          <GrFormClose onClick={closeModal} size="20px" />
        </div>
      </div>

      {children}
    </Modal>
  );
};

export default MhichaModal;
