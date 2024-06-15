import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as parkingslotService from 'apis';

// // Fetch area of parkingslot by category
export const fetchParkingslotAreaByCategory = createAsyncThunk('parkingslot/fetchParkingslotAreaByCategory', async (category) => {
    const response = await parkingslotService.apiParkingSlotAreaByCategory(category);
    return response.data;
});

// Fetch all parkingslot by area
export const fetchParkingslotByArea = createAsyncThunk('parkingslot/fetchParkingslotByArea', async (id) => {
    const response = await parkingslotService.apiParkingSlotByArea(id);
    return response.data;
});

// Update a parkingslot
export const updateParkingslot = createAsyncThunk('parkingslot/updateParkingslot', async (data) => {
    return await parkingslotService.apiEditParkingSlot(data);
});

const parkingslotSlice = createSlice({
    name: 'parkingslot',
    initialState: {
        loading: false,
        listAreaByCategory: [],
        listPSbyArea: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch parkingslot all area
            .addCase(fetchParkingslotAreaByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchParkingslotAreaByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.listAreaByCategory = action.payload;
            })
            .addCase(fetchParkingslotAreaByCategory.rejected, (state, action) => {
                state.loading = false;
            })
            // Fetch parkingslot by area
            .addCase(fetchParkingslotByArea.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchParkingslotByArea.fulfilled, (state, action) => {
                state.loading = false;
                state.listPSbyArea = action.payload;
            })
            .addCase(fetchParkingslotByArea.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.payload.message;
            })
            // Update parkingslot
            .addCase(updateParkingslot.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateParkingslot.fulfilled, (state, action) => {
                state.loading = false;
                const updatedParkingSlot = action.payload;
                state.list = state.list.map((parkingslot) =>
                    parkingslot.parkingSlotId === updatedParkingSlot.parkingSlotId
                        ? updatedParkingSlot
                        : parkingslot
                );
            })
            .addCase(updateParkingslot.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export default parkingslotSlice.reducer;