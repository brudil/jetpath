import { createElement } from "./helpers";
import {createChoiceValueField} from "./fields";

// blocks

export const HeadingBlock = createElement('heading', {
  level: createChoiceValueField({
    choices: [1, 2, 3, 4, 5, 6],
    defaultValue: 1,
  }),
  // text: createTextualContentField(transformer)
})
