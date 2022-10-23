import logo from '$/assets/logo.png';

import RegisterForm from './components/RegisterForm';

const Register = () => {
  return (
    <div className="modal__content">
      <div className="flex">
        <div className="wp-50 flex align-items-center justify-content-center pb-x-40 login-image">
          <div className="flex flex-direction-column justify-content-center">
            <img src={logo} alt="mhicha" />
            <span className="text-align-center">One tap for every transaction.</span>
          </div>
        </div>

        <div className="wp-50 flex justify-content-center">
          <div className="flex align-items-center justify-content-center login-form flex-direction-column">
            <div className="modal__header mb-30">
              <h3 className="modal__title">Register to mhicha</h3>
            </div>
            <div className="modal__body">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
