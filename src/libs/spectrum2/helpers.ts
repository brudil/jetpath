import { Map } from 'immutable';

import { v4 } from 'uuid';
import {
  ActionOverrides, ElementActions, ElementDefinition, FieldDefinition, FieldMap,
  OptionsMap, Document
} from "./interfaces";
import {isElementDefinition} from "./changes";
import {getElementByName} from "./structure";

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

  if (isElementDefinition(field.options.defaultValue)) {
    return produceImmutableNode(field.options.defaultValue);
  }

  return field.options.defaultValue;
}

export function serialiseDocument(document: Map<string, any>) {
  return document.toJS();
}

export function createDocument() {
  return Map({
    _id: v4(),
    version: 2,
    content: null,
  });
}

function produceImmutableFieldNodes(element: ElementDefinition): Map<string, any> {
  let output: Map<string, any> = Map();
  Object.entries(element.fields).forEach(([fieldKey, fieldDefinition]: [string, FieldDefinition]) => {
    output = output.set(fieldKey, produceFieldNode(fieldDefinition));
  });
  return output;
}

export function produceImmutableNode(element: ElementDefinition) {
  return Map({
    _name: element.identifier,
    _id: v4(),
  }).merge(produceImmutableFieldNodes(element));
}

export function filterNode(node: any, predicate: (element: ElementDefinition, node: any) => boolean) {
  const def = getElementByName(node.get('_name'));

  let found: Array<any> = [];

  if (predicate(def, node)) {
    found.push(node);
  }

  Object.entries(def.fields).forEach((entry) => {
    const [fieldName, fieldDefinition] = entry;

    if (fieldDefinition.identifier === 'STREAM') {
      node.get(fieldName).forEach((streamNode: any) => {
        const innerFound = filterNode(streamNode, predicate);
        if (innerFound.length > 0) {
          found = found.concat(innerFound);
        }
      })
    } else if (fieldDefinition.identifier === 'ELEMENT') {
      const innerFound = filterNode(node.get(fieldName), predicate);
      if (innerFound.length > 0) {
        found = found.concat(innerFound);
      }
    }
  });

  return found;
}

export function filterDocument(document: Document, predicate: (element: ElementDefinition) => boolean) {
  // todo: implement filtering
  console.log(document);
  return filterNode(document.get('content'), predicate);
}
