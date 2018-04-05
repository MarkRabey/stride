import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, RESET_ALL } from '../actions';

const initialState = {
  items: []
};

export default (state: any = initialState, action: any) => {
  const newState: any = Object.assign({}, state);

  switch (action.type) {
    case ADD_ITEM:
      newState.items = newState.items.concat(action.item);
      break;

    case UPDATE_ITEM:
      newState.items = newState.items.map((i: any) => {
        if (i.key === action.item.key) {
          return Object.assign({}, i, {
            status: action.item.status
          });
        }

        return i;
      });
      break;

    case DELETE_ITEM:
      newState.items = newState.items.filter((item: any) => item.key !== action.item.key);
      break;

    case RESET_ALL:
      newState.items = newState.items
        .filter((item: any) => item.status !== 'complets')
        .map((i: any) => {
          if (i.status === 'paused') {
            return Object.assign({}, i, {
              status: 'pending'
            });
          }
          return i;
        });
      break;
    default:
      return state;
  }

  return newState;
};

export const getAllItems = (state: any) => {
  return state.itemList.items;
};

export const getPendingItems = (state: any) => {
  return state.itemList.items.filter((item: any) => item.status === 'pending');
};

export const getCompletedItems = (state: any) => {
  return state.itemList.items.filter((item: any) => item.status === 'complete');
};

export const getPausedItems = (state: any) => {
  return state.itemList.items.filter((item: any) => item.status === 'paused');
};
