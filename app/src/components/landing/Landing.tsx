import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import appDownload from '$/assets/img/app-download.png';
import digitalPayment from '$/assets/img/digital-payment.png';

import UserContext from '$/context/UserContext';
import LoginModalContext from '$/context/LoginModalContext';

import Services from '../service/Services';
import { NavBarModalType } from '$/constants/nav-buttons.constant';

const Landing = () => {
  const { user } = useContext(UserContext);
  const { openModal } = useContext(LoginModalContext);

  const navigate = useNavigate();

  const handleTransaction = () => {
    if (user) {
      return navigate('/send');
    }

    openModal(NavBarModalType.Login);
  };

  return (
    <div className="container">
      <div className="landing">
        <div className="landing-section flex align-items-center justify-content-between mb-x-100">
          <div className="landing-section__left">
            <h1 className="w-fit mt-0">Revamping and improving the payment process</h1>
            <span>
              Trusted by more than <span className="trust-count">5 Million</span> users.
            </span>
            <div className="landing-buttons flex align-items-center pt-20 gap-30">
              <button className="button primary-button hx-40" onClick={handleTransaction}>
                Make Transaction
              </button>
            </div>
          </div>
          <img
            className="digital-payment landing-section__image landing-section__right"
            src={digitalPayment}
            alt="Digital Payment"
          />
        </div>

        <Services />

        <div className="download">
          <div className="landing-section flex align-items-center justify-content-between mb-x-100">
            <img
              className="landing-section__left landing-section__image app-download"
              src={appDownload}
              alt="App Download"
            />
            <div className="landing-section__right">
              <h1 className="w-fit mt-0">It's just like having cold hard cash in your hand</h1>
              <div className="landing-buttons flex align-items-center pt-20 gap-30">
                <a
                  href="https://github.com/Rinnohara9803/mhicha"
                  target="_blank"
                  rel="noreferrer"
                  className="button primary-button hx-40 flex align-items-center"
                >
                  Get App
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
