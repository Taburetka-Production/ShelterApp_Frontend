
export const setRatingFilter = (minRating, maxRating) => ({
    type: 'SET_RATING_FILTER',
    payload: { minRating, maxRating },
  });