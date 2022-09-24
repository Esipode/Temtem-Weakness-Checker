import { createSlice } from '@reduxjs/toolkit';

export const weaknessesSlice = createSlice({
  name: 'team-weaknesses',
  initialState: {value: JSON.parse(localStorage.getItem('team-weaknesses')) || false},
  reducers: {
    toggle: (state, action) => {
      localStorage.setItem('team-weaknesses', action.payload);
      state.value = action.payload;
    },
  }
});

export const { toggle } = weaknessesSlice.actions;

export default weaknessesSlice.reducer;