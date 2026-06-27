<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.post.title} · lovelog</title>
	{#if data.post.description}
		<meta name="description" content={data.post.description} />
	{/if}
</svelte:head>

<article class="post prose">
	<header class="post-header">
		<h1>{data.post.title}</h1>
		<p class="post-meta">
			<time datetime={data.post.published_at}>{data.post.published_at}</time>
			{#each data.post.tags as t (t.category + t.tag)}
				<span class="tag">#{t.tag}</span>
			{/each}
		</p>
	</header>

	<!-- content는 본인 CMS에서 온 신뢰된 마크다운 -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html data.html}
</article>

<!-- 넓은 화면: mdBook 좌우 화살표 (화면 가장자리 고정) -->
<nav class="nav-wide-wrapper" aria-label="글 네비게이션">
	{#if data.prev}
		<a
			class="nav-chapters previous"
			href="/posts/{data.prev.post_id}"
			aria-label="이전 글: {data.prev.title}"
			title={data.prev.title}
		>
			<svg class="fa-svg" viewBox="0 0 256 512" aria-hidden="true">
				<path
					d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L154.7 256l109.6 109.6c9.4 9.4 9.4 24.6 0 33.9L241.7 422c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
				/>
			</svg>
		</a>
	{/if}
	{#if data.next}
		<a
			class="nav-chapters next"
			href="/posts/{data.next.post_id}"
			aria-label="다음 글: {data.next.title}"
			title={data.next.title}
		>
			<svg class="fa-svg" viewBox="0 0 256 512" aria-hidden="true">
				<path
					d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
				/>
			</svg>
		</a>
	{/if}
</nav>

<!-- 좁은 화면: 하단 박스 네비 -->
<nav class="post-nav-mobile" aria-label="이전/다음 글">
	{#if data.prev}
		<a class="post-nav-link prev" href="/posts/{data.prev.post_id}">
			<span class="post-nav-dir">← 이전</span>
			<span class="post-nav-title">{data.prev.title}</span>
		</a>
	{:else}
		<span></span>
	{/if}

	{#if data.next}
		<a class="post-nav-link next" href="/posts/{data.next.post_id}">
			<span class="post-nav-dir">다음 →</span>
			<span class="post-nav-title">{data.next.title}</span>
		</a>
	{:else}
		<span></span>
	{/if}
</nav>
