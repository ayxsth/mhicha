import _ from 'lodash';
import { useState } from 'react';
import classNames from 'classnames';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Fund } from '$/interfaces/fund.interface';

import useUser from '$/hooks/useUser';
import useCharge from '$/hooks/useCharge';

import { success } from '$/utils/toast.util';
import { handleError } from '$/utils/handle-error.util';

import { EllipsisLoading, RippleLoading } from '$/components/loading';

import * as balanceServices from '$/services/balance.service';

import { ToastMessageType, TransactionToastMessageType } from '$/constants/toast-message.constants';

interface ConfirmationProps {
  values: Fund;
  setShowConfirmation: (showConfirmation: boolean) => void;
  isSelfLoad?: boolean;
}

const Confirmation = ({ values, setShowConfirmation, isSelfLoad }: ConfirmationProps) => {
  const { user, isLoading: isLoadingUser } = useUser(values.email);
  const { charge, isLoading: isLoadingCharge } = isSelfLoad
    ? { charge: 0, isLoading: false }
    : useCharge(+values.amount);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const isLoading = isLoadingUser || isLoadingCharge;

  if (isLoading) {
    return (
      <div className="flex align-items-center justify-content-center">
        <RippleLoading />
      </div>
    );
  }

  if ((!user || typeof charge !== 'number') && !isLoading) {
    return (
      <>
        <h1>Something went wrong!</h1>
        <button className="button primary-button">Try Again</button>
      </>
    );
  }

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);

      isSelfLoad &&
        (await balanceServices.load({
          amount: values.amount,
          type: values.type
        }));

      !isSelfLoad &&
        (await balanceServices.send({
          amount: values.amount,
          type: values.type,
          email: values.email,
          remark: values.remark
        }));

      success({
        title: ToastMessageType.SUCCESS,
        message: isSelfLoad ? TransactionToastMessageType.LOAD_SUCCESS : TransactionToastMessageType.SEND_SUCCESS
      });

      navigate('/');
    } catch (e) {
      handleError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="confirm">
        <div className="confirm__header flex justify-content-space-between align-items-center">
          <div>
            <h3 className="confirm__title">Confirmation</h3>
            <p className="confirm__subtitle">Please confirm your transaction</p>
          </div>
          <button
            className="button primary-outlined-button height-fit-content"
            disabled={isSubmitting}
            onClick={() => setShowConfirmation(false)}
          >
            <FaEdit size={15} />
          </button>
        </div>

        <div className="confirm__body">
          <div className="confirm__body__item flex gap-6 flex-direction-column">
            <div className="title">{isSelfLoad ? 'Name' : 'Receiver Name'}</div>
            <div className="value">{user && user.name}</div>
          </div>

          <div className="confirm__body__item flex gap-6 flex-direction-column">
            <div className="title">{isSelfLoad ? 'Email' : 'Receiver Email'}</div>
            <div className="value">{user && user.email}</div>
          </div>

          <div className="confirm__body__item flex gap-6 flex-direction-column">
            <div className="title">Amount</div>
            <div className="value">Rs. {values.amount}</div>
          </div>

          <div className="confirm__body__item flex gap-6 flex-direction-column">
            <div className="title">Type</div>
            <div className="value">{_.startCase(values.type.toLowerCase())}</div>
          </div>

          {values.remark && (
            <div className="confirm__body__item flex gap-6 flex-direction-column">
              <div className="title">Remark</div>
              <div className="value">{values.remark}</div>
            </div>
          )}

          <div className="confirm__body__item flex gap-6 flex-direction-column">
            <div className="title">Charge</div>
            <div className="value">{`Rs. ${charge}`}</div>
          </div>

          <div className="confirm__body__item flex gap-6 flex-direction-column">
            <div className="title">Total</div>
            <div className="value">{`Rs. ${charge + values.amount}`}</div>
          </div>
        </div>
      </div>

      <div className="confirm-bottom flex gap-10 mt-20">
        <button
          className="button primary-button position-relative flex align-items-center justify-content-center"
          disabled={isSubmitting}
          onClick={handleConfirm}
        >
          <span className={classNames({ invisible: isSubmitting })}>Confirm</span>
          {isSubmitting && <EllipsisLoading color="white" position="absolute" />}
        </button>
        <button className="button primary-outlined-button" disabled={isSubmitting} onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
