// Sätteri hast plugin: keep generic section headings ("Panduan Bertulis", "Panduan Video")
// out of search. Many pages share them, so as search sub-results they say nothing about
// the page; ignoring them folds that text into the page's own result. The TOC is unaffected.
const GENERIC_HEADINGS = new Set(['Panduan Bertulis', 'Panduan Video']);

const textOf = (node) =>
	node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('');

export default function searchIgnoreHeadings() {
	return {
		name: 'mybelanjawan-search-ignore-headings',
		element: [
			{
				filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
				visit(node, ctx) {
					if (GENERIC_HEADINGS.has(textOf(node).trim())) {
						ctx.setProperty(node, 'data-pagefind-ignore', true);
					}
				},
			},
		],
	};
}
