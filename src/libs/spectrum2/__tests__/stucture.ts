
import { produceImmutableNode, serialiseDocument } from '../helpers';
import { HeadingBlock } from "../structure";

it('creates HeadingBlock', () => {
  const headingBlockNode = produceImmutableNode(HeadingBlock);
  console.log(headingBlockNode);
  const asJS = headingBlockNode.toJS();
  expect(asJS).toEqual({
    identifier: 'heading',
  });
});
