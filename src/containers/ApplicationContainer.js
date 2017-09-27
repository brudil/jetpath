import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import loadBaseContainer from 'bundle-loader?name=Base&lazy!./BaseContainer';
import DocumentTitle from '../components/DocumentTitle';
import Stonewall from '../components/Stonewall';
import * as AuthActions from '../ducks/Auth';
import StonewallContainer from './StonewallContainer';
import Bundle from '../components/Bundle';

const BaseContainer = props => (
  <Bundle load={loadBaseContainer}>
    {BaseContainerL => <BaseContainerL {...props} />}
  </Bundle>
);

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(AuthActions.restoreAuth());
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error: { error, info } });
    console.log({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Stonewall subtitle="Huston, shit's just crashed.">
          <p>
            Yeah. Sorry about this! Have a gander in the console if {`you're `}
            interested in what happened.
          </p>
        </Stonewall>
      );
    }

    return (
      <DocumentTitle title="Jetpath">
        <div>
          {this.props.auth.get('attempted') ? (
            <Switch>
              <Route path="/auth" component={StonewallContainer} />
              <Route path="/" component={BaseContainer} />
            </Switch>
          ) : (
            <Stonewall subtitle="Loading" />
          )}
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
