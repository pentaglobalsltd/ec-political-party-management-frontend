import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import { resolve } from 'path';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on the mode
  const env = loadEnv(mode, process.cwd());
  dotenv.config({ path: resolve(process.cwd(), `.env.${mode}`) });

  return {
    plugins: [
      react(),
      checker({ typescript: true }),
      svgr({
        // svgr options: https://react-svgr.com/docs/options/
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
    ],
    define: {
      'process.env': env,
    },
    resolve: {
      alias: {
        '@api': '/src/api/',
        '@actions': '/src/redux/actions',
        '@containers': '/src/containers',
        '@components': '/src/components',
        '@constants': '/src/constants',
        '@helpers': '/src/helpers',
        '@utils': '/src/utils',
        '@reducers': '/src/redux/reducers',
        '@middlewares': '/src/redux/middlewares',
        '@selectors': '/src/redux/selectors',
        '@hooks': '/src/hooks',
        '@translation': '/src/translations',
        '@type': '/src/types',
        '@validations': '/src/validations',
        '@images': '/src/images',
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:math";`, // Optional: Load global Sass utilities if needed
        },
      },
    },
  };
});
