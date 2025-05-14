import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const getUserProfileForElectionSettingsIdReducer = createSlice({
  name: 'getUserProfileForElectionSettingsId',
  initialState: [],
  reducers: {
    getUserProfileForElectionSettingsId(state, action: PayloadAction<any>) {
      return action.payload;
    },
  },
});

export const { getUserProfileForElectionSettingsId } =
  getUserProfileForElectionSettingsIdReducer.actions;

export default getUserProfileForElectionSettingsIdReducer;
