import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     host: true, // Allows external access
    //     strictPort: true, // Ensures the same port is used
    //     allowedHosts: ["757b-2404-7c00-41-e28-98dc-2f00-11d5-7313.ngrok-free.app"], // Use only the domain name, not the full URL
    // },
});
