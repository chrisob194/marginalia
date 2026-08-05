# Project: Marginalia — bookmark & note manager

## Stack
- Frontend: Angular 22 — use the Angular MCP server built into the CLI
  (`ng mcp`): always call `get_best_practices` before generating or
  modifying code, and `search_documentation` for specific APIs. Don't rely
  on patterns "remembered" from prior knowledge: the source of truth is the
  tool, not the model's memory.
- Backend: Spring Boot 4.1 + Java 26 (Spring Framework 7, Jakarta EE 11)
- DB: PostgreSQL
- Auth: custom JWT (no external provider for now)
- GitHub repo: chrisob194/marginalia — real issues and PRs via `gh` CLI
- Manual E2E testing: Chrome MCP against the local dev server
  (http://localhost:4200 / :8080)

## Domain
Personal bookmark/note manager: save a link with a title, a personal note,
and tags; search and filter. Designed to evolve without forcing things:
- Phase 2 (future): a content-extraction microservice (e.g. FastAPI) + Redis
  as cache/queue.
- Phase 3 (future): semantic search / auto-tagging via AI (embeddings).

**Do not plan beyond the current phase.** Each phase is only designed once
the previous one is closed.

## Current phase: 1 — Full-stack foundations
Minimum scope:
- registration/login (JWT)
- bookmark CRUD (url, title, note, tags)
- search/filter by tag

Learning objectives tied to this phase (used by Delivery to propose
sensible features, and by the PM to assign `learn:*` labels):
- Angular: Signal Forms, Resource API, routing with functional guards, HTTP
  interceptor for JWT, @Service decorator
- Backend: layered architecture (controller/service/repository) with DTOs,
  Spring Security + JWT, Spring Data JPA, Flyway migrations, Jakarta
  validation, null-safety with JSpecify, integration tests with
  Testcontainers

## Roles — no agent runs automatically
Each role is only invoked through its dedicated slash command (see
`.claude/commands/`). None of them proposes or acts on its own in the
background.

- **Delivery**: proposes ONLY features in functional/product terms (user
  story). Never technical, architectural, or implementation choices.
- **Project Manager**: translates the feature chosen by the user into a
  real GitHub issue, structured with labels and verifiable acceptance
  criteria.
- **UIX Designer**: starting from an issue, produces only semantic HTML +
  Tailwind CSS (zero JavaScript, zero Angular syntax). The user then turns
  it into components.
- **Tester**: verifies an implemented feature using Chrome MCP against the
  local dev server, checking the issue's acceptance criteria — does not
  generate automated Playwright tests.
- **Code Reviewer**: evaluates PRs (quality, security, adherence to best
  practices), blocks or approves with reservations by opening follow-up
  issues. ALWAYS answers in a Socratic way, both in review and when the
  user has doubts: never provides the direct solution.
- **Technical Writer**: owns the `.md` documentation (root `README.md`,
  per-stack READMEs, all of this file). Audits docs against what the code
  actually does and rewrites the ones that drifted. Never touches application
  code, never writes `docs/adr.md`.
- **Tutor**: crafts a self-contained HTML learning resource for a topic on
  request — may ask clarifying questions first, always grounds claims in
  real docs (Angular MCP or web search, never memory). Never touches
  application code.

## GitHub labels (create once in the repo)
- `phase:1` `phase:2` `phase:3`
- `type:feature` `type:bug` `type:architecture` `type:chore`
- `origin:delivery` `origin:pm` `origin:reviewer`
- `learn:<topic>` — e.g. `learn:signals`, `learn:security`,
  `learn:testcontainers`, `learn:routing` (grows organically, one per
  concept touched)

## Architectural decisions
Mini ADR log: `docs/adr.md` — append-only, newest last. Entries are written
from the main session via the `adr` skill (triggers, pollution guard and
format live there); read the log for the rationale behind past choices.
