import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import DocumentTitle from '../components/DocumentTitle';
import Stonewall from '../components/Stonewall';
import * as AuthActions from '../actions/AuthActions';
import { Redirect, Route, Switch } from 'react-router-dom';
import BaseContainer from './BaseContainer';
import StonewallContainer from './StonewallContainer';

class ApplicationContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(AuthActions.restoreAuth());
  }

  render() {
    return (
      <DocumentTitle title="Jetpath">
        <div>
          {this.props.auth.attempted && this.props.children
            ? <Switch>
                <Redirect from="/" to="verticals" />
                <Route path="auth" component={StonewallContainer} />
                <Route path="/" component={BaseContainer} />
              </Switch>
            : <Stonewall subtitle="Loading" />}
        </div>
      </DocumentTitle>
    );
  }
}

ApplicationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default connect(state => ({
  auth: state.auth,
}))(ApplicationContainer);
