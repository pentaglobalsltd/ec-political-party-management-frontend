import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const createElectionScheduleReducer = createSlice({
  name: 'createElectionDetails',
  initialState: {},
  reducers: {
    createElectionSchedule(state, action: PayloadAction<any>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { createElectionSchedule } = createElectionScheduleReducer.actions;

export default createElectionScheduleReducer;
