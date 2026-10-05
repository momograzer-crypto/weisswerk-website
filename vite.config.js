import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: Number(process.env.PORT) || 3000,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 3000,
  },
});
