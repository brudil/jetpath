import React from 'react';
import { useMutation, useQuery } from 'react-apollo';

import ViewContainer from '../ViewContainer';
import MediaEditForm from '../MediaEditForm';
import MediaDisplay from '../MediaDisplay';
import LoadingContent from '../LoadingContent';
import MediaEditQuery from '../../containers/MediaEditPage/MediaEditQuery.graphql';
import EditMediaMutation from '../../containers/MediaEditPage/EditMedia.graphql';
import Modal from '../Modal/index';
import Helmet from 'react-helmet';
import {MediaObject} from "../../types";

interface ComponentProps {
  value: number;
  editMedia(data: any): void;
  children?: any;
}

interface InternalProps {
  data: {
    loading: boolean;
    error: Error;
    media: MediaObject;
  };
}

type IProps = ComponentProps & InternalProps;

const MediaEditPage: React.FC<IProps> = (props) => {
  const [editMedia] = useMutation(EditMediaMutation);
  const { data, loading, error } = useQuery(MediaEditQuery, {
    variables: {
      mediaId: props.value,
    },
  });

  if (loading) {
    return <LoadingContent />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  const handleSubmit = ({
    creditTitle,
    creditUrl,
  }: {
    creditTitle: string;
    creditUrl: string;
  }) =>
    editMedia({
      variables: {
        mediaId: data.media.mediaId,
        creditTitle,
        creditUrl,
      },
    });

  const isDeleted = data.media.deleted;

  return (
    <ViewContainer>
      <Helmet>
        <title>Media</title>
      </Helmet>

      <h1>
        Edit media #{data.media.mediaId} {isDeleted ? '[deleted]' : ''}
      </h1>
      <div style={{ maxWidth: '300px', width: '100%' }}>
        <MediaEditForm
          initialValues={data.media}
          onSubmit={handleSubmit}
        />
      </div>
      <MediaDisplay media={data.media} />
    </ViewContainer>
  );
}

export default function MediaEditModal(props: any) {
  return (
    <Modal {...props}>
      <MediaEditPage {...props} />
    </Modal>
  );
}
