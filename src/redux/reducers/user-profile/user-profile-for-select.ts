import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const getUserProfileForSelectReducer = createSlice({
  name: 'getUserProfileForSelect',
  initialState: {},
  reducers: {
    getUserProfileForSelect(state, action: PayloadAction<any>) {
      return action.payload;
    },
  },
});

export const { getUserProfileForSelect } =
  getUserProfileForSelectReducer.actions;

export default getUserProfileForSelectReducer;
