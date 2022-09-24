import { createSlice } from '@reduxjs/toolkit';

export const competitiveSlice = createSlice({
  name: 'competitive-team',
  initialState: {value: JSON.parse(localStorage.getItem('competitive')) || false},
  reducers: {
    toggle: (state, action) => {
      localStorage.setItem('competitive', action.payload);
      state.value = action.payload;
    },
  }
});

export const { toggle } = competitiveSlice.actions;

export default competitiveSlice.reducer;