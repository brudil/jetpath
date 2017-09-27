export type ElementIndex = string | number;
export type ElementPath = Array<ElementIndex>;
export type SingleElementData = {
  setupStructure: any,
  get: (getKey: ElementIndex) => any,
}

export type ElementData = SingleElementData | Array<SingleElementData>;

export type UpdateChange = {
  command: string,
  key: string,
  value: any,
}

export type UpdateChangeset = UpdateChange;
