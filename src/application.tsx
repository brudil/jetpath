import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloLink } from 'apollo-link';
import { BrowserRouter as Router } from 'react-router-dom';
import settings from './settings';
import configureStore from './store/configureStore';
import rootSaga from './sagas/index';
import ApplicationContainer from './containers/ApplicationContainer';
import { clientAuth } from './client';

console.log('Jetpath 8.0');
console.log(`ENV: ${process.env.NODE_ENV}`);

require('./styles/legacy/style.css');

const httpLink = new HttpLink({
  uri: `${settings.lowdownHost}/manage/graphql/`,
});

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = clientAuth.getToken();

  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  if (forward) {
    return forward(operation);
  } else {
    return null;
  }
});

const link = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache() as any,
}) as any;

const store = configureStore();
(store as any).sagaMiddleware.run(rootSaga);

function renderApp() {
  ReactDOM.render(
    (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <ApplicationContainer />
          </Router>
        </Provider>
      </ApolloProvider>
    ) as any,
    document.getElementById('app')
  );
}

try {
  (window as any).Typekit.load({
    active: function webfontsActivated() {
      console.log('[webfonts] Active.');
      renderApp();
    },
    inactive: function webfontsInactive() {
      renderApp();
    },
  });
} catch (e) {
  console.warn('[webfonts] failed to load');
  renderApp();
}
