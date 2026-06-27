<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const latest = $derived(data.posts[0]);
</script>

<svelte:head>
	<title>lovelog</title>
</svelte:head>

<article class="cover prose">
	<h1>lovelog</h1>
	<p class="cover-lead">사랑에 대해, 그리고 그 곁의 것들에 대해 쓰는 기록.</p>

	{#if latest}
		<p>
			가장 최근 글: <a href="/posts/{latest.post_id}">{latest.title}</a>
			<span class="cover-date">({latest.published_at})</span>
		</p>
	{:else}
		<p>아직 글이 없어요.</p>
	{/if}

	<p class="cover-hint">왼쪽 목차에서 글을 골라 읽어보세요.</p>
</article>
