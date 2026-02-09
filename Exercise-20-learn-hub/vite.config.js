// import { defineConfig, loadEnv } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import tailwindcss from '@tailwindcss/vite';

// // https://vite.dev/config/
// export default defineConfig(({ mode }) => {
//     const env = loadEnv(mode, process.cwd(), '');
//     const URL = import.meta.env.VITE_DOMAIN_URL;
//     return {
//         plugins: [vue(), tailwindcss()],
//     };
// });

import { defineConfig, loadEnv } from 'vite'; // 1. ต้อง import loadEnv มาด้วย
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    // 2. ต้องโหลด env เข้ามาเก็บไว้ในตัวแปรก่อน
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [vue(), tailwindcss()],
        server: {
            port: 3001,
        },
    };
});
