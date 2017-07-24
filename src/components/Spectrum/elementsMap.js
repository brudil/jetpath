import { subtypes, sections, blocks } from '@brudil/spectrum';
// subtypes
import ArticleSubtype from './subtypes/ArticleSubtype';
// TODO: VideoSubtype

// sections
import FreeformSection from './sections/FreeformSection';
import ListSection from './sections/ListSection';
import ListSectionItem from './sections/ListSectionItem';

// blocks
import HeadingBlock from './blocks/HeadingBlock';
import ImageBlock from './blocks/ImageBlock';
import TextBlock from './blocks/TextBlock';
import PullQuoteBlock from './blocks/PullQuoteBlock';
// TODO: VideoBlock

const elementMap = new Map();

// subtypes
elementMap.set(subtypes.ArticleSubtype, ArticleSubtype);

// sections
elementMap.set(sections.FreeformSection, FreeformSection);
elementMap.set(sections.ListSection, ListSection);
elementMap.set(sections.ListSectionItem, ListSectionItem);

// blocks
elementMap.set(blocks.HeadingBlock, HeadingBlock);
elementMap.set(blocks.ImageBlock, ImageBlock);
elementMap.set(blocks.TextBlock, TextBlock);
elementMap.set(blocks.PullQuoteBlock, PullQuoteBlock);

export default elementMap;

export const nameToElementMap = new Map();
for (const [key] of elementMap.entries()) {
  const name = key._name;
  nameToElementMap.set(name, key);
}

export const nameToComponentMap = new Map();
for (const [key, value] of elementMap.entries()) {
  const name = key._name;
  nameToComponentMap.set(name, value);
}
