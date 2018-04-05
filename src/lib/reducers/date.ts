import { SET_DATE } from '../actions';

const initalState = {
  date: {
    day: '',
    month: '',
    year: '',
    weekday: ''
  }
};

export default function(state: any = initalState, action: any) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_DATE:
      newState.date = action.date;
      break;

    default:
      return state;
  }

  return newState;
}

export const getDate = (state: any) => {
  return state.date.date;
};
