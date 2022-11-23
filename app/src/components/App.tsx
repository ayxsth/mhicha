import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Toast from './toast/Toast';
import Header from './header/Header';
import Footer from './footer/Footer';
import Landing from './landing/Landing';
import LoadFund from './transfer-load/LoadFund';
import TransferFund from './transfer-load/TransferFund';

import { User } from '$/interfaces/user.interface';

import * as userServices from '$/services/user.service';

import { handleError } from '$/utils/handle-error.util';
import { clear, getAccessToken } from '$/utils/token.util';

import UserContext from '$/context/UserContext';
import { RippleLoading } from './loading';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const providerValues = useMemo(() => ({ user, setUser }), [user, setUser]);

  const token = getAccessToken();

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
      return setIsLoading(false);
    }

    fetchProfile();
  }, [token]);

  return (
    <UserContext.Provider value={providerValues}>
      {isLoading ? (
        <div className="flex justify-content-center align-items-center flex-1">
          <RippleLoading />
        </div>
      ) : (
        <BrowserRouter>
          <Header />

          <div className="mhicha-body">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/send" element={<TransferFund />} />
              <Route path="/load" element={<LoadFund />} />
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      )}

      <Toast />
    </UserContext.Provider>
  );
};

export default App;
