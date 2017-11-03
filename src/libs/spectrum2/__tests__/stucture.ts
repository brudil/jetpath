import { serialiseDocument, createDocument } from '../helpers';
import { applyChangeset, changeSubtype } from '../changes';
import { ArticleSubtype } from '../structure';

const mock_UUID_VALUE = 'b58e5f6f-8502-4963-8200-a50e93d2e61f';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => mock_UUID_VALUE),
  };
});

it('creates empty document', () => {
  const document = createDocument();

  expect(serialiseDocument(document)).toEqual({
    _id: mock_UUID_VALUE,
    version: 1,
    content: null,
  });
});

it('set subtype to document', () => {
  const document = createDocument();

  applyChangeset(document, changeSubtype(ArticleSubtype));
});
