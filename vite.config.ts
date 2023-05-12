import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9999
  },
  resolve:{
    alias : {
      "@": path.resolve("/", "./src/"),
      "@src": path.resolve( "./src/"),
    }
  }
})
