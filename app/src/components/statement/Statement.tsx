import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import statement from '$/assets/img/statement.png';

import UserContext from '$/context/UserContext';

import useStatement from '$/hooks/useStatement';

import { getHeader } from '$/utils/statement.unit';
import { getFormattedDate } from '$/utils/date.util';

import { RippleLoading } from '../loading';
import StatementDetails from './StatementDetails';

const Statement = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { statement: statements, isLoading } = useStatement();

  const [id, setId] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleClick = (id: number) => {
    setShowDetails(true);
    setId(id);
  };

  return (
    <div className="container">
      <div className="flex">
        <div className="wp-50">
          <img src={statement} alt="Statement" width="100%" />
        </div>
        <div className="wp-50 flex align-items-center">
          <div className="wp-90">
            {isLoading ? (
              <div className="flex align-items-center justify-content-center">
                <RippleLoading />
              </div>
            ) : statements && user ? (
              <>
                {showDetails ? (
                  <StatementDetails id={id} user={user} setShowDetails={setShowDetails} />
                ) : (
                  <div className="statements">
                    <h3>Statement</h3>

                    <div className="flex">
                      <div className="statement-holder wp-80 flex gap-10 flex-direction-column">
                        {[...statements].reverse().map((statement, index) => (
                          <div className="statement" key={index} onClick={() => handleClick(statement.id)}>
                            <div className="flex justify-content-space-between">
                              <div className="flex flex-direction-column gap-5 title">
                                <span>{getHeader(user?.id, statement.senderId, statement.receiverId)}</span>
                                <span>{getFormattedDate(statement.createdAt)}</span>
                              </div>
                              <div className="amount">
                                <span>{`Rs. ${statement.amount}`}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {showDetails && (
                  <div className="mt-20">
                    <button className="button primary-button" onClick={() => setShowDetails(false)}>
                      Okay
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h1>Something went wrong!</h1>
                <button className="button primary-button" onClick={() => navigate('/')}>
                  Go Back
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statement;
