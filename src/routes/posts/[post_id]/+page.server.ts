import { getPost } from '$lib/cms';
import { renderMarkdown } from '$lib/markdown';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { posts } = await parent();
	// 전역 fetch 사용 (Origin 헤더 회피, +layout.server.ts 참고)
	const post = await getPost(params.post_id);

	if (!post) {
		error(404, '해당 글을 찾을 수 없어요.');
	}

	const index = posts.findIndex((p) => p.post_id === params.post_id);
	// 목록은 최신순. prev = 더 최신(위), next = 더 과거(아래).
	const prev = index > 0 ? posts[index - 1] : null;
	const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

	return {
		post,
		html: renderMarkdown(post.content),
		prev,
		next
	};
};
