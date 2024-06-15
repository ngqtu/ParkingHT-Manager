import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as feedbackService from 'apis';

// Fetch all feedback
export const fetchFeedback = createAsyncThunk('feedback/fetchFeedback', async () => {
    const response = await feedbackService.apigetFeedback();
    return response.data;
});
// Fetch all Feedback Unread
export const fetchFeedbackUnread = createAsyncThunk('feedback/fetchFeedbackUnread', async (feedback, thunkAPI) => {
    try {
        const tokenData = thunkAPI.getState().auth.token;
        const response = await feedbackService.apiListFeedbackUnread(tokenData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Fetch count Feedback Unread
export const fetchCountFeedbackUnread = createAsyncThunk('feedback/fetchCountFeedbackUnread', async (feedback, thunkAPI) => {
    try {
        const tokenData = thunkAPI.getState().auth.token;
        const response = await feedbackService.apiCountFeedbackUnread(tokenData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Update a feedback
export const updateFeedback = createAsyncThunk('feedback/updateFeedback', async (data) => {
    const response = await feedbackService.apiUpdateFeedback(data.feedbackId, { content: data.content, rankStar: data.rankStar });
    return response.data;
});

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        list: [],
        loading: false,
        countUnreadF: 0,
        listUnreadF: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch feedback
            .addCase(fetchFeedback.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchFeedback.rejected, (state) => {
                state.loading = false;
            })
            //fetch count feedback unread
            .addCase(fetchCountFeedbackUnread.fulfilled, (state, action) => {
                state.loading = false;
                state.countUnreadF = action.payload;
            })
            .addCase(fetchCountFeedbackUnread.rejected, (state) => {
                state.loading = false;
            })
            //fetch feedback unread
            .addCase(fetchFeedbackUnread.fulfilled, (state, action) => {
                state.loading = false;
                state.listUnreadF = action.payload;
            })
            .addCase(fetchFeedbackUnread.rejected, (state) => {
                state.loading = false;
            })
            // Update feddback
            .addCase(updateFeedback.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateFeedback.fulfilled, (state, action) => {
                state.loading = false;
                const updatedFeedback = action.payload;
                state.list = state.list.map((feedback) =>
                    feedback.feedBackId === updatedFeedback.feedBackId
                        ? updatedFeedback
                        : feedback
                );
                state.countUnreadF = state.list.filter((feedback) => !feedback.isRead).length;
                state.listUnreadF = state.list.filter((feedback) => !feedback.isRead);
            })
            .addCase(updateFeedback.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export default feedbackSlice.reducer;