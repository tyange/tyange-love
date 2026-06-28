import { getPosts } from '$lib/cms';
import type { LayoutServerLoad } from './$types';

// 전체 사이트를 SSG로 프리렌더. 크롤러가 '/'에서 출발해 사이드바의 글 링크를
// 따라가며 /posts/[post_id]까지 모두 정적 생성한다.
export const prerender = true;

// CMS의 CORS 미들웨어가 cms.tyange.com만 허용하므로, Origin 헤더를 붙이는
// SvelteKit fetch 대신 전역 fetch(undici)로 서버↔서버 요청한다.
export const load: LayoutServerLoad = async () => {
	const posts = await getPosts();
	return { posts };
};
