import { Map, to } from 'immutable';
import {Errors} from "./errors";

import { v4 } from 'uuid';

interface ActionOverrides {
  validate?: (value: any) => IterableIterator<ValidationError> | void
}

type ValidationError = [Errors, String];

interface ElementActions {
  validate: (value: any) => IterableIterator<ValidationError> | void
}

interface ElementDefinition {
  identifier: string,
  fields: FieldMap
}

interface OptionsMap {
  defaultValue: any,
}

interface FieldDefinition {
  identifier: string,
  options: OptionsMap & Object,
  actions: ElementActions,
}

interface FieldMap {
  [fieldName: string]: FieldDefinition
}

export function createElement(identifier: string, fields: FieldMap): ElementDefinition {
  return {
    identifier,
    fields,
  }
}

const defaultActions: ElementActions = {
  validate() {
    return;
  }
};

const defaultOptions: OptionsMap = {
  defaultValue: null,
};


export function createField(identifier: string, options: Object, actions: ActionOverrides): FieldDefinition {

  return {
    identifier,
    options: { ...defaultOptions, ...options },
    actions: { ...defaultActions, ...actions }
  }
}

function produceFieldNode(field: FieldDefinition) {
  return field.options.defaultValue;
}

function serialiseDocument(document: Map<string, any>) {
  return toJS(document);
}

function produceImmutableFieldNodes(element: ElementDefinition): Map<string, any> {
  const output: Map<string, any> = Map();

  Object.entries(element.fields).forEach(([fieldKey, fieldDefinition]: [string, FieldDefinition]) => {
    output.set(fieldKey, produceFieldNode(fieldDefinition));
  });

  return output;
}

export function produceImmutableNode(element: ElementDefinition) {
  return Map({
    _name: element.identifier,
    _id: v4(),
  }).merge(produceImmutableFieldNodes(element));
}
