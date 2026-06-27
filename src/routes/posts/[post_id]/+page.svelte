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

<nav class="post-nav" aria-label="이전/다음 글">
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
