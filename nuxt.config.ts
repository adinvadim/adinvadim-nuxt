import { resolve } from "pathe";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxtjs/device",
    "@nuxt/devtools",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "@pinia-orm/nuxt",
    "@nuxt/icon",
    "nuxt-local-iconify",
    "@nuxtjs/tailwindcss",
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
        provider: resolve(
          __dirname,
          "./build-utils/nuxt-image/imgproxy.provider"
        ),
        options: {
          imgProxyUrl: process.env.IMGPROXY_URL,
          imgProxyKey: process.env.IMGPROXY_KEY,
          imgProxySalt: process.env.IMGPROXY_SALT,
        },
      },
    },
  },

  tailwindcss: {
    cssPath: resolve(__dirname, "./assets/css/tailwind.css"),
    configPath: resolve(__dirname, "./tailwind.config.js"),
  },

  i18n: {
    locales: [
      {
        code: "en",
        file: resolve(__dirname, "./locales/en.yaml"),
      },
      {
        code: "ru",
        file: resolve(__dirname, "./locales/ru.yaml"),
      },
    ],
    defaultLocale: "ru",
    strategy: "prefix",
    lazy: true,
    langDir: "locales",

    vueI18n: resolve(__dirname, "./i18n.config.ts"),

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
