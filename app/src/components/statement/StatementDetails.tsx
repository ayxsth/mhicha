import _ from 'lodash';
import { useEffect, useState } from 'react';

import * as statementServices from '$/services/statement.service';
import { StatementDetail } from '$/interfaces/statement.interface';

import { getHeader } from '$/utils/statement.unit';
import { getFormattedDate } from '$/utils/date.util';
import { handleError } from '$/utils/handle-error.util';

import { User } from '$/interfaces/user.interface';
import { RippleLoading } from '$/components/loading';

interface StatementDetailsProps {
  id: number;
  user: User;
  setShowDetails: (showDetails: boolean) => void;
}

const StatementDetails = ({ id, user, setShowDetails }: StatementDetailsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statement, setStatement] = useState<StatementDetail | null>(null);

  const getStatement = async (id: number) => {
    try {
      setIsLoading(true);

      const { data } = await statementServices.fetchById(id);

      setStatement(data);
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStatement(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex align-items-center justify-content-center">
        <RippleLoading />
      </div>
    );
  }

  return (
    <>
      {!statement ? (
        <>
          <h1>Something went wrong!</h1>
          <button className="button button-primary" onClick={() => setShowDetails(false)}>
            Go Back
          </button>
        </>
      ) : (
        <>
          <div className="statements">
            <h3>Statement Details</h3>

            <div className="flex">
              <div className="statement-holder wp-80 flex gap-10 flex-direction-column">
                <div className="statement-details">
                  <div>
                    <div className="flex flex-direction-column gap-5 title">
                      <div className="flex justify-content-space-between">
                        <div className="statement-details__item flex gap-6 flex-direction-column">
                          <div className="title">Amount</div>
                          <div className="value">{`Rs. ${statement.amount}`}</div>
                        </div>
                        <div className="statement-details__item flex gap-6 flex-direction-column">
                          <div className="title text-align-right">
                            {getHeader(user?.id, statement.senderId, statement.receiverId)}
                          </div>
                          <div className="title text-align-right">{getFormattedDate(statement.createdAt)}</div>
                        </div>
                      </div>

                      {getHeader(user?.id, statement.senderId, statement.receiverId) !== 'Self Load' && (
                        <div className="statement-details__item flex gap-6 flex-direction-column">
                          <div className="title">
                            {getHeader(user?.id, statement.senderId, statement.receiverId) === 'Received'
                              ? 'Received From'
                              : 'Sent To'}
                          </div>
                          <div className="value">
                            {getHeader(user?.id, statement.senderId, statement.receiverId) === 'Received'
                              ? statement.senderName
                              : statement.receiverName}
                          </div>
                        </div>
                      )}

                      <div className="statement-details__item flex gap-6 flex-direction-column">
                        <div className="title">Type</div>
                        <div className="value">{_.startCase(statement.type.toLowerCase())}</div>
                      </div>

                      <div className="statement-details__item flex gap-6 flex-direction-column">
                        <div className="title">Remark</div>
                        <div className="value">{statement.remark}</div>
                      </div>

                      {getHeader(user?.id, statement.senderId, statement.receiverId) === 'Sent' && (
                        <div className="statement-details__item flex gap-6 flex-direction-column">
                          <div className="title">Charge</div>
                          <div className="value">{`Rs. ${statement.charge}`}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StatementDetails;
