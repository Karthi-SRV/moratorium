import { combineReducers } from "redux";

const TableData = (state = [], action) => {
  switch (action.type) {
    case "tableData":
      return [...action.payload];
    default:
      return [...state];
  }
};

const MoratoriumTableData = (state = [], action) => {
  switch (action.type) {
    case "moratoriumTableData":
      return [...action.payload];
    default:
      return [...state];
  }
};

export default combineReducers({ TableData, MoratoriumTableData });
