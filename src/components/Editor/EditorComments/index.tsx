import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql } from 'react-apollo';

import { openCommentPanel, closeCommentPanel } from '../../../ducks/Editor';
import Comment from './Comment';
import PostComment from './PostComment';
import EditorCommentsQuery from './EditorComments.graphql';
import PostContentCommentMutation from './PostContentComment.graphql';

import styles from './EditorComments.css';
import Sidebar from '../../Sidebar';
import styled from 'react-emotion';

const NoNotes = styled.div`
  color: ${(props: any) => props.theme.colors.grey_worst_winter};
  text-align: center;
  font-size: 1rem;
  padding: 1rem;
  font-style: italic;
`;

interface User {
  username: string;
}

export interface IComment {
  id: number;
  created: string;
  user: User;
  comment: string;
}

interface IComments {
  content: {
    editorialMetadata: {
      comments: Array<IComment>;
    };
  };
}

interface PostCommentInput {
  revisionId: number;
  comment: string;
}

interface ComponentProps {
  revisionId: number;
  contentId: number; // we shouldn't ever have new, but ts
}

interface InternalProps {
  panelOpen: boolean;
  openCommentPanel: () => void;
  closeCommentPanel: () => void;
  postComment: (input: PostCommentInput | any) => Promise<null>;
  data: {
    loading: boolean;
    error: boolean;
    vertical: IComments;
    refetch(): void;
  };
  children: Element;
}

type IProps = ComponentProps & InternalProps;

class EditorComments extends React.Component<IProps, any> {
  private scrollElement: HTMLDivElement | null;

  componentDidMount() {
    setInterval(() => this.props.data.refetch(), 8000);
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps !== this.props) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.scrollElement
          ? (this.scrollElement.scrollTop = this.scrollElement.scrollHeight)
          : null;
      });
    }, 0);
  }

  render() {
    const props = this.props;
    if (props.data.loading) {
      return null;
    }
    if (props.data.error) {
      return null;
    }

    const { comments } = props.data.vertical.content.editorialMetadata;

    return (
      <Sidebar>
        <div className={cx(styles.root)}>
          <div
            ref={ref => {
              this.scrollElement = ref;
            }}
          >
            {comments.map((comment, index) => (
              <Comment
                user={comment.user}
                created={comment.created}
                comment={comment.comment}
                key={comment.id}
                previousComment={index > 0 ? comments[index - 1] : null}
                nextComment={
                  comments.length > index + 1 ? comments[index + 1] : null
                }
              />
            ))}

            {comments.length <= 0 && (
              <NoNotes>Use this space for ideas, notes and comments.</NoNotes>
            )}
          </div>
          <div className={styles.postComment}>
            <PostComment
              onPost={(comment: string) => {
                props.postComment({
                  variables: {
                    data: { revisionId: props.revisionId, comment },
                  },
                });
              }}
            />
          </div>
        </div>
      </Sidebar>
    );
  }
}

const getVertical = () =>
  connect((state: any) => ({
    vertical: state.verticals.selectedVertical,
  }));

export default compose(
  getVertical(),
  connect(
    (state: any) => ({
      panelOpen: state.editor.get('commentPanelOpen'),
    }),
    {
      openCommentPanel,
      closeCommentPanel,
    }
  ),
  graphql(EditorCommentsQuery, {
    options: (props: any) => ({
      variables: {
        vertical: props.vertical.identifier,
        contentId: props.contentId,
      },
    }),
  }),
  graphql(PostContentCommentMutation, {
    name: 'postComment',
    options: {
      refetchQueries: ['EditorComments'],
    },
  })
)(EditorComments) as React.SFC<ComponentProps>;
