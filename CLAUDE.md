## lovelog

SvelteKit으로 만드는 개인 블로그("lovelog")입니다. 블로그 글은 Markdown(mdsvex)으로
작성하며, Rust Book(https://doc.rust-lang.org/book/)을 본뜬 문서형 읽기 레이아웃으로
보여줍니다:

- 좌측 사이드바: 접히는 중첩 목차
- 중앙: 글 본문, 편안한 읽기 폭
- 상단바: 테마 토글, 검색, 네비게이션
- 하단: 이전 / 다음 글 네비게이션

---

## 프로젝트 구성

- **언어**: TypeScript
- **패키지 매니저**: bun
- **부가 도구**: vitest, playwright, tailwindcss, mdsvex, mcp

---

## 린팅 / 포맷팅

[oxc](https://oxc.rs) 도구 체인을 사용합니다.

- **린터**: oxlint (`.oxlintrc.json`) — `import` / `typescript` / `unicorn` 플러그인,
  `correctness`는 에러 처리
- **포매터**: oxfmt (`.oxfmtrc.json`) — 탭 들여쓰기, printWidth 100, 싱글쿼트,
  `.svelte` 포맷팅(prettier-plugin-svelte), Tailwind 클래스 정렬

명령어:

- `bun run lint` — 린트 검사
- `bun run lint:fix` — 린트 자동 수정
- `bun run format` — 전체 포맷 적용(write)
- `bun run format:check` — 포맷 검사만(CI용)

규칙:

- 코드를 작성하거나 수정한 뒤에는 `bun run format`과 `bun run lint`를 돌려
  포맷·린트를 통과시킵니다.
- oxlint/oxfmt는 `.ts` / `.js`와 `.svelte` 파일을 다룹니다. **타입 검사**는
  `bun run check`(svelte-check)가 담당하므로, 타입 관련 변경 후에는 함께 확인합니다.
- **주석을 달지 않습니다.** 코드는 이름과 구조로 자명하게 작성하고, 설명용 주석
  (JSDoc, 섹션 구분, "왜"를 적는 주석 등)을 남기지 않습니다. 기존 주석을 발견하면
  제거합니다.

---

## 배포

SSG(정적 사이트 생성)로 배포합니다. SvelteKit `@sveltejs/adapter-static`로 전체
사이트를 프리렌더(`src/routes/+layout.server.ts`의 `export const prerender = true`)하며,
빌드 출력은 `build/`입니다. 글 데이터는 빌드 시점에 원격 CMS(`PUBLIC_CMS_API_BASE`)에서
fetch해 HTML에 굽습니다 — 글이 바뀌면 재빌드가 필요합니다.

`main` 푸시 또는 수동 `workflow_dispatch` 시 GitHub Actions(`.github/workflows/main.yml`)가
빌드 후 AWS Lightsail로 SCP 배포하고 nginx를 reload합니다. 서비스 도메인은
`love.tyange.com`입니다.

---

Svelte MCP 서버를 사용할 수 있으며, 여기에서 Svelte 5와 SvelteKit의 종합 문서에
접근할 수 있습니다. 사용 가능한 도구를 효과적으로 활용하는 방법은 다음과 같습니다:

## 사용 가능한 Svelte MCP 도구:

### 1. list-sections

사용 가능한 모든 문서 섹션을 파악하기 위해 이 도구를 가장 먼저 사용하세요. 제목,
use_cases, 경로가 담긴 구조화된 목록을 반환합니다.
Svelte 또는 SvelteKit 주제에 대한 질문을 받으면, 관련 섹션을 찾기 위해 항상 대화
시작 시 이 도구를 사용하세요.

### 2. get-documentation

특정 섹션의 전체 문서 내용을 가져옵니다. 단일 또는 여러 섹션을 받을 수 있습니다.
list-sections 도구를 호출한 후에는, 반환된 문서 섹션(특히 use_cases 필드)을 반드시
분석하고, 사용자의 작업에 관련된 모든 문서 섹션을 get-documentation 도구로
가져와야 합니다.

### 3. svelte-autofixer

Svelte 코드를 분석하여 문제점과 개선 제안을 반환합니다.
Svelte 코드를 작성할 때는 사용자에게 보내기 전에 반드시 이 도구를 사용해야 합니다.
더 이상 문제나 제안이 반환되지 않을 때까지 계속 호출하세요.

### 4. playground-link

제공된 코드로 Svelte Playground 링크를 생성합니다.
코드를 완성한 후, 사용자에게 playground 링크를 원하는지 물어보세요. 사용자가 확인한
후에만 이 도구를 호출하고, 코드를 사용자의 프로젝트 파일에 작성한 경우에는 절대
호출하지 마세요.
