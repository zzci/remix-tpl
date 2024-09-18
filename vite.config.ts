import mdx from '@mdx-js/rollup'
import { vitePlugin as remix } from '@remix-run/dev'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const { BASE_URL } = process.env

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: {
      protocol: 'wss',
      clientPort: 443,
    },
  },
  build: {
    minify: true,
    cssMinify: true,
  },
  base: BASE_URL || '/',
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    vanillaExtractPlugin(),
  ],
})
