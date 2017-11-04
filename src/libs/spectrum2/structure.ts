import { createElement } from './helpers';
import {
  createChoiceValueField,
  createElementField,
  createResourceField,
  createStreamField,
  createTextualContentField,
} from './fields';
import { ElementDefinition } from './interfaces';
import { TextTransformer } from './transformers';
import { LowdownImageResource, LowdownInteractiveResource } from './resources';

// TODO: resources

// blocks
export const sets: { [key: string]: Array<ElementDefinition> } = { blocks: [] };

export const HeadingBlock = createElement('heading', {
  level: createChoiceValueField({
    choices: [1, 2, 3, 4, 5, 6],
    defaultValue: 1,
  }),
  text: createTextualContentField(TextTransformer.INLINEDOWN),
});

export const TextBlock = createElement('text', {
  text: createTextualContentField(TextTransformer.MARKDOWN),
});

export const PullQuoteBlock = createElement('pullquote', {
  quote: createTextualContentField(TextTransformer.INLINEDOWN),
  attribution: createTextualContentField(TextTransformer.INLINEDOWN),
});

export const ImageBlock = createElement('image', {
  resource: createResourceField(LowdownImageResource),
  alt: createTextualContentField(TextTransformer.PLAIN_TEXT),
  title: createTextualContentField(TextTransformer.PLAIN_TEXT),
  caption: createTextualContentField(TextTransformer.INLINEDOWN),
  source: createTextualContentField(TextTransformer.INLINEDOWN),
  sourceURL: createTextualContentField(TextTransformer.PLAIN_TEXT),
});

export const CanvasBlock = createElement('canvas', {
  resource: createResourceField(LowdownInteractiveResource),
  container: createChoiceValueField({
    choices: ['CONTENT', 'CONTAINER', 'BLEED'],
    defaultValue: 'CONTAINER',
  }),
});

// TODO: image block
// TODO: canvas block

sets.blocks = [
  HeadingBlock,
  TextBlock,
  PullQuoteBlock,
  ImageBlock,
  CanvasBlock,
];

export const FreeformSection = createElement('freeform', {
  stream: createStreamField({
    fields: [createElementField(sets.blocks)],
  }),
});

export const ListSectionItem = createElement('listitem', {
  title: createElementField(HeadingBlock),
  stream: createStreamField({
    fields: [createElementField(sets.blocks)],
  }),
});

export const ListSection = createElement('list', {
  stream: createStreamField({
    fields: [createElementField(ListSectionItem)],
  }),
  points: createChoiceValueField({
    choices: ['alpha', 'numbers', 'roman', null],
    defaultValue: null,
  }),
  order: createChoiceValueField({
    choices: ['az', 'za'],
    defaultValue: 'az',
  }),
});

sets.sections = [FreeformSection, ListSection];
sets.sectionitems = [ListSectionItem];

export const ArticleSubtype = createElement('article', {
  stream: createStreamField({
    fields: [createElementField(sets.sections)],
  }),
});

export const CanvasSubtype = createElement('canvas_subtype', {
  resource: createResourceField(LowdownInteractiveResource),
  viewMode: createChoiceValueField({
    choices: ['CONTENT', 'CONTAINER', 'CANVAS'],
    defaultValue: 'CONTAINER',
  }),
});

// TODO: canvas subtype

sets.subtypes = [ArticleSubtype, CanvasSubtype];

const nameMap = new Map();

Object.values(sets).forEach(elements => {
  elements.forEach(element => nameMap.set(element.identifier, element));
});

export function getElementByName(name: string) {
  if (!nameMap.has(name)) {
    console.warn(`[spectrum] element "${name}" not in map.`);
  }
  return nameMap.get(name);
}
