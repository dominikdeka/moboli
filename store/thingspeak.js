import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchThinkSpeakReadings } from '../utils/http';

export const fetchReadings = createAsyncThunk("readings/get", async () => {
  return await fetchThinkSpeakReadings()
});
const thingspeakSlice = createSlice({
  name: 'thingspeakReadings',
  initialState: {
    loading: false,
    serverState: 'string',
    serverError: 'string',
    readings: {}
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReadings.pending, (state) => {
      state.readings = {}
      state.loading = true;
      state.serverState = null;
      state.serverError = null;
    });
    builder.addCase(fetchReadings.fulfilled, (state, action) => {
      state.readings = action.payload;
      state.loading = false;
      state.serverState = 'Połączono';
      state.serverError = null;
    });
    builder.addCase(fetchReadings.rejected, (state) => {
      state.readings = {}
      state.loading = false;
      state.serverError = 'Błąd';
      state.serverState = null;
    });
  }
});

export default thingspeakSlice.reducer;