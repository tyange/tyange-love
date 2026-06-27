<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	const THEMES = [
		{ id: 'light', label: 'Light' },
		{ id: 'dark', label: 'Dark' }
	];

	function initTheme(): string {
		if (typeof document === 'undefined') return 'dark';
		const found = THEMES.find((t) => document.documentElement.classList.contains(t.id));
		return found ? found.id : 'dark';
	}

	function initSidebar(): boolean {
		if (typeof window === 'undefined') return true;
		return window.innerWidth >= 1080;
	}

	let theme = $state(initTheme());
	let sidebarVisible = $state(initSidebar());
	let themePopupOpen = $state(false);
	let themeMenu = $state<HTMLElement>();

	function isActive(postId: string): boolean {
		return page.url.pathname === `/posts/${postId}`;
	}

	// 테마 선택을 <html> 클래스 + localStorage에 반영
	$effect(() => {
		const el = document.documentElement;
		for (const t of THEMES) el.classList.remove(t.id);
		el.classList.add(theme);
		try {
			localStorage.setItem('lovelog-theme', theme);
		} catch {
			/* ignore */
		}
	});

	function selectTheme(id: string) {
		theme = id;
		themePopupOpen = false;
	}

	function closeSidebarOnMobile() {
		if (typeof window !== 'undefined' && window.innerWidth < 1080) {
			sidebarVisible = false;
		}
	}

	function onWindowPointerDown(e: PointerEvent) {
		if (themePopupOpen && themeMenu && !themeMenu.contains(e.target as Node)) {
			themePopupOpen = false;
		}
	}

	function onWindowKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			themePopupOpen = false;
		}
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<svelte:window onpointerdown={onWindowPointerDown} onkeydown={onWindowKeydown} />

<div class="book" class:sidebar-visible={sidebarVisible}>
	<nav class="sidebar" aria-label="목차">
		<div class="sidebar-scrollbox">
			<ol class="chapter">
				<li class="chapter-item">
					<a href="/" class:active={page.url.pathname === '/'} onclick={closeSidebarOnMobile}
						>lovelog</a
					>
				</li>
				<li class="spacer"></li>
				{#each data.posts as post (post.post_id)}
					<li class="chapter-item">
						<a
							href="/posts/{post.post_id}"
							class:active={isActive(post.post_id)}
							onclick={closeSidebarOnMobile}
						>
							{post.title}
							<span class="chapter-date">{post.published_at}</span>
						</a>
					</li>
				{/each}
			</ol>
		</div>
	</nav>

	<div class="page-wrapper">
		<div class="menu-bar">
			<div class="left-buttons">
				<button
					class="icon-button"
					aria-label="목차 토글"
					aria-expanded={sidebarVisible}
					onclick={() => (sidebarVisible = !sidebarVisible)}
				>
					<svg class="fa-svg" viewBox="0 0 448 512" aria-hidden="true">
						<path
							d="M16 132h416c8.8 0 16-7.2 16-16V76c0-8.8-7.2-16-16-16H16C7.2 60 0 67.2 0 76v40c0 8.8 7.2 16 16 16zm0 160h416c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h416c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16z"
						/>
					</svg>
				</button>
				<div class="theme-wrapper" bind:this={themeMenu}>
					<button
						class="icon-button"
						aria-label="테마 변경"
						aria-haspopup="true"
						aria-expanded={themePopupOpen}
						onclick={() => (themePopupOpen = !themePopupOpen)}
					>
						<svg class="fa-svg" viewBox="0 0 512 512" aria-hidden="true">
							<path
								d="M167.02 309.34c-40.12 2.58-76.53 17.86-97.19 72.3-2.35 6.21-8 9.98-14.59 9.98-11.11 0-45.46-27.67-55.25-34.35C0 439.62 37.93 512 128 512c75.86 0 128-43.77 128-120.19 0-3.11-.65-6.08-.97-9.13l-88.01-73.34zM457.89 0c-15.16 0-29.37 6.71-40.21 16.45C213.27 199.05 192 203.34 192 257.09c0 13.7 3.25 26.76 8.73 38.7l63.82 53.18c7.21 1.8 14.64 3.03 22.39 3.03 53.85 0 64.583-22.965 247.51-227.31C543.79 96.74 512 78.5 512 53.42 512 19.92 484.07 0 457.89 0z"
							/>
						</svg>
					</button>
					{#if themePopupOpen}
						<ul class="theme-popup" role="menu">
							{#each THEMES as t (t.id)}
								<li role="none">
									<button
										class="theme"
										class:theme-selected={theme === t.id}
										role="menuitem"
										onclick={() => selectTheme(t.id)}
									>
										{t.label}
									</button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>

			<a class="menu-title" href="/">lovelog</a>

			<div class="right-buttons"></div>
		</div>

		<div class="page">
			<div class="content">
				<main>
					{@render children()}
				</main>
			</div>
		</div>
	</div>

	<button class="scrim" aria-label="목차 닫기" onclick={() => (sidebarVisible = false)}></button>
</div>
