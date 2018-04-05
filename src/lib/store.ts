import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { loadState, saveState } from './local-storage';
import reducers from './reducers';

// Create Store
const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(createLogger({ collapsed: true })))
);

store.subscribe(() => {
  saveState(store.getState());
});

export { store };
