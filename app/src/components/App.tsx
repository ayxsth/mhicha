import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Toast from './toast/Toast';
import Header from './header/Header';
import Footer from './footer/Footer';
import Landing from './landing/Landing';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className="mhicha-body">
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>

      <Toast />
    </>
  );
};

export default App;
