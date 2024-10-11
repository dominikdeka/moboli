import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchThinkSpeakReadings } from '../utils/http';

export const fetchReadings = createAsyncThunk("readings/get", async () => {
  return await fetchThinkSpeakReadings()
});
const thingspeakSlice = createSlice({
  name: 'thingspeakReadings',
  initialState: {
    loading: false,
    readings: []
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReadings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReadings.fulfilled, (state, action) => {
      state.readings = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchReadings.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default thingspeakSlice.reducer;