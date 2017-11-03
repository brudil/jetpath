import { Document } from './interfaces';
import { filterDocument } from './helpers';
import { TextBlock } from './structure';

export function getWordCount(document: Document) {
  return filterDocument(document, element => element === TextBlock).reduce(
    (total, textBlockNode) =>
      total +
      textBlockNode
        .getIn(['text', 'text'])
        .trim()
        .replace(/\s+/gi, ' ')
        .split(' ').length,
    0
  );
}
