import { Logo, NavButtons } from './components';

const Header = () => {
  return (
    <div className="header position-sticky">
      <div className="mt-10 container">
        <div className="logo flex justify-content-space-between">
          <Logo />

          <NavButtons />
        </div>
      </div>
    </div>
  );
};

export default Header;
