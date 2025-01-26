import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        singleJob: null
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.allJobs = action.payload
        }
    }
});

export const { setAllJobs } = jobSlice.actions;
export const { setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;