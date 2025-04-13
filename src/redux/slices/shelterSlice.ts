import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Shelter } from "../types";

interface ShelterState {
  shelters: Shelter[];
  loading: boolean;
  error: string | null;
}

const initialState: ShelterState = {
  shelters: [],
  loading: false,
  error: null,
};

export const fetchShelters = createAsyncThunk(
  "shelter/fetchShelters",
  async () => {
    const response = await axios.get<Shelter[]>(
      "https://localhost:7118/api/Shelters",
    );
    return response.data;
  },
);

// export const fetchShelters = createAsyncThunk<Shelter[], void>(
//   "shelter/fetchShelters",
//   async () => {
//     const apiInstance = new SheltersApi(undefined, "", axiosInstance);
//     const response = await apiInstance.apiSheltersGet();
//     return response.data;
//   },
// );

export const shelterSlice = createSlice({
  name: "shelter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShelters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchShelters.fulfilled,
        (state, action: PayloadAction<Shelter[]>) => {
          state.shelters = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchShelters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default shelterSlice.reducer;
