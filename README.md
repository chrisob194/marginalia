# Marginalia

A personal bookmark & note manager (save a link + title + note + tags, search/filter).

This is a **learning project**, not a production build. Stack, current phase, and learning objectives live in [`CLAUDE.md`](./CLAUDE.md) — this document doesn't repeat those, it explains **how the project actually gets built**: the workflow.

## Why a workflow, not just "ask AI to build it"

The point of this project is to learn Angular and Spring Boot by writing the code myself. If an AI agent wrote the implementation, there'd be nothing to learn. So AI is used only for the parts *around* the code — proposing what to build next, turning it into a well-defined issue, reviewing what I wrote, testing it — never for writing the application code itself.

To make that boundary hold, the AI isn't one general-purpose assistant. It's split into narrow roles, each with exactly one job and no permission to step into the others'. None of them run on their own — every one is triggered explicitly by a slash command, on my terms, one step at a time (see `CLAUDE.md` → *Roles*).

## The development loop

One feature moves through these steps, in order:

1. **`/propose-feature`** → *Delivery* agent
   Proposes exactly one feature, as a user story, tied to a learning objective of the current phase. Purely functional — it cannot mention a table, an endpoint, a component, or a library. This keeps "what to build" decoupled from "how to build it."

2. **I pick a feature.** Human checkpoint — nothing proceeds automatically.

3. **`/open-issue <feature>`** → *Project Manager* agent
   Turns the chosen feature into a real GitHub issue: labels, acceptance criteria, technical notes. Shows me the full draft and waits for my confirmation before actually running `gh issue create`. Still no architecture decisions — it structures, it doesn't design.

4. **`/design-ui <issue>`** → *UIX Designer* agent (optional, UI-heavy issues only)
   Produces semantic HTML + Tailwind for the issue — zero JavaScript, zero Angular syntax. I turn that markup into actual Angular components by hand; the agent stops at static structure on purpose, so the component logic is still mine to write.

5. **Implementation.** Done entirely by me, no agent involved. This is the actual learning step — everything before it exists to arrive here with a clear, well-scoped task; everything after it exists to check the result.

6. **`/review-pr <pr>`** → *Code Reviewer* agent
   Reviews the PR for correctness, architecture, security, and current best practices. Responds Approved / Approved with reservations (opens follow-up issues) / Changes requested — and for anything requested, asks Socratic questions instead of handing me a fix. If I'm stuck mid-implementation, `/ask-reviewer <question>` gives me the same Socratic back-and-forth on demand, without waiting for a PR.

7. **`/test-feature <issue>`** → *Tester* agent
   Manually drives the running app through Chrome MCP against the issue's acceptance criteria and reports pass/fail per criterion. No Playwright, no automated test suite standing in for actually using the feature.

## Why the roles are this strict

Every role is missing something on purpose:

- Delivery can't touch anything technical.
- The Project Manager can't decide architecture.
- The Designer can't write a line of JavaScript.
- The Reviewer can never hand over a fix, only a question.

The common thread: every technical decision stays mine. The agents can shape the problem, check the result, and push back — they can't make the call. That's the difference between using AI as a tool for this project and letting it build the project for me.

## Architecture

Nothing is implemented yet — no frontend, no backend, no database. This section stays a placeholder until Phase 1 work actually starts landing.

Architectural decisions are logged in [`docs/adr.md`](./docs/adr.md) as each one is made — one dated entry per decision, with the alternative that lost and why. Once there's enough real code and enough of those entries, this section will summarize the resulting architecture instead of just pointing at the log.

## Repo layout, today

What exists right now:

```
CLAUDE.md              project brief: stack, phase, roles, labels
.claude/agents/        the 5 role definitions (Delivery, PM, UIX Designer, Tester, Code Reviewer)
.claude/commands/      the slash commands that invoke each role
.claude/skills/adr/    when and how to append to the decision log
docs/adr.md            the architectural decision log
README.md              this file
```

What doesn't exist yet: `frontend/` (Angular) and `backend/` (Spring Boot) haven't been scaffolded. That's the first real work.
