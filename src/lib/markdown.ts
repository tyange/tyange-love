import { marked } from 'marked';

marked.setOptions({
	gfm: true,
	breaks: false
});

/** CMS에 저장된 마크다운 문자열을 HTML로 변환. */
export function renderMarkdown(markdown: string): string {
	return marked.parse(markdown, { async: false });
}
