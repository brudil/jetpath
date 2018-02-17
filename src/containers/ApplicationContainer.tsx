import React, { ErrorInfo } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Stonewall from '../components/Stonewall';
import LoadableLoading from '../components/LoadableLoading';
import * as AuthActions from '../ducks/Auth';
import StonewallContainer from './StonewallContainer';
import { RootState } from '../types';
import { compose } from 'recompose';
import { ThemeProvider } from 'emotion-theming';
import defaultTheme from '../themes/default';
import Helmet from 'react-helmet';

const LoadableBaseContainer = Loadable({
  loader: () => import(/* webpackChunkName: 'Base' */ './BaseContainer'),
  loading: LoadableLoading,
});

interface IProps {
  restoreAuth(): void;
  auth: any; // todo: auth shape
}

interface IState {
  hasError: boolean;
  error: null | {
    error: Error;
    info: ErrorInfo;
  };
}

class ApplicationContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidMount() {
    this.props.restoreAuth();
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
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
      <ThemeProvider theme={defaultTheme}>
        <div>
          <Helmet titleTemplate="%s - Jetpath" defaultTitle="Jetpath" />

          {this.props.auth.get('attempted') ? (
            <Switch>
              <Route path="/auth" component={StonewallContainer} />
              <Route path="/" component={LoadableBaseContainer} />
            </Switch>
          ) : (
            <Stonewall subtitle="Loading" />
          )}
        </div>
      </ThemeProvider>
    );
  }
}

export default compose<IProps, {}>(
  withRouter,
  connect(
    (state: RootState) => ({
      auth: state.auth,
    }),
    {
      restoreAuth: AuthActions.restoreAuth,
    }
  )
)(ApplicationContainer);
