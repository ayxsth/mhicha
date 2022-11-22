import { Formik } from 'formik';
import { useContext, useState } from 'react';

import TransferLoad from './components/TransferLoadForm';

import loadFundSchema from '$/schemas/loadFund.schema';

import loadFund from '$/assets/img/load.png';
import Confirmation from '../confirmation/Confirmation';

import UserContext from '$/context/UserContext';

const LoadFund = () => {
  const { user } = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const initialValues = {
    amount: '',
    type: '',
    email: user?.email || '',
    remark: ''
  };

  return (
    <div className="container">
      <div className="flex align-items-center">
        <div className="wp-50 flex justify-content-center">
          <div className="wp-90">
            <Formik
              initialValues={initialValues}
              validationSchema={loadFundSchema}
              validateOnBlur
              onSubmit={() => {
                setShowConfirmation(true);
              }}
            >
              {({ touched, errors, values }) => (
                <>
                  {showConfirmation ? (
                    <Confirmation values={values} setShowConfirmation={setShowConfirmation} isSelfLoad />
                  ) : (
                    <TransferLoad touched={touched} errors={errors} isSend={false} />
                  )}
                </>
              )}
            </Formik>
          </div>
        </div>
        <div className="wp-50">
          <img src={loadFund} alt="Load" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default LoadFund;
