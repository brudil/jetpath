import { createElement } from "./helpers";
import {
  createChoiceValueField, createElementField, createStreamField,
  createTextualContentField
} from "./fields";
import { ElementDefinition } from "./interfaces";

// TODO: resources


// blocks
export const sets: { [key: string]: Array<ElementDefinition> } = { blocks: [] };

export const HeadingBlock = createElement('heading', {
  level: createChoiceValueField({
    choices: [1, 2, 3, 4, 5, 6],
    defaultValue: 1,
  }),
  // text: createTextualContentField(transformer)
});

export const TextBlock = createElement('text', {
  text: createTextualContentField()
});

// TODO: pull quote block
// TODO: image block
// TODO: canvas block


sets.blocks = [HeadingBlock, TextBlock];


export const FreeformSection = createElement('freeform', {
  stream: createStreamField({
    fields: [createElementField(sets.blocks)]
  })
  // text: createTextualContentField(transformer)
});

export const ListSectionItem = createElement('listitem', {
  title: createElementField(HeadingBlock),
  stream: createStreamField({
    fields: [createElementField(sets.blocks)]
  }),
});

export const ListSection = createElement('list', {
  stream: createStreamField({
    fields: [createElementField(ListSectionItem)]
  })
  // text: createTextualContentField(transformer)
});

// TODO: list section
// TODO: list section item


sets.sections = [FreeformSection, ListSection];
sets.sectionitems = [ListSectionItem];

export const ArticleSubtype = createElement('article', {
  stream: createStreamField({
    fields: [createElementField(sets.sections)]
  })
  // text: createTextualContentField(transformer)
});

// TODO: canvas subtype

sets.subtypes = [ArticleSubtype, ];

const nameMap = new Map();

Object.values(sets).forEach(elements => {
  elements.forEach(element => nameMap.set(element.identifier, element));
});

export function getElementByName(name: string) {
  if (!nameMap.has(name)) {
    console.log(`[spectrum] element "${name}" not in map.`);
  }
  return nameMap.get(name);
}
