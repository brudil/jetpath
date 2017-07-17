// eslint-disable-next-line import/prefer-default-export
export function sequence(state, action, methods) {
  if (action.error && {}.hasOwnProperty.call(methods, 'error')) {
    return methods.error();
  }

  if (!{}.hasOwnProperty.call(action, 'sequence')) {
    throw new Error('Sequence action has no sequence data!');
  }

  if ({}.hasOwnProperty.call(methods, action.sequence.type)) {
    return methods[action.sequence.type]();
  }

  return state;
}
