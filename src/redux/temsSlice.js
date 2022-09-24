import { createSlice } from '@reduxjs/toolkit';

export const temsSlice = createSlice({
  name: 'tem-list',
  initialState: {value: []},
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state = [];
    }
  }
});

export const { set, clear } = temsSlice.actions;

export default temsSlice.reducer;