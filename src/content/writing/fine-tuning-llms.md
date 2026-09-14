---
title: "Fine-tuning LLMs"
date: 2026-09-14
# topics: ["AI-assisted work", "Cognition"]
draft: true
---
## How do you give an LLM company knowledge?

Let's imagine a company that wants to know how to get an LLM that would be useful with the company's data. Perhaps they're an equipment manufacturer and something like this could help their support technicians. This company could have a relatively substantial amount of data distributed across systems and databases that the LLM could use and then help out with. I will now narrow down the initial use case to support technicians. 

I personally worked as a technical support assistant at Verisure for a summer-job. Verisure is a security company, manufacturing and selling various kinds of cameras and sensors to customers, and having installers come and set everything up. In tech support, we answered calls from both customers and installers when there was a problem normal customer support could not quickly solve. We did remote maintenance (restarting cameras, installing updates that could be missing, switching connections or changing settings) and solved tickets that popped-up in our tech-support list. When I started, if I recall correctly, I spent a week or two just watching my competent colleagues working, tried to understand how they tackled specific issues and learned their workflows. Then, I started to tackle things on my own, which unfortunately still required me to ask for help constantly, to the slight annoyance of my colleagues who already had their own work to handle as well. But it was a part of the job and how the training was to be handled. By the end of week four I would say I was already working quite independently. Still, due to how many possible problems and combinations of problems there were in this job, nearly everyone in our team asked others questions and had others take a look at a specific thing they were wondering. 

Many times, especially during the first month or so, I wondered if an LLM assistant could be of use. We did have a co-pilot assistant, but I rarely saw it used. We occasionally translated emails with it, especially Italian, due to us receiving emails from them almost every week. Maybe they couldn't distinguish techsupport@verisure.it from techsupport@verisure.fi, or something like that. We never figured it out. But as for the technical questions, it wasn't of much help. I never found out how that assistant was put together or what information it could actually access. I only knew that when I tried it for some technical support questions, the answeres weren't useful enough to rely on. That left me wondering what it would have needed to be a good assistant? 

That is not to say that the following is going to be a guide on how to design a complete support system. But I'll use my past experience as useful examples for understanding how fine-tuning an LLM or RAG-techniques could contribute, and which problems each might address.

# technicalities
Let's move on to the technical side. First, you have the context of the model, which you could supply with some relevant information. But still, you're mostly working with the models trained data that might include similarities to the specific thing you're working on, but not necessarily the specifics. If you manually paste a troubleshooting procedure alongside your question, the model could complete the task, provided it's not too specifically complicated. But from this process, the model's weights haven't changed. If you make another request later, the model needs the same material supplied again, whether directly from the user or some history management.

