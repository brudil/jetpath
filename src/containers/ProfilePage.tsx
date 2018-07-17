import React from 'react';
import ViewContainer from '../components/ViewContainer';
import { connect } from 'react-redux';
import { RootState } from '../types';
import { compose } from 'recompose';
import Helmet from 'react-helmet';
import LoadingContent from "../components/LoadingContent";

interface IProps {
  auth: any;
  vertical: {
    identifier: string;
  };
}

class ProfilePage extends React.Component<IProps, {}> {

  render() {
    return (
      <ViewContainer>
        <Helmet>
          <title>Profile</title>
        </Helmet>

        <h1 style={{ marginBottom: '1rem' }}>
          Hey, {this.props.auth.getIn(['auth', 'username'])}!
        </h1>
        <LoadingContent />
      </ViewContainer>
    );
  }
}

export default compose<IProps, {}>(
  connect((state: RootState) => ({
    vertical: state.verticals.selectedVertical,
    auth: state.auth,
  })),
)(ProfilePage);
