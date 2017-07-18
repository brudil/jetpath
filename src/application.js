import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import rootSaga from './sagas/index';
import { createToast } from './ducks/Toast';
import ApplicationContainer from './containers/ApplicationContainer';

console.log('Jetpath 1.0');
console.log(`ENV: ${process.env.NODE_ENV}`);

require('./styles/legacy/style.css');

const store = configureStore();
const rootTask = store.sagaMiddleware.run(rootSaga);

function renderApp() {
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <Router>
          <ApplicationContainer />
        </Router>
      </Provider>
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
