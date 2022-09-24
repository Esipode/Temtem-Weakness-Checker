import { configureStore } from '@reduxjs/toolkit';
import partyReducer from './partySlice';
import partyModalReducer from './partyModalSlice';
import competitiveReducer from './competitiveSlice';
import weaknessesReducer from './teamWeaknesses';
import temsReducer from './temsSlice';

export default configureStore({
  reducer: {
    party: partyReducer,
    partyModal: partyModalReducer,
    competitive: competitiveReducer,
    teamWeaknesses: weaknessesReducer,
    tems: temsReducer,
  },
});