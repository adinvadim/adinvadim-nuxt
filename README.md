# Nuxt Layer Starter

This is a simple Nuxt layer starter project designed to help you quickly set up and develop Nuxt app with a pre-configured layer structure (For me).

## Drizzle

[Drizzle with Nuxt Hub](https://hub.nuxt.com/docs/recipes/drizzle)

And then add this to the `nuxt.config.ts`

```ts
hub: {
  database: true,
},
```

## Nuxt I18n

[See docs](https://v8.i18n.nuxtjs.org/guide/layers#merging-localesp)

For every project you need to configure locales in `nuxt.config.ts` like this:

Onlye fields `langDir` and `locales` are required.

```ts
  i18n: {
    langDir: "./locales",
    locales: [
      { code: "en", file: "en.yaml" },
      { code: "ru", file: "ru.yaml" },
    ],
  },
```

## Local Fonts

For work with local fonts you need put all fonts to public folder.
If your font has bold or italic variant, you need to name it as like `font-name.bold.woff2`.

[See docs](https://fonts.nuxt.com/get-started/providers#local)
