import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.depremhatti.app',
  appName: 'Deprem Hattı',
  webDir: 'out',
  server: {
    url: 'https://depremhatti.com',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
