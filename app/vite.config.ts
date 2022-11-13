import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [{ find: '$', replacement: path.resolve(__dirname, 'src') }]
    },
    envPrefix: 'REACT_APP_',
    server: {
      port: Number(process.env.REACT_APP_PORT) || 3000
    }
  });
};
