---
title: "Prompt injection is an authority problem"
description: "What changes when we treat prompt injection as a question of who gets to instruct an agent?"
date: 2026-09-10
topics: ["Agent security", "Systems"]
draft: true
---

*This is an AI-written outline for previewing the site, based on the initial project brief. It is not a finished essay.*

## A question to start with

An agent reads a document while carrying out a user’s request. Inside that document, it encounters a sentence telling it to do something else. What would entitle that sentence to change the task?

The proposed essay could begin here: with the difference between encountering an instruction and being authorized to follow it.

## An interface and a boundary

Natural language makes it convenient to express intent. Whether it can also serve as a reliable boundary between instructions and untrusted material is a separate question.

> Understanding what a sentence asks for is different from deciding whether its author has authority to ask.

A concrete example could track the same instruction through a user message, a retrieved webpage, and an email attachment. The words stay the same; their provenance changes.

## What to investigate

- Define the threat model and the authority an agent actually possesses.
- Read the CaMeL paper and trace the responsibilities of P-LLM and Q-LLM against the source.
- Compare natural-language delegation with structured, parameterized operations.
- Identify which guarantees come from system design and which still depend on model behavior.

## Before publication

Develop a worked example, link the primary sources actually used, and make clear where the argument goes beyond them. The title is a thesis to investigate, not a conclusion this outline establishes.
