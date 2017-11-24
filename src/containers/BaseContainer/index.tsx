import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import GlobalHeader from '../../components/GlobalHeader';
import Toasts from '../../components/Toasts';
import VerticalSelectionPage from '../VerticalSelectionPage';
import InnerVerticalPage from '../InnerVerticalPage';
import NotFoundPage from '../NotFoundPage';
import LoadingContent from '../../components/LoadingContent/index';
import styled from 'react-emotion';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../types';
import { AuthState } from '../../ducks/Auth';

const Section = styled.div`
  background-color: ${props => props.theme.colors.background};
  box-sizing: border-box;
  position: relative;
  box-shadow: -2px 0 16px rgba(60, 60, 60, 0.15);
  min-height: 100vh;

  @media (min-width: 960px) {
    margin-left: 68px;
  }
`;

interface IProps extends RouteComponentProps<{}> {
  children: any;
  auth: AuthState;
}

class BaseContainer extends React.Component<IProps> {
  componentWillMount() {
    if (!{}.hasOwnProperty.call(this.props, 'auth')) {
      return;
    }

    this.handleCorrectRoute(this.props);
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.handleCorrectRoute(nextProps);
  }

  handleCorrectRoute(props: IProps) {
    if (props.auth.get('auth') === null) {
      this.props.history.replace(
        `/auth/login?nextPath=${this.props.location.pathname}`
      );
    }
  }

  render() {
    const { url } = this.props.match;
    if (this.props.auth.get('auth') === null) {
      return <LoadingContent />;
    }

    return (
      <div>
        <GlobalHeader />
        <div>
          <Section>
            <Switch>
              <Route
                path={`${url}verticals`}
                component={VerticalSelectionPage}
              />
              <Route path={`${url}@:vertical`} component={InnerVerticalPage} />
              <Redirect from="/" to="verticals" />
              <Route path="*" component={NotFoundPage} />
            </Switch>
            <Toasts />
          </Section>
        </div>
      </div>
    );
  }
}

const withRoutered = withRouter(
  connect((state: RootState) => ({
    auth: state.auth,
  }))(BaseContainer)
);

const finalComponent = dragDropContext(HTML5Backend)(withRoutered);

export default finalComponent;
