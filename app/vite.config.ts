import react from '@vitejs/plugin-react'
import { defineConfig, type UserConfig } from 'vite'
import type { ViteReactSSGOptions } from 'vite-react-ssg'
import seo, { injectHead } from './seo-plugin.ts'
import { SITE_URL } from './src/data/site.ts'

// `ssgOptions` is vite-react-ssg's own field, so it is typed in rather than cast away — the
// rest of the config still gets checked. https://vite.dev/config/
const config: UserConfig & { ssgOptions: ViteReactSSGOptions } = {
  // The deploy path comes from SITE_URL, so the domain is configured in one place only.
  base: new URL(SITE_URL).pathname,
  plugins: [react(), seo()],
  // vite-react-ssg prerenders every route from one index.html, so the per-route <title>,
  // description, canonical and JSON-LD are swapped in just before each page is rendered.
  ssgOptions: {
    onBeforePageRender: (path, html) => injectHead(html, path),
  },
}

export default defineConfig(config)
