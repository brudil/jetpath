import React from 'react';
import ViewContainer from '../components/ViewContainer';
import DocumentTitle from '../components/DocumentTitle';
import MediaEditForm from '../components/MediaEditForm';
import MediaDisplay from '../components/MediaDisplay';
import LoadingContent from '../components/LoadingContent';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import MediaEditQuery from './MediaEditQuery.graphql';
import EditMediaMutation from './EditMedia.graphql';

function MediaEditPage(props) {
  if (props.data.loading) {
    return <LoadingContent />;
  }

  if (props.data.loading) {
    return <h1>Error</h1>;
  }

  const onSubmit = ({ creditTitle, creditUrl }) =>
    props.editMedia({
      variables: {
        mediaId: props.data.media.mediaId,
        creditTitle,
        creditUrl,
      },
    });

  return (
    <DocumentTitle title="Media">
      <ViewContainer>
        <h1>Edit media #{props.data.media.mediaId}</h1>
        <div style={{ maxWidth: '300px', with: '100%' }}>
          <MediaEditForm initialValues={props.data.media} onSubmit={onSubmit} />
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
  graphql(EditMediaMutation, { name: 'editMedia' })
)(MediaEditPage);
