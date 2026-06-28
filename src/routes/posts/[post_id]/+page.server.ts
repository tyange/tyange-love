import { getPost } from '$lib/cms';
import { renderMarkdown } from '$lib/markdown';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { posts } = await parent();
	const post = await getPost(params.post_id);

	if (!post) {
		error(404, '해당 글을 찾을 수 없어요.');
	}

	const index = posts.findIndex((p) => p.post_id === params.post_id);
	const prev = index > 0 ? posts[index - 1] : null;
	const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

	return {
		post,
		html: renderMarkdown(post.content),
		prev,
		next
	};
};
