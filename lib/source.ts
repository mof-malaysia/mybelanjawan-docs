import { docs, meta, start, startMeta } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});

export const startSource = loader({
  baseUrl: '/start',
  source: createMDXSource(start, startMeta)
});