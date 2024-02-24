import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react-swc";

dotenv.config();

// Get client port from .env file
const clientPort = process.env.CLIENT_PORT;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: clientPort,
  },
});
