import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import ViewContainer from '../../components/ViewContainer';
import DocumentTitle from '../../components/DocumentTitle';
import MediaEditForm from '../../components/MediaEditForm';
import MediaDisplay from '../../components/MediaDisplay';
import LoadingContent from '../../components/LoadingContent';
import Button from '../../components/Button';
import LowkeyDeleteButton from '../../components/LowkeyDeleteButton';

import MediaEditQuery from './MediaEditQuery.graphql';
import EditMediaMutation from './EditMedia.graphql';
import DeleteMediaMutation from './DeleteMedia.graphql';
import UndeleteMediaMutation from './UndeleteMedia.graphql';

function MediaEditPage(props) {
  if (props.data.loading) {
    return <LoadingContent />;
  }

  if (props.data.loading) {
    return <h1>Error</h1>;
  }

  const handleSubmit = ({ creditTitle, creditUrl }) =>
    props.editMedia({
      variables: {
        mediaId: props.data.media.mediaId,
        creditTitle,
        creditUrl,
      },
    });

  const handleDelete = () => {
    props.deleteMedia({
      variables: {
        mediaId: props.data.media.mediaId,
      },
    });
  };
  const handleUndelete = () => {
    props.undeleteMedia({
      variables: {
        mediaId: props.data.media.mediaId,
      },
    });
  };

  const isDeleted = props.data.media.deleted;

  return (
    <DocumentTitle title="Media">
      <ViewContainer>
        <h1>
          Edit media #{props.data.media.mediaId} {isDeleted ? '[deleted]' : ''}
        </h1>
        <div style={{ maxWidth: '300px', with: '100%' }}>
          <MediaEditForm
            initialValues={props.data.media}
            onSubmit={handleSubmit}
          />

          <div style={{ paddingTop: '2rem' }}>
            {!isDeleted ? (
              <LowkeyDeleteButton
                text="Delete media"
                confirmText="Are you sure you want to delete this media?"
                onDelete={handleDelete}
              />
            ) : (
              <Button text="Undelete" onClick={handleUndelete} />
            )}
          </div>
        </div>
        <MediaDisplay media={props.data.media} />
      </ViewContainer>
    </DocumentTitle>
  );
}

export default compose(
  graphql(MediaEditQuery, {
    options: props => ({
      variables: {
        mediaId: props.match.params.id,
      },
    }),
  }),
  graphql(EditMediaMutation, { name: 'editMedia' }),
  graphql(DeleteMediaMutation, { name: 'deleteMedia' }),
  graphql(UndeleteMediaMutation, { name: 'undeleteMedia' })
)(MediaEditPage);
