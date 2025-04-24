import { axiosInstance } from "@/App";
import { SheltersApi } from "@/generated-client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Shelter } from "@/generated-client/api";

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
    const apiInstance = new SheltersApi(undefined, "", axiosInstance);
    const response =
      (await apiInstance.apiSheltersGet()) as unknown as AxiosResponse<
        Shelter[]
      >;
    return response.data;
  },
);

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
