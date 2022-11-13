const app = {
  name: import.meta.env.REACT_APP_NAME || 'mhicha',
  port: Number(import.meta.env.REACT_APP_PORT) || 3000,
  version: Number(import.meta.env.REACT_APP_VERSION) || 1
};

export default app;
