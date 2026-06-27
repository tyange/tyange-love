import { env } from '$env/dynamic/public';

/** lovelog가 노출할 태그 조건: category=general & tag∈{love, lovelog} */
const LOVELOG_CATEGORY = 'general';
const LOVELOG_TAGS = new Set(['love', 'lovelog']);

export const CMS_API_BASE = env.PUBLIC_CMS_API_BASE ?? 'https://tyange.com/api/cms';

export interface Tag {
	tag: string;
	category: string;
}

/** 목록 항목 (content 없음) */
export interface PostListItem {
	post_id: string;
	title: string;
	description: string;
	published_at: string;
	tags: Tag[];
	status: string;
}

/** 단일 포스트 (content 포함) */
export interface Post extends PostListItem {
	content: string;
}

interface PostsResponse {
	status: boolean;
	data: { posts: PostListItem[] } | null;
	message: string | null;
}

/** lovelog 노출 조건에 맞는 글인지 */
function isLovelogPost(post: PostListItem): boolean {
	return post.tags.some((t) => t.category === LOVELOG_CATEGORY && LOVELOG_TAGS.has(t.tag));
}

type FetchFn = typeof fetch;

/** lovelog 글 목록 (published, 최신순). SvelteKit load의 fetch를 넘겨 사용. */
export async function getPosts(fetchFn: FetchFn = fetch): Promise<PostListItem[]> {
	const res = await fetchFn(`${CMS_API_BASE}/posts`);
	if (!res.ok) {
		throw new Error(`목록을 불러오지 못했어요 (${res.status})`);
	}
	const body: PostsResponse = await res.json();
	const posts = body.data?.posts ?? [];
	return posts.filter(isLovelogPost);
}

/** 단일 글. 없으면 null. */
export async function getPost(postId: string, fetchFn: FetchFn = fetch): Promise<Post | null> {
	const res = await fetchFn(`${CMS_API_BASE}/post/${postId}`);
	if (res.status === 404) {
		return null;
	}
	if (!res.ok) {
		throw new Error(`글을 불러오지 못했어요 (${res.status})`);
	}
	return res.json();
}
