import { getPosts } from '$lib/cms';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	const posts = await getPosts();
	return { posts };
};
