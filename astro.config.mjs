// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import searchIgnoreHeadings from './src/plugins/search-ignore-headings.mjs';

/** Build sidebar links under `docs/<dir>/` in the given order. */
const pages = (dir, slugs) => slugs.map((s) => `docs/${dir ? `${dir}/` : ''}${s}`);

const permulaan = [
	'logmasuk-emel',
	'logmasuk-mygovuc',
	'logmasuk-kalipertama',
	'penetapan-2fa',
	'permohonan-tetapan-semula-2fa',
];

// https://astro.build/config
export default defineConfig({
	markdown: {
		processor: satteri({ hastPlugins: [searchIgnoreHeadings()] }),
	},
	redirects: {
		'/': '/docs/rumusan',
		'/start': '/docs/permulaan/logmasuk-emel',
		// Old /start/* URLs from the Fumadocs site
		...Object.fromEntries(permulaan.map((s) => [`/start/${s}`, `/docs/permulaan/${s}`])),
	},
	integrations: [
		starlight({
			title: 'MyBelanjawan',
			logo: { src: './src/assets/jata-logo.png', alt: 'Jata Negara' },
			favicon: '/favicon.ico',
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource/poppins/600.css',
				'@fontsource-variable/roboto-mono',
				'./src/styles/myds.css',
			],
			// Docs title lockup, search section metadata, light theme only
			components: {
				Head: './src/components/Head.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			expressiveCode: { themes: ['starlight-light'] },
			locales: {
				root: { label: 'Bahasa Melayu', lang: 'ms' },
			},
			sidebar: [
				{
					label: 'Panduan Permulaan',
					items: [
						...pages('', ['rumusan', 'logmasuk']),
						{ label: 'Log Masuk & 2FA', collapsed: true, items: pages('permulaan', permulaan) },
						...pages('', ['panduan-navigasi', 'video-panduan-pengguna']),
					],
				},
				{
					label: 'Urusan Admin',
					items: [
						{
							label: 'Tetapan Pengguna',
							collapsed: true,
							items: pages('pengguna', [
								'jemputan',
								'sistem',
								'kementerian',
								'kebenaran-tetapan-semula-2fa',
								'organisasi',
								'senarai',
							]),
						},
						{
							label: 'Tetapan Struktur Belanjawan',
							collapsed: true,
							items: pages('tetapan-belanjawan', ['belanjawan', 'belanjawan-data', 'kp']),
						},
						{
							label: 'Tetapan Struktur Program dan Aktiviti',
							collapsed: true,
							items: pages('prgakt', ['baharu', 'program-dsa', 'aktiviti-dsa', 'tajuk']),
						},
					],
				},
				{
					label: 'Perancangan Belanjawan',
					items: [
						{
							label: 'Kerangka Prestasi',
							collapsed: true,
							items: pages('kp', [
								'rmk',
								'nasional-outcome',
								'nasional-kpi',
								'mp-latarbelakang',
								'mp-outcome',
								'mp-kpi',
								'program-latarbelakang',
								'program-outcome',
								'program-kpi',
								'aktiviti-latarbelakang',
								'aktiviti-outcome',
								'aktiviti-kpi',
								'aktiviti-output',
								'aktiviti-pi',
								'semakan-aktiviti',
								'semakan-program',
								'semakan-kementerian',
								'semakan-nasional',
							]),
						},
						{
							label: 'Perbelanjaan Mengurus (OE)',
							collapsed: true,
							items: pages('oe', [
								'si',
								'dipohon',
								'semakan-aktiviti',
								'semakan-program',
								'semakan-ppengawal',
								'disyor',
								'semakan-bro',
								'semakan-tpbnsektor',
								'diperaku',
								'semakan-dasar',
								'semakan-tpbndasar',
								'semakan-pbn',
							]),
						},
						{
							label: 'Perbelanjaan Pembangunan (DE)',
							collapsed: true,
							items: pages('de', [
								'muatnaik-ke',
								'projek',
								'dipohon',
								'semakan-bro',
								'semakan-tpbns',
								'semakan-dasar',
								'semakan-tpbndasar',
								'semakan-pbn',
							]),
						},
					],
				},
				{
					label: 'Penjanaan Dokumen',
					items: pages('', ['laporan', 'buku']),
				},
				{
					label: 'Pelaporan dan Pemantauan',
					items: pages('', [
						'pemantauan-nasional',
						'pemantauan-mp',
						'pemantauan-program',
						'pemantauan-aktiviti',
					]),
				},
			],
		}),
	],
});
