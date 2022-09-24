import { createSlice } from '@reduxjs/toolkit';

export const partySlice = createSlice({
  name: 'party',
  initialState: {value: localStorage.getItem('myTemTeam') ? JSON.parse(localStorage.getItem('myTemTeam')) : {}},
  reducers: {
    set: (state, action) => {
      localStorage.setItem('myTemTeam', JSON.stringify(JSON.parse(JSON.stringify(action.payload))));
      state.value = JSON.parse(JSON.stringify(action.payload));
    },
    clear: (state) => {
      localStorage.setItem('myTemTeam', JSON.stringify({}));
      state.value = {}
    }
  }
});

export const { set, clear } = partySlice.actions;

export default partySlice.reducer;