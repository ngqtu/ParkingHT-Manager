import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as bookingService from 'apis';

// Fetch all booking
export const fetchBooking = createAsyncThunk('booking/fetchBooking', async () => {
    try {
        const response = await bookingService.apiGetAllBooking();
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Fetch booking by id
export const fetchBookingById = createAsyncThunk('booking/fetchBookingById', async (id, thunkAPI) => {
    try {
        const tokenData = thunkAPI.getState().auth.token;
        const response = await bookingService.apiGetBookingById(id, tokenData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Fetch payment by bookingid
export const fetchPaymentById = createAsyncThunk('booking/fetchPaymentById', async (id) => {
    try {
        const response = await bookingService.apiGetPaymentById(id);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        list: [],
        getbooking: null,
        getpayment: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch booking
            .addCase(fetchBooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchBooking.rejected, (state, action) => {
                state.loading = false;
            })
            // Fetch booking by id
            .addCase(fetchBookingById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.loading = false;
                state.getbooking = action.payload;
            })
            .addCase(fetchBookingById.rejected, (state, action) => {
                state.loading = false;
            })
            // Fetch payment by id
            .addCase(fetchPaymentById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPaymentById.fulfilled, (state, action) => {
                state.loading = false;
                state.getpayment = action.payload;
            })
            .addCase(fetchPaymentById.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export default bookingSlice.reducer;