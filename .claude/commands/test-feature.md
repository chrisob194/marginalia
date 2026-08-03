---
description: Asks the Tester to verify an implemented feature using Chrome MCP against the local dev server
argument-hint: <issue number>
---

Issue number to verify: $ARGUMENTS

Use the `tester` subagent to get the acceptance criteria with
`gh issue view $ARGUMENTS` and verify them one by one by actually
interacting with the app running at http://localhost:4200 (frontend) and
:8080 (backend) via the Chrome MCP tools. If the dev server doesn't
respond, stop and flag it to me instead of proceeding.
