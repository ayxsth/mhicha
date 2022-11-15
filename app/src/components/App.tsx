import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Toast from './toast/Toast';
import Header from './header/Header';

const App = () => {
  return (
    <div className="mhicha">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<></>} />
        </Routes>
      </BrowserRouter>

      <Toast />
    </div>
  );
};

export default App;
