# Personal notebook

Maunu Aunesluoma’s personal homepage, public technical notebook, and collection of personal, research, and work-related coding projects. Writing explores LLMs, AI agents, security, cognition, AI-assisted work, software engineering, and related systems or philosophical questions. Ideas begin privately in Obsidian and become occasional essays when worth sharing; there is no publishing schedule.

For agent collaboration, start with [AGENTS.md](AGENTS.md), which records the editorial preferences and development conventions.

A minimal Astro site for occasional essays and selected projects. Static HTML and CSS, system fonts, no React, CMS, database, analytics, or client JavaScript.

The home screen uses a large name header with Home, Writing, and Coding links. The header moves upward as you open a section, using native cross-document CSS view transitions. Browsers without support use normal page navigation; reduced-motion preferences disable the animation. Coding projects and profile links live on the Coding page.

## Develop

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. Development includes drafts, clearly labeled. `npm run build` produces the public site in `dist/`; `npm run preview` serves that production output without drafts. `npm run check` checks Astro and TypeScript.

## Personalize

- `src/data/site.ts`: name, introduction, social links, projects. Only add real destinations.
- `src/pages/coding/index.astro`: coding introduction and project list. The old `/about/` route redirects here.
- `src/styles/global.css`: layout, spacing, colors, navigation, and page transitions.
- `src/styles/prose.css`: article typography.
- `public/favicon.svg`: small site icon.

Social links accept `{ label: 'GitHub', href: 'https://github.com/your-username' }`. For a CV, put your PDF in `public/` and use a base-aware link via the `url()` helper for deployments under a repository path.

## Project entries and notes

The `projects` array in `src/data/site.ts` is a manually curated list, initially based on the public pinned repositories. It does not fetch from GitHub when someone visits the site. Edit the descriptions, ordering, and `kind` labels there; `href` links to the repository.

A project can also have a `page` such as `coding/llm-lab/`. Its title and **Project notes** link then open a local page while **GitHub** still goes directly to the repository. Omit `page` for projects that only need an external link.

For another notes page, copy `src/pages/coding/llm-lab.md`, change the filename, and set its frontmatter `project` to the exact matching `name` in the projects array. The shared `Project.astro` layout reads the title, description, and links from that entry. Project notes are published with the site; unlike the writing collection, they do not have draft filtering.

The initial notes and project descriptions were prepared from public repository descriptions and READMEs for review. Add your own role, motivations, and observations as you refine them. Source links open GitHub; no repository contents are mirrored locally.

## Write privately, publish deliberately

Keep your Obsidian vault outside this repository. Copy only articles intended for eventual publication into `src/content/writing/`. Draft files are excluded from the built website, **but remain visible in a public GitHub repository and its history**. The ignored `private/` directory is available for local scratch work, though a separate vault is preferable.

1. Copy `templates/essay.md` to `src/content/writing/your-article-slug.md`.
2. Replace the metadata and write in standard Markdown. The filename becomes the URL; keep it stable after publishing.
3. Preview with `npm run dev`. Drafts appear locally with a notice and `noindex` metadata.
4. When ready, set `draft: false` and set `date` to the publication date.
5. Run `npm run check` and `npm run build`, then commit and push to `main`.

Dates are publication labels, not scheduling controls. A `draft: false` article is included regardless of its date. Missing `draft` defaults to `true`.

The remaining sample drafts (`prompt-injection-is-an-authority-problem.md` and `natural-language-and-structured-intent.md`) are AI-written layout outlines based on the initial brief, not finished essays or claims of authorship. Other articles contain Maunu’s own evolving writing; do not mistake them for disposable starter content. Replace or delete them before publishing your own writing. With no published essays, production shows an intentional empty state.

Standard Markdown headings, links, footnotes, lists, quotes, tables, and fenced code blocks work. Convert Obsidian `[[wikilinks]]` and `![[embeds]]` to ordinary Markdown before copying. Store article images next to the Markdown and reference them relatively (for example `![Description](./image.png)`). For links between articles, use relative URL paths such as `../another-article/` to preserve GitHub Pages subpath support.

### Math expressions

Use `$2^4 = 16$` for inline math. For a separate equation, put double dollar signs on their own lines:

```markdown
$$
\text{Memory (bytes)} = \frac{N \times b}{8}
$$
```

Use braces for grouped exponents (`$10^{12}$`), underscores for subscripts (`$W_0$`), and `\$` for a literal dollar sign. Math is rendered at build time with KaTeX; no browser JavaScript is required.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on pushes to `main`. It reads the origin and base path from GitHub Pages, so both `username.github.io` repositories and ordinary project repositories work without hardcoded account names.

1. Create or select your GitHub repository and push this project to its `main` branch. Include `package-lock.json`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Run **Deploy to GitHub Pages** from Actions, or push a new commit.

The site is deployed at [maunugit.github.io/website](https://maunugit.github.io/website/) from [maunugit/website](https://github.com/maunugit/website). Pages is already configured to use GitHub Actions. Future updates go live after committing and pushing to `main`; the steps above describe initial setup for another repository. For free hosting on a GitHub Free account, use a public repository. Consult [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) for plan availability and [Astro’s deployment guide](https://docs.astro.build/en/guides/deploy/github/) for the underlying workflow.

To check a project subpath locally:

```sh
SITE_URL=https://example.github.io BASE_PATH=/personal-site npm run build
BASE_PATH=/personal-site npm run preview
```

For a custom domain later, configure it in GitHub Pages, follow GitHub’s DNS instructions, and add the domain to `public/CNAME`. The workflow picks up the configured Pages origin and base path. No domain is required for the first version.

## Structure

```text
src/
  components/       Shared writing list
  content/writing/  Markdown essays
  data/site.ts      Personal details and project links
  layouts/          Shared page shell
  lib/              Content, URL, and date helpers
  pages/            Home, coding, writing index, article routes, 404
  styles/           Site and article styles
templates/          Blank essay template (not published)
public/             Static assets
.github/workflows/  GitHub Pages deployment
```
