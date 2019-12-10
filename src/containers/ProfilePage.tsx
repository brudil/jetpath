import React, { useCallback } from 'react';
import ViewContainer from '../components/ViewContainer';
import { RootState } from '../types';
import Helmet from 'react-helmet';
import LoadingContent from "../components/LoadingContent";
import { useMappedState } from 'redux-react-hook';

interface IProps {
  auth: any;
  vertical: {
    identifier: string;
  };
}

const ProfilePage: React.FC<IProps> = () => {
  const mappedState = useCallback((state: RootState) => ({
    auth: state.auth,
  }), []);

  const { auth} = useMappedState(mappedState);

    return (
      <ViewContainer>
        <Helmet>
          <title>Profile</title>
        </Helmet>

        <h1 style={{ marginBottom: '1rem' }}>
          Hey, {auth.getIn(['auth', 'username'])}!
        </h1>
        <LoadingContent />
      </ViewContainer>
    );
}

export default ProfilePage;
