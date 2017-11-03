import React from 'react';
import Stonewall from '../../components/Stonewall';
import { Route, Switch, withRouter } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import LoginPage from '../LoginPage';

interface IProps {
  match: {
    url: string;
  };
}

function StonewallContainer({ match }: IProps) {
  return (
    <Stonewall>
      <Switch>
        <Route path={`${match.url}/login`} component={LoginPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Stonewall>
  );
}

export default withRouter(StonewallContainer);
