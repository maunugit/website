import { getCollection } from 'astro:content';

export async function getWriting() {
  return (await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function url(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}

export function readingTime(body: string = '') {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 220));
}
