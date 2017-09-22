import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface,
} from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import settings from './settings';
import configureStore from './store/configureStore';
import rootSaga from './sagas/index';
import { createToast } from './ducks/Toast';
import ApplicationContainer from './containers/ApplicationContainer';
import { clientAuth } from './client';

console.log('Jetpath 7.0');
console.log(`ENV: ${process.env.NODE_ENV}`);

require('./styles/legacy/style.css');

const networkInterface = createNetworkInterface({
  uri: `${settings.lowdownHost}/manage/graphql/`,
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        // eslint-disable-next-line no-param-reassign
        req.options.headers = {}; // Create the header object if needed.
      }
      const token = clientAuth.getToken();
      if (token) {
        // eslint-disable-next-line no-param-reassign
        req.options.headers.Authorization = token ? `Bearer ${token}` : null;
      }
      next();
    },
  },
]);

const client = new ApolloClient({
  networkInterface,
});

const store = configureStore({ apolloClient: client });
const rootTask = store.sagaMiddleware.run(rootSaga);

function renderApp() {
  ReactDOM.render(
    <div>
      <ApolloProvider store={store} client={client}>
        <Router>
          <ApplicationContainer />
        </Router>
      </ApolloProvider>
    </div>,
    document.getElementById('app')
  );
}

rootTask.done.catch(err => {
  store.dispatch(createToast('Fatal error!', 'Please see log.', 'error'));
  console.log(err);
});

try {
  window.Typekit.load({
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
}
