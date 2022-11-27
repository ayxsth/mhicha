import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RippleLoading } from '$/components/loading';
import TransferLoad from './components/TransferLoadForm';
import Confirmation from '$/components/confirmation/Confirmation';

import sendFund from '$/assets/img/send.png';
import { Service } from '$/interfaces/service.interface';

import * as serviceServices from '$/services/service.service';

import { handleError } from '$/utils/handle-error.util';

import serviceFundSchema from '$/schemas/serviceFund.schema';

const ServiceFund = () => {
  const { id } = useParams();
  const [service, setService] = useState<Service>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const fetchService = async (id: number) => {
    try {
      setIsLoading(true);

      const { data } = await serviceServices.fetchById(id);

      setService(data);
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchService(+id);
  }, [id]);

  const initialValues = {
    email: service?.email || '',
    amount: '',
    type: 'TRANSFER',
    remark: `Service Payment - ${service?.name}` || '',
    phone: service?.type === 'TOP UP' ? '' : 9841000000,
    username: service?.type !== 'TOP UP' ? '' : '_'
  };

  return (
    <div className="container">
      <div className="flex align-items-center">
        <div className="wp-50 flex justify-content-center">
          {isLoading ? (
            <div className="flex align-items-center jutify-content-center ">
              <RippleLoading />
            </div>
          ) : (
            <div className="wp-90">
              <Formik
                initialValues={initialValues}
                validationSchema={serviceFundSchema}
                validateOnBlur
                onSubmit={() => {
                  setShowConfirmation(true);
                }}
              >
                {({ touched, errors, values }) => (
                  <>
                    {showConfirmation ? (
                      <Confirmation
                        values={values}
                        setShowConfirmation={setShowConfirmation}
                        isService
                        serviceName={service?.name}
                      />
                    ) : (
                      <TransferLoad
                        touched={touched}
                        errors={errors}
                        isSend
                        isService
                        serviceName={service?.name}
                        serviceType={service?.type}
                      />
                    )}
                  </>
                )}
              </Formik>
            </div>
          )}
        </div>
        <div className="wp-50">
          <img src={sendFund} alt="Send" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default ServiceFund;