Retrieval Augmented Generation [(RAG)](https://arxiv.org/pdf/2005.11401) automates finding and supplying this kind of reference material. Let's take a typical document-based setup. The manual-docs are processed into searchable passages for the model to look through. When you ask a question, a retrieval system searches for the relevant passages. The application then includes the selected passages in the model's context, and the model generates an answer from that. The actual retrival method in the system can be keyword searches, embedding systems that support similarity or semantics, or some combination of these. Inherently, RAG does not require a vector database, though those are quite commonly heard about. The central idea is just combining generation with retrieved external information. 

Re-training or fine-tuning the model specifically changes the model's weights/parameters. This is done to modify the inherent behaviour of the model itself, and to change it's outputs into something else than before. Full fine-tuning in itself makes all of the weights inside the neural network trainable. Depending upon how large the language model is, this can be extremely computationally expensive. For a truly large model that has for example over a hundred billion parameters, the fine-tuning process can be quite challenging. This is because training itself is quite slow and requires considerably more memory than just storing the parameters. Without going too deeply into how neural networks are trained, supervised fine-tuning runs examples through the model and measures how its predictions differ from the desired results. Backpropagation then works backwards through the network to calculate gradients, which basically describe how much a specific weight should be changed to correct the model into producing better outputs. An optimizer uses those gradient values to then update the trainable weights, and the whole process is then repeated until the model starts producing desired results.

For scale, only an 8B model stored at two bytes per parameter takes about 16 gigabytes just for its weights. This excludes all kinds of other training memory. The full amount of memory required depends on the optimizer, sequence lengths, batch size, and techniques for saving memory. When talking about truly large models, training usually requires such substantial computation that it must be divided across multiple GPUs, which then adds more abstraction due to communication and engineering overhead. Though, full-fine tuning still starts from an already trained model, so it is less work than pretraining it from scratch. But making billions of weights trainable is still demanding.

Because of this, there are techniques that try to make this more efficient. In this article I will discuss two of them, LoRA and QLoRA. 

## LoRA
LoRA is a fine-tuning technique where the central idea is that instead of updating each parameter, it only makes a small amount of specifically coordinated changes in the model's computation. It freezes the original weights, and trains new small matrices that are used to update larger portions of the models weights, so essentially bigger weight matrices. The [LoRA paper](https://arxiv.org/pdf/2106.09685) calls this a "low-rank" restriction, where two small matrices ($A$ and $B$) represent an update to a much larger weight matrics. Hence the name **Lo**w-**R**ank-**A**daptation. It does not mean that it just selects a handful of original weights that then change. This kind of compact update can affect many entries in the larger matrix.

A comparison example of a full update and a LoRA update:
| Method | Trainable matrix dimensions | Trainable parameters |
| --- | --- | ---: |
| Full fine-tuning | $4{,}096 \times 4{,}096$ | **16,777,216** |
| LoRA (rank 8) | $4{,}096 \times 8$ and $8 \times 4{,}096$ | **65,536** |


This example above illustrates how LoRa manages to achieve 256 times fewer trainable parameters. The rank 8 in the example is something that can be configured precisely in an actual implementation. Due to the efficiency gains, LoRA can for example greatly save gradient and optimizer memory. It's also possible to store one shared base model and a small adapter for each specialization, instead of storing separate full models. This way, you still use the base model as is, but only utilize the small adapter components when needed for their specialized tasks.

You might wonder why such a "small" update would then work compared to a comperehensive retraining of every single weight. But the LoRA paper gives an empirical finding for this: the base LLM already has extensive language capabilities it has been taught, and a specialized task may need to just redirect those capabilities rather than completely rebuild them. But this is not a guarantee for every single task. The paper reports results that suggest that LoRA is better than full fine-tuning, but it's safer to state that it's simply *more efficient* than *purely better*. 

It must be reminded that reducing the amount of trainable parameters does not mean an equally reduced amount of computation in total training. The full base model still participates in computation, and training still needs intermediate results to learn the new adapters. The biggest advantage of LoRA is that it often makes training fit better with the available memory, but it doesn't turn a larger model into a smaller one.

## QLoRA
While LoRA reduces the amount of parameters you have to train to still fine-tune a model, QLoRA also reduces the memory required for the frozen base model. The "Q" stands for *quantized*. As I mentioned in the last paragraph of the LoRA description, even when training only small adapters, the original base model still needs to fit in memory. QLoRA stores much of that base model using fewer bits, while keeping the adapters trainable in higher precision.

Quantization represents weights using fewer bits, at the cost of precision. For example, four bits allow $2^4 = 16$ distinct patterns, from `0000` to `1111`. In QLoRA's 4-bit representation, each pattern acts as a code for some numerical value. Blocks of weights also have their own scaling information. The same code can therefore represent different actual values in different blocks, rather than limiting the entire model to just 16 values. Let's suppose a weight is `0.0213`, but the closest value its block can represent is `0.0200`. We store the corresponding code and reconstruct `0.0200` when needed. Though, we cannot get back the full precision of having the original value, that has been lost from this quantization process.


An example for theoretical storage differences for eight billion parameters could be:

| Storage per weight | Raw weight storage |
| --- | --- |
| 16 bits | 16 GB |
| 4 bits | 4 GB |

QLoRA stores base weights in 4-bit form, but reconstructs some approzimate higher-precision values if needed for computation, and trains higher-precision LoRA adapters. Though, reconstructing a value does not recover the information lost during quantization. The quantized base remains frozen, and gradients propagate through its computations to update the adapters.

For one adapted layer, we can express the idea as:

$$
y=\widehat{W}x+\frac{\alpha}{r}BAx
$$

Where,
* $x$ is the layer's input.
* $\widehat{W}$ is the approx. base weight matrix reconstructed from its quantized representation.
* $A$ and $B$ are the small, trainable LoRA matrices.
* $r$ is the adapter rank, and $\frac{\alpha}{r}$ scales its contribution.
* $y$ is the layer's final output.
<br>
Put simply, it adds: **output from the frozen quanitzed base** + **contribution from the learned adapter** 

In terms of ordinary LoRA, the expression is essentially the same, but the base matrix hasn't been 4-bit quantized. Now, what is the tradeoff? As we have now rigorously went through, quantization can introduce some approximation error. The [QLoRA-paper](https://arxiv.org/pdf/2305.14314) found that its approach could match higher-precision fine-tuning performance in the evaluations that were studied, but it doesn't guarantee similar quality for every task. When the memory is reduced, that also does not automatically mean that training can be done faster, since handling quantization and transfering memory an also introduce some overhead.

Overall, 
* Full-fine tuning makes all weights trainable,
* LoRA learns a compact update,
* QLoRA also compresses the frozen weights.

All three still need good training examples. QLoRA changes the required resources needed to learn from them, rather than supplying some company knowledge by itself.

## A hypothetical technical support case
