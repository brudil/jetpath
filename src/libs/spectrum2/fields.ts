import { createField } from "./helpers";
import {Errors} from "./errors";

export function createChoiceValueField({ choices, defaultValue }: { choices: Array<any>, defaultValue: any }) {
  return createField('CHOICE', {
    choices,
    defaultValue
  }, {
    *validate(value: any) {
      if (choices.indexOf(value) >= 0) {
        yield [Errors.VALUE_NOT_IN_CHOICES, value]
      }
    },
  })
}
