import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
    </div>
  );
};

export default App;
