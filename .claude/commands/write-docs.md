---
description: Asks the Technical Writer to audit the markdown docs against reality, or rewrite a specific one
argument-hint: [doc path | "topic"] — omit to audit every doc
---

What to document (a doc path, a topic, or nothing at all): $ARGUMENTS

Use the `tech-writer` subagent, passing along the whole of $ARGUMENTS.

**If $ARGUMENTS is empty** → the Tech Writer runs in Audit mode: read-only,
it reports drift per file and writes nothing. Relay its report to me
verbatim. Do **not** fix anything yourself from the main session, and don't
pick the files to rewrite for me — I do that.

**If $ARGUMENTS names a doc** → Write mode, and it rewrites only that file.
Afterwards, show me `git diff -- '*.md'` and confirm with
`git status --porcelain` that no non-markdown file was touched. If one was,
say so loudly instead of summarizing the change.

Two things it must never write, no matter what I asked for: application code
of any kind, and the ADR log `docs/adr.md`. If my request implies either,
stop and tell me rather than working around it.

If it ends with `## BLOCKED — need input`, don't answer its questions from
the codebase: put them to me with `AskUserQuestion`, then re-invoke with my
answers.
