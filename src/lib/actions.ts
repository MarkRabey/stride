export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const RESET_ALL = 'RESET_ALL';

export const SET_DATE = 'SET_DATE';

export const addItem = (item: any) => ({ item, type: ADD_ITEM });
export const updateItem = (item: any) => ({ item, type: UPDATE_ITEM });
export const deleteItem = (item: any) => ({ item, type: DELETE_ITEM });

export const resetAll = () => ({ type: RESET_ALL });

export const setDate = (date: any) => ({ date, type: SET_DATE });
