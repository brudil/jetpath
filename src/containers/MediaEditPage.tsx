import React from 'react';
import ViewContainer from '../components/ViewContainer';
import DocumentTitle from '../components/DocumentTitle';

function MediaEditPage(props: { match: { params: { id: number }} }) {

  return (
    <DocumentTitle title="Media">
      <ViewContainer>
        <h1>Edit media: #{props.match.params.id}</h1>
      </ViewContainer>
    </DocumentTitle>
  );
}


export default MediaEditPage;
