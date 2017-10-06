import {createElement } from "./helpers";
import {createTextualContentField} from "./fields";
import {TextTransformer} from "./transformers";

export const LowdownImageResource = createElement('lowdownimage', {
  id: createTextualContentField(TextTransformer.PLAIN_TEXT),
});

export const LowdownInteractiveResource = createElement('lowdowninteractive', {
  slug: createTextualContentField(TextTransformer.PLAIN_TEXT),
});
