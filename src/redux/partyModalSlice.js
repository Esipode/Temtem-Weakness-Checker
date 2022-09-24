import { createSlice } from '@reduxjs/toolkit';

export const partyModalSlice = createSlice({
  name: 'party-modal',
  initialState: {value: false},
  reducers: {
    toggle: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const { toggle } = partyModalSlice.actions;

export default partyModalSlice.reducer;