import { actions } from "../store/actionTypes";
import store from "../store";

const TABLE_DATA = data => {
  return store.dispatch({ payload: data, type: actions.TABLE_DATA });
};

const MORATORIUM_TABLE_DATA = data => {
  return store.dispatch({ payload: data, type: actions.MORATORIUM_TABLE_DATA });
};

export default { TABLE_DATA, MORATORIUM_TABLE_DATA };
