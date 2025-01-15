import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

import db from "@astrojs/db";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",
  server: { host: true },
  integrations: [vue(), db()],
  adapter: netlify({ edgeMiddleware: true }),
});
