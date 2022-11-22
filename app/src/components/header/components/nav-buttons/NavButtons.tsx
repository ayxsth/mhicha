import _ from 'lodash';
import { useContext, useState } from 'react';

import Login from '$/components/login/Login';
import MhichaModal from '$/components/modal/Modal';
import Register from '$/components/register/Register';

import UserContext from '$/context/UserContext';

import { clear } from '$/utils/token.util';
import { success } from '$/utils/toast.util';

import { NavBarModalType } from '$/constants/nav-buttons.constant';
import { ToastMessageType, UserToastMessageType } from '$/constants/toast-message.constants';

const NavButtons = () => {
  const [activeModal, setActiveModal] = useState<NavBarModalType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, setUser } = useContext(UserContext);

  const openModal = (activeModal: NavBarModalType) => {
    setActiveModal(activeModal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    success({ title: ToastMessageType.SUCCESS, message: UserToastMessageType.LOGOUT_SUCCESS });

    setUser(null);

    clear();
  };

  return (
    <div className="nav flex align-items-center gap-10">
      {user ? (
        <>
          <span className="name">{user.name}</span>
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
