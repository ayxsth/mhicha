import _ from 'lodash';
import { useState } from 'react';

import Login from '$/components/login/Login';
import MhichaModal from '$/components/modal/Modal';
import Register from '$/components/register/Register';

import { NavBarModalType } from '$/constants/nav-buttons.constant';

const NavButtons = () => {
  const [activeModal, setActiveModal] = useState<NavBarModalType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openModal = (activeModal: NavBarModalType) => {
    setActiveModal(activeModal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="nav flex align-items-center gap-10">
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
