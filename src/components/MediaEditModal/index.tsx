import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import ViewContainer from '../ViewContainer';
import DocumentTitle from '../../components/DocumentTitle';
import MediaEditForm from '../MediaEditForm';
import MediaDisplay from '../MediaDisplay';
import LoadingContent from '../LoadingContent';
import MediaEditQuery from '../../containers/MediaEditPage/MediaEditQuery.graphql';
import EditMediaMutation from '../../containers/MediaEditPage/EditMedia.graphql';
import Modal from "../Modal/index";

interface IProps {
  value: number,
  data: {
    loading: boolean,
    error: Error,
    media: {
      mediaId: number,
      deleted: boolean,
    }
  },
  editMedia(data: any): void,
  children?: any,
}

function MediaEditPage(props: IProps) {
  if (props.data.loading) {
    return <LoadingContent />;
  }

  if (props.data.error) {
    return <h1>Error</h1>;
  }

  const handleSubmit = ({ creditTitle, creditUrl }: { creditTitle: string, creditUrl: string }) =>
    props.editMedia({
      variables: {
        mediaId: props.data.media.mediaId,
        creditTitle,
        creditUrl,
      },
    });

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
        </div>
        <MediaDisplay media={props.data.media} />
      </ViewContainer>
    </DocumentTitle>
  );
}

const WithData = compose(
  graphql(MediaEditQuery, {
    options: (props: IProps) => ({
      variables: {
        mediaId: props.value,
      },
    }),
  }),
  graphql(EditMediaMutation, { name: 'editMedia' }),
)(MediaEditPage);

export default function MediaEditModal(props: any) {
  return (
    <Modal {...props}>
      <WithData {...props} />
    </Modal>
  );
}
