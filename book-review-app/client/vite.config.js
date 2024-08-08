import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set the port for the development server
    open: true, // Automatically open the app in the default browser
  },
  build: {
    outDir: 'dist', // Directory for the build output
    sourcemap: true, // Generate source maps for debugging
  },
  resolve: {
    alias: {
      '@': '/src', // Create an alias for the src directory
    },
  },
});
