const filterReducer = (state = "", action) => {
  // console.log("FILTER REDUCER: ACTION: ", action);
  // console.log("FILTER REDUCER: STATE: ", state);
  switch (action.type) {
    case "UPDATE_FILTER_TEXT": {
      return action.payload.filterText;
    }
  }

  return state;
};

export const updateFilterText = (filterText) => {
  return {
    type: "UPDATE_FILTER_TEXT",
    payload: {
      filterText,
    },
  };
};

export default filterReducer;
