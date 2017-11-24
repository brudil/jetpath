import Immutable from 'immutable';

export interface Middleware {
  (input: any): any;
}

export function event(input: React.ChangeEvent<HTMLInputElement>) {
  return input.currentTarget.value;
}

export function int(input: string) {
  return parseInt(input, 10);
}

export function select(input: { value: any }) {
  return input.value;
}

export function selectMulti(inputList: Array<{ value: any }>) {
  return inputList.map(input => input.value);
}

export function toImmutable(jsStructure: Object) {
  return Immutable.fromJS(jsStructure);
}
