import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import UserContext from '$/context/UserContext';

const AuthorizedRoute = () => {
  const { user } = useContext(UserContext);

  const canView = user;

  return canView ? <Outlet /> : <Navigate to="/" />;
};

export default AuthorizedRoute;
