---
name: adr
description: Use when a decision has just been taken that picks an option over a named alternative, sets a convention later code must follow, has a security or data-integrity rationale, resolves Code Reviewer pushback (or accepts a reservation as-is), or rejects/reverses an earlier approach — append an entry to docs/adr.md. Also use when you need the recorded rationale behind an existing decision.
---

# ADR log — append an entry

The log is `docs/adr.md`. It also holds the pollution guard and the entry
format; this skill does not restate them, it points at them.

## The reflex
Append **without being asked**, in the *same turn* the decision is taken —
not at issue close, not at PR merge: by then the rationale is already gone.
Announce the entry in one line and move on. Don't ask permission to write it.

## Triggers
- an option was **chosen over a named alternative** — e.g. tags as entity vs
  `text[]`, MapStruct vs manual mapping, ProblemDetail vs custom error body
- a **convention** is set that later code must follow — migration naming,
  package layout, DTO/validation placement, test container lifecycle
- a decision has a **security or data-integrity** rationale — token storage,
  password hashing, CORS, ownership checks
- the Code Reviewer pushes back and a side is picked, or a reservation is
  accepted **as-is** — record the accepted trade-off
- an approach is **rejected**, or a previous decision is reversed
  (→ supersede, never edit the old entry)

## Procedure
1. `date +%F` — the real date. Never guess it, never infer it from context.
2. **Read `docs/adr.md`.** Two reasons: an existing entry may need
   superseding instead of a new one, and the guard + format live there.
3. Apply the pollution guard in that file: *is the reason readable from the
   diff by someone who knows the stack?* If yes → **no entry**. Most changes
   don't earn one.
4. Append at the end of `## Log`, in the file's format, max ~5 lines.

## Never
- Never write an ADR entry into `CLAUDE.md` — it holds only the pointer.
- Never edit or delete a past entry. Contradict it with a dated supersede.
- The `tech-writer` agent must not touch `docs/adr.md`; two writers on an
  append-only log collide and lose entries. This skill is the only writer.
