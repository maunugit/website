---
title: "Prompt injections"
description: "What changes when we treat prompt injection as a question of who gets to instruct an agent?"
date: 2026-09-10
topics: ["Agent security", "Systems"]
draft: true
---

Agents encounter language from many sources, but language itself does not carry reliable proof of authority. What could that proof be?

A prompt injection happens when an AI system encounters instructions from some untrusted source, and starts treating them as if they were a part of the original task it was given. For example, an agent tasked with summarizing an email might find a hidden instruction inside that tells the agent to forward private user information somewhere else. The term "prompt injection" is similar to SQL injections. In both cases, the problem refers to a system interpreting something as a command rather than just another part of data. SQL injections can be prevented quite well simply by structurally separating data queries from their parameters. The difficulty with prompt injections is that the LLM receives both instructions and data as natural language, where there isn't a clear boundary between them.

It is also useful to separate indirect prompt injections from direct ones. A direct prompt injection comes from the user interacting with the model, essentially trying to "jailbreak" it, by tricking it to answer outside the models safeguards for example. An indirect prompt injection is instead planted in something the model eventually reads, like an email, webpage, document, tool call result, or even an image. This article will mostly revolve around indirect prompt injections, since I consider them more interesting and important than jailbreaking.

In 2023, Simon Willison wrote about prompt injections in his webblog, and proposed a mechanism for dealing with this. He wrote about [a dual LLM pattern](https://simonwillison.net/2023/Apr/25/dual-llm-pattern/) that consists of two models and a programmed controller component. The models are a Privileged LLM and a Quarantined LLM, or P-LLM and Q-LLM for short. The P-LLM has access to tools and can execute commands, while the Q-LLM is only used to extract data from sources, but has no ability to do anything with it except to pass the results forward to the controller and the P-LLM. The central idea is that all untrusted data is always given to the Q-LLM that cannot run any commands or perform any actions, no matter how well the data has been injected with malicious information. 


- summer intern also usually does a good job but sometimes also deletes the company's database
- couldnt you just use "inside" and "outside" data? But is that a written label or some actualy boundary enforced by software?
- what about a more sophisticated injection? like a plausible step inside a sequence? bob email example here.



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
