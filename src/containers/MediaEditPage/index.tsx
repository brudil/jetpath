import React from 'react';
import { useMutation, useQuery } from 'react-apollo';

import ViewContainer from '../../components/ViewContainer';
import MediaEditForm from '../../components/MediaEditForm';
import MediaDisplay from '../../components/MediaDisplay';
import {DelayedLoadingContent} from '../../components/LoadingContent';
import Button from '../../components/Button';
import LowkeyDeleteButton from '../../components/LowkeyDeleteButton';

import MediaEditQuery from './MediaEditQuery.graphql';
import EditMediaMutation from './EditMedia.graphql';
import DeleteMediaMutation from './DeleteMedia.graphql';
import UndeleteMediaMutation from './UndeleteMedia.graphql';
import * as Router from 'react-router-dom';
import Helmet from 'react-helmet';
import {MediaObject} from "../../types";

interface IParams {
  id: string;
}

interface IProps {
  data: {
    loading: boolean;
    error: Error;
    media: MediaObject;
  };
  match: Router.match<IParams>;
  children?: any;
}

const MediaEditPage: React.FC<IProps> = (props) => {
  const { data, loading, error} = useQuery(MediaEditQuery, {
    variables: {
      mediaId: props.match.params.id,
    },
  });
  const [editMedia] = useMutation(EditMediaMutation);
  const [deleteMedia] = useMutation(DeleteMediaMutation);
  const [undeleteMedia] = useMutation(UndeleteMediaMutation);


  if (loading) {
    return <DelayedLoadingContent />;
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

  const handleDelete = () => {
    deleteMedia({
      variables: {
        mediaId: data.media.mediaId,
      },
    });
  };

  const handleUndelete = () => {
    undeleteMedia({
      variables: {
        mediaId: data.media.mediaId,
      },
    });
  };

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

        <div style={{ paddingTop: '2rem' }}>
          {!isDeleted ? (
            <LowkeyDeleteButton
              text="Delete media"
              confirmText="Are you sure you want to delete this media?"
              onDelete={handleDelete}
            />
          ) : (
            <Button onClick={handleUndelete}>Undelete</Button>
          )}
        </div>
      </div>
      <MediaDisplay media={data.media} />
    </ViewContainer>
  );
}

export default MediaEditPage;
