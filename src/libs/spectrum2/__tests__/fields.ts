import { createChoiceValueField } from '../fields';

it('creates field', () => {
  const field = createChoiceValueField({
    choices: [1, 2, 3],
    defaultValue: 2
  });
  expect(field).toEqual({
    identifier: 'text',
  });
});
