import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export const { docs: start, meta: startMeta } = defineDocs({
  dir: 'content/start',
});

export default defineConfig();
