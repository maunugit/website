---
layout: ../../layouts/Project.astro
project: llm-lab
---

## What this is

A personal experiment in building a harness around small, locally running language models. The starting point is deliberately modest: can a small model carry out a specific edit to a Markdown file?

Even a task that looks simple can be difficult for a small model. The question is where it goes wrong, and whether changing the tools, instructions, or surrounding harness can make the task easier.

## A small task to start with

The repository includes a Markdown replacement task with an initial file and an expected result. That gives the experiment a concrete target to compare against, rather than judging the model’s answer only by how convincing it sounds.

The code separates the agent, task handling, model client, and metrics into individual modules. Prompts and run settings live in configuration files, so they can be explored alongside the model itself.

## Where to look

- [The agent loop](https://github.com/maunugit/llm-lab/blob/main/src/markdown_agent.py) — the Markdown editing agent.
- [The task files](https://github.com/maunugit/llm-lab/tree/main/tasks/markdown_replace_v1) — the initial Markdown document and expected result.
- [Run configuration](https://github.com/maunugit/llm-lab/blob/main/configs/markdown_agent.toml) — settings for the agent experiment.
- [README](https://github.com/maunugit/llm-lab#readme) — project motivation and local model setup notes.

## The question behind it

How much of a small model’s usefulness depends on the system around it? The aim is to understand failures well enough to build more useful local agents. This is an experiment in that direction, rather than a claim that the problem is solved.
