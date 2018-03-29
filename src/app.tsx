import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadState, saveState } from './lib/local-storage';
import rootReducer from './lib/reducers';

import Main from './components/main';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState,
  composeWithDevTools(
    applyMiddleware(
      createLogger({ collapsed: true }),
    )
  ));

store.subscribe(() => {
  saveState(store.getState());
});

let render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <Main />
      </Provider>
    </AppContainer>,
  document.getElementById('App'));
};

render();
if (module.hot) { module.hot.accept(render); }
