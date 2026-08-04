---
description: Asks the Tester to verify an implemented feature using Chrome MCP against the local dev server
argument-hint: <issue number> [extra context: routes, credentials]
---

Issue to verify (plus any extra context I gave — routes, credentials, test
data): $ARGUMENTS

Use the `tester` subagent. Pass along the whole of $ARGUMENTS: the first
token is the issue number, anything after it is context I'm handing over so
the Tester doesn't have to ask for it.

The Tester gets the acceptance criteria with
`gh issue view <number> --json number,title,body,labels,state` and verifies
them **only** by actually interacting with the app running at
http://localhost:4200 (frontend) and :8080 (backend) through the Chrome MCP
tools. It must never read project source, run builds, or infer behavior from
the codebase — a criterion that can't be observed in the browser comes back
as `[-] not verifiable`, not as a pass or a fail.

If the dev server doesn't respond, stop and flag it to me instead of
proceeding.

If the Tester ends with `## BLOCKED — need input`, do not answer its
questions yourself from the codebase: put them to me with
`AskUserQuestion`, then re-invoke the Tester with my answers.
