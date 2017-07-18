import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import loadBaseContainer from 'bundle-loader?name=Base&lazy!./BaseContainer';
import DocumentTitle from '../components/DocumentTitle';
import Stonewall from '../components/Stonewall';
import * as AuthActions from '../actions/AuthActions';
import StonewallContainer from './StonewallContainer';
import Bundle from '../components/Bundle';

const BaseContainer = props =>
  <Bundle load={loadBaseContainer}>
    {BaseContainerL => <BaseContainerL {...props} />}
  </Bundle>;

class ApplicationContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(AuthActions.restoreAuth());
  }

  render() {
    return (
      <DocumentTitle title="Jetpath">
        <div>
          {this.props.auth.attempted
            ? <Switch>
                <Route path="/auth" component={StonewallContainer} />
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
};

export default withRouter(
  connect(state => ({
    auth: state.auth,
  }))(ApplicationContainer)
);
