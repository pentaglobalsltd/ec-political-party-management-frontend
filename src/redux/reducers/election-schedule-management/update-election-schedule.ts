import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const updateElectionScheduleReducer = createSlice({
  name: 'updateElectionDetails',
  initialState: {},
  reducers: {
    updateElectionSchedule(state, action: PayloadAction<any>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateElectionSchedule } = updateElectionScheduleReducer.actions;

export default updateElectionScheduleReducer;
