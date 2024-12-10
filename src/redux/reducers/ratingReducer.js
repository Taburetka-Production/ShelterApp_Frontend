
const initialState = {
  minRating: 0,
  maxRating: 10,
};

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RATING_FILTER":
      return {
        ...state,
        minRating: action.payload.minRating,
        maxRating: action.payload.maxRating,
      };
    default:
      return state;
  }
};

export default ratingReducer;