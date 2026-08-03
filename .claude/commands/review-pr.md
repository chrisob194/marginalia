---
description: Asks the Code Reviewer to evaluate a Pull Request
argument-hint: <PR number>
---

PR number to review: $ARGUMENTS

Use the `code-reviewer` subagent in review mode: it should read the diff
with `gh pr diff $ARGUMENTS` and the linked issue, then return the outcome
(approved / approved with reservations / changes requested, blocking)
according to the rules in its system prompt — no direct code solutions in
case of requested changes, only guiding questions.
