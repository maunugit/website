export const site = {
  name: 'Maunu Aunesluoma',
  description: 'Software · AI agents · LLMs · systems',
  introduction: "",
  links: [{ label: 'GitHub', href: 'https://github.com/maunugit' }],
};

export interface Project {
  name: string;
  description: string;
  href?: string;
  demo?: string;
  preview?: string;
  page?: string;
  kind: string;
}

export const projects: Project[] = [
  {
    name: 'MaunuType',
    description: 'A minimal typing test with timed words, literary quotes, and speed and accuracy results.',
    href: 'https://github.com/maunugit/maunutype',
    demo: 'https://maunugit.github.io/maunutype/',
    preview: 'images/maunutype.png',
    kind: 'Personal · React · TypeScript',
  },
  {
    name: 'constrained_decoding',
    description: 'Master’s thesis experiments on constrained decoding: separating valid model output from good decisions in deterministic text environments.',
    href: 'https://github.com/maunugit/constrained_decoding',
    kind: 'Master’s thesis · Python',
  },
  {
    name: 'llm-lab',
    description: 'A local playground for small language models. Exploring where simple agent tasks break down, and whether a better harness can help.',
    href: 'https://github.com/maunugit/llm-lab',
    page: 'coding/llm-lab/',
    kind: 'Personal · Python · Local LLMs',
  },
  {
    name: 'agentic_editor',
    description: 'An LLM-driven text editor with bounded editing tools and structured change reports, built by UEF for ThingLink’s Scenario Builder pipeline.',
    href: 'https://github.com/maunugit/agentic_editor',
    kind: 'UEF / ThingLink · Python',
  },
  {
    name: 'video_segmentator',
    description: 'A video chaptering prototype that detects segment boundaries, captions sampled frames, and merges similar segments into chapters.',
    href: 'https://github.com/maunugit/video_segmentator',
    kind: 'Python · Vision models',
  },
  {
    name: 'pso_simulation',
    description: 'Particle swarm optimization for a UEF AI course, with animated visualizations of the search process.',
    href: 'https://github.com/maunugit/pso_simulation',
    kind: 'Course project · Python · Matplotlib',
  },
  {
    name: 'This website',
    description: 'A small, static home for writing and things I build.',
    kind: 'Personal · Astro',
    href: 'https://github.com/maunugit/website',
  },
];
