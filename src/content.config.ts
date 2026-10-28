import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	// Starlight ships no Malay UI strings, so they live in src/content/i18n/ms.json
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
