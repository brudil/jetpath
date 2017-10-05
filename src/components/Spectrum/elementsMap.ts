import * as Elements from '../../libs/spectrum2/structure';
// subtypes
import ArticleSubtype from './subtypes/ArticleSubtype';
import CanvasSubtype from './subtypes/CanvasSubtype';
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
import CanvasBlock from './blocks/CanvasBlock';

// TODO: VideoBlock

const elementMap = new Map();

// subtypes
elementMap.set(Elements.ArticleSubtype, ArticleSubtype);
elementMap.set(Elements.CanvasSubtype, CanvasSubtype);

// sections
elementMap.set(Elements.FreeformSection, FreeformSection);
elementMap.set(Elements.ListSection, ListSection);
elementMap.set(Elements.ListSectionItem, ListSectionItem);

// blocks
elementMap.set(Elements.HeadingBlock, HeadingBlock);
elementMap.set(Elements.ImageBlock, ImageBlock);
elementMap.set(Elements.TextBlock, TextBlock);
elementMap.set(Elements.PullQuoteBlock, PullQuoteBlock);
elementMap.set(Elements.CanvasBlock, CanvasBlock);

export default elementMap;

export const nameToComponentMap = new Map();
for (const [key, value] of elementMap.entries()) {
  const name = key.identifier;
  nameToComponentMap.set(name, value);
}
