import PropTypes from 'prop-types';
import React from 'react';
import Stonewall from '../../components/Stonewall';
import { Route, Switch, withRouter } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import LoginPage from '../LoginPage';

function StonewallContainer({ match }) {
  return (
    <Stonewall>
      <Switch>
        <Route path={`${match.url}/login`} component={LoginPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Stonewall>
  );
}

StonewallContainer.propTypes = {
  children: PropTypes.node,
};

export default withRouter(StonewallContainer);
