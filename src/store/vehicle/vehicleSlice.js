import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as vehicleService from 'apis';
import { toast } from 'react-toastify';

// Fetch all vehicle
export const fetchVehicle = createAsyncThunk('vehicle/fetchVehicle', async () => {
    const response = await vehicleService.apiVehicle();
    return response.data;
});

// Delete a vehicle
export const deleteVehicle = createAsyncThunk('vehicle/deleteVehicle', async (vehicleId) => {
    return await vehicleService.apiDeleteVehicle(vehicleId);
});

// Update a vehicle
export const updateVehicle = createAsyncThunk('vehicle/updateVehicle', async (data) => {
    return await vehicleService.apiEditVehicle(data);
});

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch vehicle
            .addCase(fetchVehicle.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchVehicle.rejected, (state) => {
                state.loading = false;
            })
            // Delete vehicle
            .addCase(deleteVehicle.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                state.loading = false;
                toast.error("Không tìm thấy xe này!")
            })
            // Update vehicle
            .addCase(updateVehicle.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                state.loading = false;
                toast.success("Xe được cập nhật thành công!");
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message);
            })
    },
});

export default vehicleSlice.reducer;