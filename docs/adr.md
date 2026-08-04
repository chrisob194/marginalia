# Architectural decisions

Mini ADR log for Marginalia. Append-only, newest last. Entries are written
from the main session via the `adr` skill (`.claude/skills/adr/`), in the same
turn a decision is taken. Read it for the *why* behind a past choice — the
code and `git log` already say *what*.

Two things must be checked in this file before appending: the pollution guard
(does this decision deserve an entry at all?) and the format. Both are below.

## Pollution guard

Before writing, apply this test: *is the reason readable from the diff by
someone who knows the stack?* If yes → no entry.
- ❌ what the code already states: "added `BookmarkService`", "entity has a
  `note` column", file/class renames
- ❌ anything git log or the issue/PR already answers: dependency bumps, bug
  fixes, refactors with no trade-off, "implemented issue #N"
- ❌ framework defaults followed without deviation (no decision was made)
- ❌ reversible local style choices with no downstream consequence
- ❌ a rationale already recorded in an existing entry → **update or
  supersede that entry**, never add a near-duplicate

## Format

One entry per decision, append-only, newest last. Max ~5 lines. Real date
from `date +%F` — never guessed.

```markdown
- **YYYY-MM-DD — <decision, in the imperative, one line>.**
  Rationale: <the why — the constraint or risk that drove it>.
  Rejected: <alternative> (<why not>).
  Consequence: <what this now forces or forbids>. (omit if none)
```

Never edit or delete a past entry: contradict it with a new one —
`- **YYYY-MM-DD — supersedes YYYY-MM-DD: <new decision>.**` — plus the
rationale for the change.

## Log

- **2026-08-03 — Ship the frontend with SSR / hybrid rendering (`@angular/ssr`), not as a plain CSR SPA.**
  Rationale: deliberate opt-in (`ng new --ssr`) to be able to exploit hybrid-rendering
  features (per-route `RenderMode`, prerendering, `@defer` hydrate triggers) later.
  Rejected: plain CSR SPA (simpler — static hosting, no Node runtime — but closes off those features).
  Consequence: deploying the frontend requires a Node process running `src/server.ts`, not a static
  file server; components must not touch `window`/`document` directly (use `DOCUMENT`, `afterNextRender`);
  auth-gated routes need an explicit render mode, since server rendering has no access to browser token storage.
- **2026-08-03 — Use bun as the only package manager; `bun.lock` is the single committed lockfile.**
  Rationale: the bootstrap PR shipped both `bun.lock` and `package-lock.json`; two lockfiles for two
  managers silently disagree on transitive versions and make "what does CI install?" unanswerable.
  Rejected: npm (nothing against it — but `angular.json` already pinned `"packageManager": "bun"`, so bun wins by consistency).
  Consequence: `package-lock.json` is to be deleted and gitignored (tracked in #4, not done yet);
  never run `npm install` in `frontend/` — use `bun install`.
- **2026-08-04 — Give documentation its own explicitly-invoked role (`tech-writer` + `/write-docs`), and make every `.md` fact live in exactly one file.**
  Rationale: docs drifted within one commit of the frontend landing (README claimed no frontend existed,
  `frontend/README.md` was `ng new` boilerplate contradicting both ADRs above) — nobody owned them, and
  duplicated facts are what rots first.
  Rejected: a skill loaded into the main session (no context isolation for the drift scan, and it breaks the
  one-role-one-command symmetry the other 5 roles establish).
  Consequence: the Technical Writer is the only writer of `.md` files and may edit them directly, but is barred
  from application code and from this ADR log; a fact duplicated across two docs is a defect, not something to
  keep in sync — the second copy becomes a link.
- **2026-08-04 — Move the ADR log and its rules out of `CLAUDE.md` into `docs/adr.md` plus an `adr` skill.**
  Rationale: the section had grown to half of `CLAUDE.md` and was paid for in every turn of every session,
  while its rules are only needed the moment an entry is written; a skill's `description` stays in context
  (so the trigger still fires) but its body loads on demand.
  Rejected: keeping a compressed trigger stub in `CLAUDE.md` (still static context, and it duplicates the
  skill description). Not a contradiction of the entry above, which rejected a skill for a *role*: that
  needed context isolation and one-role-one-command symmetry, neither of which applies to a main-session reflex.
  Consequence: entries go here, never into `CLAUDE.md`; the Technical Writer now owns all of `CLAUDE.md` but
  is barred from this file; appending requires reading it first — guard, format and possible supersede all live here.
