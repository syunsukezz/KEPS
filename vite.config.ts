import { defineConfig } from 'vite';

const securityHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

export default defineConfig({
  server: {
    headers: securityHeaders,
  },
  preview: {
    headers: securityHeaders,
  },
  base: './', 
});
