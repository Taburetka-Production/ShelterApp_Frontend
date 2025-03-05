import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "../types";

const initialState: SearchState = {
  searchQuery: "",
  sortOrder: "desc",
  regions: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
    setRegionFilter: (state, action: PayloadAction<string[]>) => {
      state.regions = action.payload;
    },
  },
});

export const { setSearchQuery, setSortOrder, setRegionFilter } = searchSlice.actions;
export default searchSlice.reducer;
