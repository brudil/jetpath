import React from 'react';
import Button from '../Button';
import { compose } from 'recompose';
import { useMutation, useQuery } from 'react-apollo';

import ContentWatchersQuery from './ContentWatchers.graphql';
import WatchContentMutation from './WatchContent.graphql';
import { connect } from 'react-redux';

interface ComponentProps {
  contentId: number;
}

interface InternalProps {
  auth: {
    id: number;
  };
}

type IProps = InternalProps & ComponentProps;

const ContentWatchManager: React.FC<IProps> = (props) => {
  const [watchContent] = useMutation(WatchContentMutation);
  const {data, loading, error} = useQuery(ContentWatchersQuery, {
    variables: {
      contentId: props.contentId
    }
  })

  if (loading) {
    return null;
  }
  if (error) {
    return <div>error!</div>;
  }

  const isWatching =
    data.content.editorialMetadata.watchers
      .map((watcher: any) => watcher.user.userId)
      .indexOf(props.auth.id) >= 0;

  return (
    <div>
      <h3>Watchers</h3>
      <Button
        onClick={() => watchContent()}
      >{isWatching ? 'Slience' : 'Watch'}</Button>

      <ul>
        {data.content.editorialMetadata.watchers.map((watcher: any) => (
          <li key={watcher.user.userId}>{watcher.user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default compose<IProps, ComponentProps>(
  connect((state: any) => ({
    auth: state.auth.get('auth'),
  })),
)(ContentWatchManager);
