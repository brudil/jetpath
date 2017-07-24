import Immutable from 'immutable';

export function event(input) {
  return input.target.value;
}

export function int(input) {
  return parseInt(input, 10);
}

export function select(input) {
  return input.value;
}

export function selectMulti(inputList) {
  return inputList.map(input => input.value);
}

export function toImmutable(jsStructure) {
  return Immutable.fromJS(jsStructure);
}
