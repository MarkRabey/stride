import { combineReducers } from 'redux';

import item from './item';
import date from './date';

const rootReducer = combineReducers({
  itemList: ItemReducer,
  date: DateReducer
});

export default rootReducer;
