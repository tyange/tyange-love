<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	let sidebarOpen = $state(false);

	function isActive(postId: string): boolean {
		return page.url.pathname === `/posts/${postId}`;
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="book" class:sidebar-open={sidebarOpen}>
	<aside class="sidebar">
		<div class="sidebar-inner">
			<a class="brand" href="/" onclick={() => (sidebarOpen = false)}>lovelog</a>
			<nav class="toc">
				<ol>
					{#each data.posts as post (post.post_id)}
						<li>
							<a
								href="/posts/{post.post_id}"
								class:active={isActive(post.post_id)}
								onclick={() => (sidebarOpen = false)}
							>
								<span class="toc-title">{post.title}</span>
								<span class="toc-date">{post.published_at}</span>
							</a>
						</li>
					{/each}
				</ol>
			</nav>
		</div>
	</aside>

	<div class="content">
		<header class="topbar">
			<button
				class="menu-toggle"
				aria-label="목차 열기/닫기"
				aria-expanded={sidebarOpen}
				onclick={() => (sidebarOpen = !sidebarOpen)}
			>
				<span></span><span></span><span></span>
			</button>
			<a class="topbar-title" href="/">lovelog</a>
		</header>

		<main class="page">
			{@render children()}
		</main>
	</div>

	<button
		class="scrim"
		aria-label="목차 닫기"
		tabindex={sidebarOpen ? 0 : -1}
		onclick={() => (sidebarOpen = false)}
	></button>
</div>
