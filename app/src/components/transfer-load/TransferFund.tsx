import { Formik } from 'formik';
import { useState } from 'react';

import TransferLoad from './components/TransferLoadForm';
import Confirmation from '$/components/confirmation/Confirmation';

import sendFundSchema from '$/schemas/sendFund.schema';

import sendFund from '$/assets/img/send.png';

const TransferFund = () => {
  const initialValues = {
    email: '',
    amount: '',
    type: '',
    remark: ''
  };

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  return (
    <div className="container">
      <div className="flex align-items-center">
        <div className="wp-50 flex justify-content-center">
          <div className="wp-90">
            <Formik
              initialValues={initialValues}
              validationSchema={sendFundSchema}
              validateOnBlur
              onSubmit={() => {
                setShowConfirmation(true);
              }}
            >
              {({ touched, errors, values }) => (
                <>
                  {showConfirmation ? (
                    <Confirmation values={values} setShowConfirmation={setShowConfirmation} />
                  ) : (
                    <TransferLoad touched={touched} errors={errors} isSend />
                  )}
                </>
              )}
            </Formik>
          </div>
        </div>
        <div className="wp-50">
          <img src={sendFund} alt="Send" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default TransferFund;
