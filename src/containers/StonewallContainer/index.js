import PropTypes from 'prop-types';
import React from 'react';
import Stonewall from '../../components/Stonewall';
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import LoginPage from '../LoginPage';

function StonewallContainer(props) {
  return (
    <Stonewall>
      <Switch>
        <Route path="login" component={LoginPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Stonewall>
  );
}

StonewallContainer.propTypes = {
  children: PropTypes.node,
};

export default StonewallContainer;
