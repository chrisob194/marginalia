---
description: Asks the UIX Designer to produce HTML + Tailwind for an issue
argument-hint: <issue number>
---

Issue number: $ARGUMENTS

Use the `uiux-designer` subagent to read this issue with
`gh issue view $ARGUMENTS` and produce the corresponding HTML + Tailwind
CSS markup, following the conventions defined in its system prompt (zero
JavaScript, zero Angular syntax, comments for dynamic points).
