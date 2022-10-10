import { Link } from 'react-router-dom';

import logo from '$/assets/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="flex align-items-center w-fit disable-select">
      <img src={logo} className="logo__img" alt="logo" />
      <div className="logo__label">mhicha</div>
    </Link>
  );
};

export default Logo;
