import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      vue(), // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        org: 'sentry',
        project: 'vue-project1',
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
      }),
    ],
  };
});
