---
title: "From natural language to structured intent"
description: "A flexible interface is useful. So is an explicit account of what an agent is allowed to do."
date: 2026-09-08
topics: ["LLM agents", "Software engineering"]
draft: true
---

*This is an AI-written outline for previewing the site, based on the initial project brief. It is not a finished essay.*

## A possible experiment

Take a request such as “draft a reply to this email.” Translate it into a small operation with explicit inputs and limits. Then ask what has become easier to inspect, and what ambiguity remains.

```json
{
  "operation": "draft_reply",
  "message_id": "example-message",
  "allowed_effects": ["create_draft"]
}
```

The representation above is an illustration, not a security mechanism. A separate system would have to validate the operation, bind it to the user’s authority, and enforce its limits.

## Where the interesting work is

An essay could examine the translation step itself. Who decides that the structured operation faithfully represents the request? How is that decision checked? What happens when the user’s intent is underspecified?

## Before publication

Build a small example with an actual enforcement point. Describe both what the representation makes explicit and what it cannot guarantee on its own.
