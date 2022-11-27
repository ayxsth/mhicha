import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Toast from './toast/Toast';
import Header from './header/Header';
import Footer from './footer/Footer';
import Action from './action/Action';
import Landing from './landing/Landing';
import { RippleLoading } from './loading';
import Statement from './statement/Statement';
import LoadFund from './transfer-load/LoadFund';
import TransferFund from './transfer-load/TransferFund';

import AuthorizedRoute from './AuthRouter';

import { User } from '$/interfaces/user.interface';

import * as userServices from '$/services/user.service';

import { handleError } from '$/utils/handle-error.util';
import { clear, getAccessToken } from '$/utils/token.util';

import UserContext from '$/context/UserContext';
import LoginModalContext from '$/context/LoginModalContext';

import { NavBarModalType } from '$/constants/nav-buttons.constant';
import ServiceFund from './transfer-load/ServiceFund';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<NavBarModalType>(NavBarModalType.Login);

  const token = useMemo(() => getAccessToken(), [user]);

  const openModal = (activeModal: NavBarModalType) => {
    setActiveModal(activeModal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const userProviderValues = useMemo(() => ({ user, setUser }), [user, setUser]);
  const loginModalProviderValues = useMemo(
    () => ({
      isModalOpen,
      openModal,
      closeModal,
      activeModal
    }),
    [isModalOpen, openModal, closeModal, activeModal]
  );

  const fetchProfile = async () => {
    try {
      setIsLoading(true);

      const { data } = await userServices.me();

      setUser(data);
    } catch (e) {
      clear();

      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetchProfile();
  }, [token]);

  return (
    <UserContext.Provider value={userProviderValues}>
      <LoginModalContext.Provider value={loginModalProviderValues}>
        {isLoading ? (
          <div className="flex justify-content-center align-items-center flex-1">
            <RippleLoading />
          </div>
        ) : (
          <BrowserRouter>
            <Header />

            <div className="mhicha-body">
              <Routes>
                <Route element={<AuthorizedRoute />}>
                  <Route path="/send" element={<TransferFund />} />
                  <Route path="/load" element={<LoadFund />} />
                  <Route path="/service/:id" element={<ServiceFund />} />
                  <Route path="/statement" element={<Statement />} />
                </Route>

                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            <Action />
            <Footer />
          </BrowserRouter>
        )}

        <Toast />
      </LoginModalContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
