<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

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

	{@html data.html}
</article>

<nav class="nav-wide-wrapper" aria-label="글 네비게이션">
	{#if data.prev}
		<a
			class="nav-chapters previous"
			href="/posts/{data.prev.post_id}"
			aria-label="이전 글: {data.prev.title}"
			title={data.prev.title}
		>
			<svg
				class="nav-icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="m15 18-6-6 6-6" />
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
			<svg
				class="nav-icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="m9 18 6-6-6-6" />
			</svg>
		</a>
	{/if}
</nav>

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
