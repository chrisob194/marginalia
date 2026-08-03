---
description: Asks the Delivery agent to propose a feature for the current phase of the project
---

Use the `delivery` subagent to propose ONE functional/product feature,
consistent with the current phase described in `CLAUDE.md`. The subagent
must first read `CLAUDE.md` and existing issues (`gh issue list --state
all`) to avoid repeating itself, then return the proposal in the format
defined in its system prompt. Do not open any issue: this command only
produces the text proposal, to be shown to me for approval.
