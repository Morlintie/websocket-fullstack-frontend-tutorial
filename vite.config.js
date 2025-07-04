import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // Proxy all requests starting with /api to the backend server running on port 3000
      "/api": {
        target: "http://localhost:3000", // Backend URL
        changeOrigin: true, // Change the origin of the request
        secure: false, // Set to true if using HTTPS
        cookieDomainRewrite: {
          "*": "localhost", // Rewrites the domain of cookies
        },
        rewrite: (path) => path.replace(/^\/api/, ""), // Optionally remove /api prefix
      },
    },
  },

  // Optionally, add other settings if needed for your project
});
