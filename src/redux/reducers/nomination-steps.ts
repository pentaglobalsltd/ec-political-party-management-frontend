import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const getNominationStepsReducer = createSlice({
  name: 'getNominationList',
  initialState: [],
  reducers: {
    getNominationStep(state, action: PayloadAction<any>) {
      return action.payload;
    },
  },
});

export const { getNominationStep } = getNominationStepsReducer.actions;

export default getNominationStepsReducer;
