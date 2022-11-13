import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './header/Header';
import Toast, { notify } from './toast/Toast';

const App = () => {
  return (
    <div className="mhicha">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<></>} />
        </Routes>
      </BrowserRouter>

      <button onClick={() => notify({ type: 'success', data: { title: 'Hello', message: 'Testings' } })}>
        Success
      </button>
      <button onClick={() => notify({ type: 'info', data: { title: 'Hello', message: 'Testings' } })}>Info</button>
      <button onClick={() => notify({ type: 'warning', data: { title: 'Hello', message: 'Testings' } })}>
        Warning
      </button>
      <button onClick={() => notify({ type: 'danger', data: { title: 'Hello', message: 'Testings' } })}>Danger</button>

      <Toast />
    </div>
  );
};

export default App;
