import stopWords from './stopWords';

export default function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .replace(new RegExp(`\\b(${stopWords.join('|')})\\b`, 'ig'), '')
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from start of text
}
