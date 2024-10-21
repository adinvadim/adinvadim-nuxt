import { resolve } from "pathe";
import { getSafeEnv } from "./build-utils/env.util";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
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
          imgProxyUrl: getSafeEnv("IMGPROXY_URL"),
          imgProxyKey: getSafeEnv("IMGPROXY_KEY"),
          imgProxySalt: getSafeEnv("IMGPROXY_SALT"),
        },
      },
    },
  },

  tailwindcss: {
    cssPath: resolve(__dirname, "./assets/css/tailwind.css"),
    configPath: resolve(__dirname, "./tailwind.config.js"),
  },
});
