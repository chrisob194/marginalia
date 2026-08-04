# Frontend

Angular 22 app for Marginalia. Stack rationale, current phase, and roles
live in the root [`README.md`](../README.md) and [`CLAUDE.md`](../CLAUDE.md)
— this file only covers day-to-day commands.

Package manager is **bun** (pinned in `angular.json` → `cli.packageManager`
and `package.json` → `packageManager`). Use `bun`, not `npm`/`npx`, for
everything below.

## Setup

```bash
cd frontend
bun install
```

## Dev server

```bash
bun run start   # ng serve, http://localhost:4200
```

No proxy is configured (`serve` target in `angular.json` has no options
block), so calls to a backend API are not currently forwarded anywhere —
there is no `backend/` in this repo yet.

## Build

```bash
bun run build          # production build (default configuration)
bun run watch           # development configuration, rebuilds on change
```

The `build` target uses the `@angular/build:application` builder with
`outputMode: "server"` and `ssr.entry: src/server.ts`: every build produces
both a browser bundle and a server bundle in `dist/frontend/`.

### Running the SSR output

```bash
bun run build
bun run serve:ssr:frontend   # node dist/frontend/server/server.mjs, port 4000 (or $PORT)
```

`src/server.ts` today only serves the prerendered/static output and falls
through to Angular's request handler — the commented-out
`app.get('/api/{*splat}', ...)` block is not wired to anything. There is no
API proxying happening at runtime yet.

`src/app/app.routes.server.ts` sets every route (`**`) to
`RenderMode.Prerender`, so the whole app is currently prerendered at build
time rather than rendered per-request.

## Tests

```bash
bun run test
```

Runs the `test` target (`@angular/build:unit-test` builder), which drives
[Vitest](https://vitest.dev/) with jsdom. Existing specs:
- `src/app/app.spec.ts`
- `src/app/features/home/home.spec.ts`

No coverage provider is installed. There is no Karma configuration and no
`e2e` target — manual end-to-end testing against the running dev server is
done separately via Chrome MCP (see the `/test-feature` command in the root
README), not from this project.

## Rendering & change detection

- Hydration is enabled via `provideClientHydration(withEventReplay(),
  withNoIncrementalHydration())` in `src/app/app.config.ts`.
- No `zone.js` dependency is installed and no explicit
  `provideZonelessChangeDetection()` call exists — the app runs zoneless
  under Angular 22's default.

## Styling

Tailwind CSS v4, CSS-first setup: `src/styles.css` is just
`@import "tailwindcss";`, and `.postcssrc.json` loads `@tailwindcss/postcss`.
There is no `tailwind.config.*` file — v4 needs none for this setup. No
template currently uses a Tailwind utility class.

## TypeScript strictness

`tsconfig.json` enables `strict`, `noPropertyAccessFromIndexSignature`,
`noImplicitReturns`, `noImplicitOverride`, `noFallthroughCasesInSwitch`,
plus the Angular-specific `strictTemplates`, `strictInjectionParameters`,
and `strictInputAccessModifiers`.

## Linting / formatting

No ESLint config exists in this project. A Prettier config is inlined in
`package.json` (`printWidth: 100`, `singleQuote: true`, `*.html` parsed as
`angular`), but `prettier` itself is not listed as a dependency, so
`bun run` cannot invoke it yet. `.editorconfig` is present at the repo root
of this project.

## What's wired, what isn't

Providers currently registered in `src/app/app.config.ts`:
`provideBrowserGlobalErrorListeners()`, `provideRouter(routes)`,
`provideClientHydration(...)`.

Not present yet, despite being learning objectives for the current phase
(see `CLAUDE.md`): `provideHttpClient`, any HTTP interceptor, any route
guard, any `@Injectable` service, `src/environments/`, and any TypeScript
path alias. `@angular/forms` is a declared dependency but nothing in `src/`
imports it yet.

## Structure

What exists today:

```
src/
  app/
    app.config.ts          # app-wide providers (browser)
    app.config.server.ts   # SSR providers
    app.routes.ts           # client routes
    app.routes.server.ts    # per-route render mode (prerender)
    app.ts / app.html       # root component
    features/
      home/                 # Home feature (component only, no sub-routes yet)
  main.ts                  # browser bootstrap
  main.server.ts            # server bootstrap
  server.ts                 # Express SSR host
```

`core/` and `shared/` do not exist yet. When they're created, the rule is:
- **`core/`** — singleton providers only (HTTP interceptors, route guards,
  app-wide services such as an eventual `AuthService`). Never imports from
  a feature.
- **`shared/`** — components, pipes, and directives reused across more
  than one feature.
- **`features/`** — one directory per feature, holding that feature's
  components and (if needed) its own routes.
