import {Errors} from "./errors";

export interface ActionOverrides {
  validate?: (value: any) => IterableIterator<ValidationError> | void
}

export type ValidationError = [Errors, String];

export interface ElementActions {
  validate: (value: any) => IterableIterator<ValidationError> | void
}

export interface ElementDefinition {
  identifier: string,
  fields: FieldMap
}

export interface OptionsMap {
  defaultValue: any,
}

export interface FieldDefinition {
  identifier: string,
    options: OptionsMap & Object,
    actions: ElementActions,
}

export interface FieldMap {
  [fieldName: string]: FieldDefinition
}


export interface Element {
  fields: {
    [key: string]: Element
  }
}

export type Document = any; // todo

export type ElementIndex = string | number;
export type ElementPath = Array<ElementIndex>;

export enum ChangesetInstruction {
  UPDATE,
  INSERT,
  REMOVE,
  MOVE
}

// Changesets
export interface BaseChangeset {
  instruction: ChangesetInstruction,
  path: ElementPath
}

export interface UpdateChangeset extends BaseChangeset {
  value: any
}

export interface InsertChangeset extends BaseChangeset {
  element: ElementDefinition,
  position: number,
}

export interface MoveChangeset extends BaseChangeset {
  position: number,
}

export interface RemoveChangeset extends BaseChangeset {

}

export type Changeset = UpdateChangeset | InsertChangeset | MoveChangeset | RemoveChangeset;
