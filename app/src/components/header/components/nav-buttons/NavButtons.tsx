import _ from 'lodash';
import { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';

import Login from '$/components/login/Login';
import MhichaModal from '$/components/modal/Modal';
import Register from '$/components/register/Register';

import UserContext from '$/context/UserContext';
import LoginModalContext from '$/context/LoginModalContext';

import { clear } from '$/utils/token.util';
import { success } from '$/utils/toast.util';

import { NavBarModalType } from '$/constants/nav-buttons.constant';
import { ToastMessageType, UserToastMessageType } from '$/constants/toast-message.constants';

const NavButtons = () => {
  const { activeModal, isModalOpen, openModal, closeModal } = useContext(LoginModalContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    success({ title: ToastMessageType.SUCCESS, message: UserToastMessageType.LOGOUT_SUCCESS });

    setUser(null);

    clear();
  };

  return (
    <div className="nav flex align-items-center gap-20">
      {user ? (
        <>
          <div className="name flex align-items-center gap-8">
            <span>
              <FaUserCircle size={22} />
            </span>
            <span>{user.name} </span>
          </div>
          <span className="divider">|</span>
          <div className="coin flex align-items-center gap-8">
            <span>
              <AiFillDollarCircle size={22} />
            </span>
            <span>{`Rs. ${user.balance}`}</span>
          </div>
          <div className="nav__button">
            <button className="button primary-outlined-button min-wpx-100" onClick={handleLogout}>
              {_.capitalize(NavBarModalType.Logout)}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="nav__button">
            <button className="button primary-button min-wpx-100" onClick={() => openModal(NavBarModalType.Login)}>
              {_.capitalize(NavBarModalType.Login)}
            </button>
          </div>

          <div className="nav__button">
            <button
              className="button primary-outlined-button min-wpx-100"
              onClick={() => openModal(NavBarModalType.Register)}
            >
              {_.capitalize(NavBarModalType.Register)}
            </button>
          </div>
        </>
      )}

      <MhichaModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        shouldCloseOnEsc={!isLoading}
        shouldCloseOnOverlayClick={!isLoading}
      >
        {activeModal === NavBarModalType.Login ? (
          <Login isLoading={isLoading} setIsLoading={setIsLoading} closeModal={closeModal} />
        ) : (
          <Register isLoading={isLoading} setIsLoading={setIsLoading} closeModal={closeModal} />
        )}
      </MhichaModal>
    </div>
  );
};

export default NavButtons;
