
const initialState = {
    selectedRegions: [],
};

const regionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_REGION":
        const region = action.payload;
        const isSelected = state.selectedRegions.includes(region);
      return {
        ...state,
        selectedRegions: isSelected 
        ? state.selectedRegions.filter((с) => с !== region) 
        : [...state.selectedRegions, region]
      };
    default:
      return state;
  }
};

export default regionReducer;