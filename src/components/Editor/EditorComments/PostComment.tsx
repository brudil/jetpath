import React from 'react';

import DebouncedAutosizeTextarea from '../../DebouncedAutosizeTextarea';
import Button from '../../Button';
import { withState } from 'recompose';
import {SidebarInput} from "../../Sidebar";
import styled from "react-emotion";

const SidebarDebouncedAutosizeTextarea: any = SidebarInput.withComponent(
  DebouncedAutosizeTextarea
);

const InputContainer = styled.div`
  margin-bottom: 0.4rem;
`;

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
      <InputContainer>
        <SidebarDebouncedAutosizeTextarea
          value={props.comment}
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
            props.updateComment(e.currentTarget.value)
          }

          rows={3}
        />
      </InputContainer>
      <Button
        text="Save"
        onClick={handlePost}
        disabled={props.comment === ''}
      />
    </div>
  );
}

export default withState('comment', 'updateComment', '')(
  PostComment as any
) as React.SFC<ComponentProps>;
