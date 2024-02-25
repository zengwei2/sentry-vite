import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import dayjs from 'dayjs';
import * as Sentry from '@sentry/vue';

const app = createApp(App);

console.log('============a=========', import.meta.env.PROD);

const ignorePromiseErrors = 'Non-Error promise rejection captured';

// if (import.meta.env.PROD) {
Sentry.init({
  app,
  // dsn: 'https://569bd255ef628c85f4a9c7f39b84254a@o4506766429192192.ingest.sentry.io/4506766632288256',
  dsn: 'http://584c82f1c3b20f042457f252cf63f15a@192.168.1.4:9000/2',
  // ignoreErrors: ['Non-Error promise rejection captured'],
  beforeSend(event, hint) {
    // const { message } = hint.originalException;

    // 判断是否部分匹配( null 则可忽略 promise reject 的错误，同上面注释的 ignoreErrors 一致 )
    if (event?.exception?.values?.[0]?.value.includes(ignorePromiseErrors)) {
      return null;
    }

    return event;
  },
  // denyUrls: [/http:\/\/localhost[\s\S]+/],
  // 集成，在向您的应用程序添加自动检测
  integrations: [
    // Sentry.breadcrumbsIntegration({ console: false }),
    // Sentry.browserTracingIntegration(),
    // Sentry.replayIntegration({
    //   maskAllText: false,
    //   blockAllMedia: false,
    // }),
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  release: `sentry@${dayjs(new Date()).format('YYYY-MM-DD HH-mm')}`,
  // // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // tracePropagationTargets: ['localhost', /^https?:\/\/[\s\S]+[.com]?/],
  // tracePropagationTargets: ['localhost', 'http://172.22.82.138:9092/'],
  // // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
// }

app.mount('#app');
