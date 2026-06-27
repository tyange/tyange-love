import { getPosts } from '$lib/cms';
import type { LayoutServerLoad } from './$types';

// CMS의 CORS 미들웨어가 cms.tyange.com만 허용하므로, Origin 헤더를 붙이는
// SvelteKit fetch 대신 전역 fetch(undici)로 서버↔서버 요청한다.
export const load: LayoutServerLoad = async () => {
	const posts = await getPosts();
	return { posts };
};
