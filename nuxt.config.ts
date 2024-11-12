import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  runtimeConfig: {
    public: {
      awsRegion: process.env.APP_AWS_REGION || null,
      awsBucketName: process.env.APP_AWS_BUCKET_NAME || null,
      cognitoIdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID || null,
    },
  },
  modules: [
    "@nuxthub/core",
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxtjs/device",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "@pinia-orm/nuxt",
    "@nuxt/icon",
    "nuxt-local-iconify",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/seo",
    "@nuxthq/studio",
  ],

  devtools: { enabled: true },

  build: {
    transpile: [
      "swiper",
      "semver",
      "@headlessui/vue",
      "swiper/vue",
      "swiper",
      "fp-ts",
      "safe-buffer",
      "pinia-orm",
    ],
  },

  image: {
    providers: {
      imgproxy: {
        name: "imgproxy",
        provider: join(currentDir, "./utils/nuxt-image/imgproxy.provider"),
        options: {
          imgProxyUrl: process.env.IMGPROXY_URL,
          imgProxyKey: process.env.IMGPROXY_KEY,
          imgProxySalt: process.env.IMGPROXY_SALT,
        },
      },
    },
  },

  i18n: {
    locales: [
      {
        code: "en",
        file: "en.yaml",
      },
      {
        code: "ru",
        file: "ru.yaml",
      },
    ],
    defaultLocale: "ru",
    strategy: "prefix",
    lazy: true,
    langDir: "locales",

    vueI18n: join(currentDir, "./i18n.config.ts"),

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  },

  nitro: {
    experimental: {
      openAPI: true,
    },
  },
});
