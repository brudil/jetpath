import React from 'react';

import DebouncedAutosizeTextarea from '../../DebouncedAutosizeTextarea';
import Button from '../../Button';
import { withState } from 'recompose';

interface ComponentProps {
  onPost: (comment: string) => void;
}

interface HOCProps {
  comment: string;
  updateComment: (value: any) => void;
}

type IProps = ComponentProps & HOCProps;

function PostComment(props: IProps) {
  const handlePost = () => {
    props.onPost(props.comment);
    props.updateComment('');
  };

  return (
    <div>
      <DebouncedAutosizeTextarea
        value={props.comment}
        onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
          props.updateComment(e.currentTarget.value)
        }
      />
      <Button
        text="Post comment"
        onClick={handlePost}
        disabled={props.comment === ''}
      />
    </div>
  );
}

export default withState('comment', 'updateComment', '')(
  PostComment as any
) as React.SFC<ComponentProps>;
