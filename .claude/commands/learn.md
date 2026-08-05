---
description: Asks the Tutor to craft a learning resource on a topic
argument-hint: <topic>
---

Topic: $ARGUMENTS

Use the `tutor` subagent, passing along the topic and today's date (you
already have it in context) so it doesn't need to look it up.

If the Tutor ends with `## BLOCKED — need input`, don't guess the scope
yourself: put its questions to me with `AskUserQuestion`, then re-invoke
the Tutor with my answers. Repeat until it produces the artifact.

Once it's done, just give me the artifact link and the one-line hook it
logged to `docs/learning-log.md` — no need to restate the resource's
content back to me.
