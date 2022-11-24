import { createContext } from 'react';

import { NavBarModalType } from '$/constants/nav-buttons.constant';

const LoginModalContext = createContext<{
  activeModal: NavBarModalType;
  openModal: (activeModal: NavBarModalType) => void;
  isModalOpen: boolean;
  closeModal: () => void;
}>({
  activeModal: NavBarModalType.Login,
  openModal: () => {
    return;
  },
  isModalOpen: false,
  closeModal() {
    return;
  }
});

export default LoginModalContext;
