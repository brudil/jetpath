import React from 'react';
import MediaUploadContainer from '../MediaUploadContainer';
import MediaGrid from '../MediaGrid';
import LoadingContent from '../LoadingContent';
import NoListItems from '../NoListItems';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import MediaListQuery from './MediaList.graphql';
import { MediaClient } from '../../serverAPI';
import {MediaObject, RootState} from '../../types';

interface ComponentProps {
  onSelect?: (mediaId: number) => void;
  wrap?: (media: MediaObject, children: any) => any;
  children?: any;
}

interface InternalProps {
  vertical: {
    identifier: string;
  };
  data: {
    loading: boolean;
    vertical: {
      allMedia: any;
    };
    refetch: () => void;
  };
}

type IProps = InternalProps & ComponentProps;

const MediaGridContainer: React.FC<IProps> = (props) => {
  if (props.data.loading) {
    return <LoadingContent />;
  }

  const { data: { vertical: { allMedia } } } = props;

  function handleFile(file: any) {
    MediaClient.upload(props.vertical.identifier, file).then(() =>
      props.data.refetch()
    );
  }

  return (
    <div>
      <MediaUploadContainer onFile={handleFile}>
        <div>
          {allMedia.edges.length > 0 ? (
            <div>
              <MediaGrid
                media={allMedia.edges}
                onSelect={props.onSelect}
                wrap={props.wrap}
              />
            </div>
          ) : (
            <NoListItems text="No media meets criteria" />
          )}
        </div>
      </MediaUploadContainer>
    </div>
  );
}

export default compose<IProps, ComponentProps>(
  connect((state: RootState) => ({
    uploadProgress: state.uploadProgress,
    vertical: state.verticals.selectedVertical,
  })),
  graphql(MediaListQuery, {
    options: (props: any) => ({
      variables: {
        vertical: props.vertical.identifier,
      },
    }),
  })
)(MediaGridContainer);
