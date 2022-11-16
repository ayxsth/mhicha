import { getCurrentYear } from '$/utils/date.util';

const Footer = () => {
  return <div className="text-align-center mhicha-footer">© mhicha {getCurrentYear()}. All rights reserved.</div>;
};

export default Footer;
