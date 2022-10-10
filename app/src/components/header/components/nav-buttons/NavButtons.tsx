import { useState } from 'react';

import Login from '$/components/login/Login';
import MhichaModal from '$/components/modal/Modal';

const NavButtons = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <div className="nav flex align-items-center gap-10">
      <div className="nav__button">
        <button className="button primary-button min-wpx-100" onClick={openLoginModal}>
          Login
        </button>
      </div>

      <div className="nav__button">
        <button className="button primary-outlined-button min-wpx-100" onClick={openRegisterModal}>
          Register
        </button>
      </div>

      <MhichaModal isOpen={isLoginOpen} closeModal={closeLoginModal}>
        <Login />
      </MhichaModal>

      <MhichaModal isOpen={isRegisterOpen} closeModal={closeRegisterModal}>
        <div className="modal__header">
          <h3 className="modal__title">Register</h3>
        </div>
        <div className="modal__body">
          <div className="modal__body__content">
            <div className="modal__body__content__label">Name</div>
            <input type="text" className="modal__body__content__input" />
            <div className="modal__body__content__label">Email</div>
            <input type="text" className="modal__body__content__input" />
          </div>
        </div>
      </MhichaModal>
    </div>
  );
};

export default NavButtons;
