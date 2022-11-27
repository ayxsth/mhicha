import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { interpolate } from '$/utils/interpolate.util';

import UserContext from '$/context/UserContext';
import LoginModalContext from '$/context/LoginModalContext';

import { NavBarModalType } from '$/constants/nav-buttons.constant';

import { Service as ServiceType } from '$/interfaces/service.interface';

interface ServiceProps {
  service: ServiceType;
}

const Service = ({ service }: ServiceProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { openModal } = useContext(LoginModalContext);

  const handleClick = (id: number) => {
    if (!user) {
      return openModal(NavBarModalType.Login);
    }

    navigate(interpolate('/service/:id', { id }));
  };

  return (
    <div className="service-wrapper" onClick={() => handleClick(service.id)}>
      <div className="service flex flex-direction-column align-items-center width-fit-content">
        <div className="service__icon">
          <img src={service.logo} alt={service.name} />
        </div>
        <div className="service__name">{service.name}</div>
      </div>
    </div>
  );
};

export default Service;
