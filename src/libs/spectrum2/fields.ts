import { List, Map } from 'immutable';
import { createField } from './helpers';
import { Errors } from './errors';
import {
  ElementDefinition,
  FieldDefinition,
  ResourceDefinition,
} from './interfaces';
import { TextTransformer } from './transformers';

export function createChoiceValueField({
  choices,
  defaultValue,
}: {
  choices: Array<any>;
  defaultValue: any;
}) {
  return createField(
    'CHOICE',
    {
      choices,
      defaultValue,
    },
    {
      *validate(value: any) {
        if (choices.indexOf(value) >= 0) {
          yield [Errors.VALUE_NOT_IN_CHOICES, value];
        }
      },
    }
  );
}

export function createTextualContentField(transformer: TextTransformer) {
  return createField(
    'TEXT',
    {
      defaultValue: Map({ text: '', transformer }),
    },
    {}
  );
}

export function createElementField(
  elements: Array<ElementDefinition> | ElementDefinition
) {
  return createField(
    'ELEMENT',
    {
      elements,
      defaultValue: Array.isArray(elements) ? null : elements,
    },
    {}
  );
}
export function createResourceField(
  resources: Array<ResourceDefinition> | ResourceDefinition
) {
  return createField(
    'RESOURCE',
    {
      resources,
      defaultValue: Array.isArray(resources) ? null : resources,
    },
    {}
  );
}

export function createStreamField({
  fields,
}: {
  fields: Array<FieldDefinition>;
}) {
  return createField(
    'STREAM',
    {
      fields,
      defaultValue: List(),
    },
    {
      *validate(): IterableIterator<any> {},
    }
  );
}
