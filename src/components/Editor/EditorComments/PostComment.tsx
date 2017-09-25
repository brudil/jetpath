import React from 'react';

import DebouncedAutosizeTextarea from '../../DebouncedAutosizeTextarea';
import Button from '../../Button';
import { compose, withState } from 'recompose';

function PostComment(props: { comment: string, updateComment: (value: any) => void, onPost: (comment: string) => void, children: Element }) {

  const handlePost = () => {
    props.onPost(props.comment);
    props.updateComment('');
  };

  return (
    <div>
      <DebouncedAutosizeTextarea value={props.comment} onChange={(e: React.FormEvent<HTMLTextAreaElement>) => props.updateComment(e.currentTarget.value)} />
      <Button text="Post comment" onClick={handlePost} disabled={props.comment === ''}/>
    </div>
  )
}


export default compose(
  withState('comment', 'updateComment', ''),
)(PostComment) as any; // todo: pretty sure it is this TypeScript#13288
