---
description: Asks the Project Manager to turn an approved feature into a real GitHub issue
argument-hint: <description or reference of the approved feature>
---

Approved feature to turn into an issue: $ARGUMENTS

Use the `project-manager` subagent to turn it into a structured GitHub
issue following the format and labels defined in its system prompt and in
`CLAUDE.md`. The subagent must show me the draft (title, body, labels) and
wait for my explicit confirmation before running `gh issue create`.
