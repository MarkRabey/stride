import { combineReducers } from 'redux';

import ItemReducer from './item';
import DateReducer from './date';

const rootReducer = combineReducers({
  itemList: ItemReducer,
  date: DateReducer,
});

export default rootReducer;