import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reportService from 'apis';
import { toast } from 'react-toastify';

// Fetch all report
export const fetchReport = createAsyncThunk('report/fetchReport', async () => {
    const response = await reportService.apigetallReport();
    return response.data;
});

// Fetch all Report Unread
export const fetchReportUnread = createAsyncThunk('report/fetchReportUnread', async (report, thunkAPI) => {
    try {
        const tokenData = thunkAPI.getState().auth.token;
        const response = await reportService.apiListReportUnread(tokenData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Fetch count Report Unread
export const fetchCountReportUnread = createAsyncThunk('report/fetchCountReportUnread', async (report, thunkAPI) => {
    try {
        const tokenData = thunkAPI.getState().auth.token;
        const response = await reportService.apiCountReportUnread(tokenData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Update a report
export const updateReport = createAsyncThunk('report/updateReport', async (data) => {
    const response = await reportService.apiUpdateReport(data);
    return response.data;
});

const reportSlice = createSlice({
    name: 'report',
    initialState: {
        list: [],
        loading: false,
        countUnread: 0,
        listUnread: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch report
            .addCase(fetchReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReport.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchReport.rejected, (state, action) => {
                state.loading = false;
            })      
            // Update report
            .addCase(updateReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReport.fulfilled, (state, action) => {
                state.loading = false;
                const updatedReport = action.payload;
                state.list = state.list.map((report) =>
                    report.reportId === updatedReport.reportId
                        ? updatedReport
                        : report
                );
                state.countUnread = state.list.filter((report) => !report.isRead).length;
                state.listUnread = state.list.filter((report) => !report.isRead);
                toast.success("Báo cáo được cập nhật thành công!");
            })
            .addCase(updateReport.rejected, (state, action) => {
                state.loading = false;
                toast.error("Báo cáo được cập nhật thất bại!")
            })    
            //fetch count report unread
            .addCase(fetchCountReportUnread.fulfilled, (state, action) => {
                state.loading = false;
                state.countUnread = action.payload;
            })
            .addCase(fetchCountReportUnread.rejected, (state) => {
                state.loading = false;
            }) 
            //fetch report unread
            .addCase(fetchReportUnread.fulfilled, (state, action) => {
                state.loading = false;
                state.listUnread = action.payload;
            })
            .addCase(fetchReportUnread.rejected, (state) => {
                state.loading = false;
            }) 
    },
});

export default reportSlice.reducer;