import { createField } from '../helpers';

it('creates field', () => {
  const field = createField('text', {}, {});
  expect(field).toEqual({
    identifier: 'text',
    options:
  });
});
