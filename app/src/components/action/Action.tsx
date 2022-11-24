import { useContext } from 'react';
import { FaGetPocket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RiBillFill, RiSendPlaneFill } from 'react-icons/ri';

import UserContext from '$/context/UserContext';

const Action = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLoad = () => {
    return navigate('/load');
  };

  const handleSend = () => {
    return navigate('/send');
  };

  const handleStatement = () => {
    return navigate('/statement');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="position-fixed action">
      <div className="flex flex-direction-column">
        <button className="action__button">
          <RiSendPlaneFill size={20} onClick={handleSend} />
        </button>

        <button className="action__button" onClick={handleLoad}>
          <FaGetPocket size={20} />
        </button>

        <button className="action__button" onClick={handleStatement}>
          <RiBillFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default Action;
