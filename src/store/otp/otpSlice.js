import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as otpService from 'apis';
import { toast } from 'react-toastify';

export const apiSendOtpByPh = createAsyncThunk('otp/apiSendOtpByPh', async (destPhoneNumber) => {
  return await otpService.apiSendOtpByPhone(destPhoneNumber)
})

export const apivalidateOtpResetP = createAsyncThunk('otp/apivalidateOtpResetP', async (otp) => {
  return await otpService.apivalidateOtpResetPass(otp.otp,otp.phone)
})

export const apiResetP = createAsyncThunk('otp/apiResetP', async (data) => {
  return await otpService.apiResetPass(data.phone, data.confirmPassword)
})

const initialState = {
  isLoading: false,
  urlResetPass: '',
  phoneN: ''
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //send-otp
      .addCase(apiSendOtpByPh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(apiSendOtpByPh.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.code === "200") {
          state.phoneN = action.payload.phoneNumber
          toast.success(`Bạn đã gửi OTP thành công!`);
          // console.log(action.payload.message)
        }else{
          toast.error(`${action.payload.message}`);
        }
      })
      .addCase(apiSendOtpByPh.rejected, (state, action) => {
        state.isLoading = false
        toast.error(`${action.error.message}`);
      })
      //validateOtp
      .addCase(apivalidateOtpResetP.pending, (state) => {
        state.isLoading = true
      })
      .addCase(apivalidateOtpResetP.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.statusCode === 200) {
          state.urlResetPass = action.payload.data
          toast.success(`Xác thực OTP thành công!`);
        }else{
          toast.error(`${action.payload.message}`);
        }
      })
      .addCase(apivalidateOtpResetP.rejected, (state, action) => {
        state.isLoading = false
        toast.error(`${action.error.message}`);
      })
      //reset pass
      .addCase(apiResetP.pending, (state) => {
        state.isLoading = true
      })
      .addCase(apiResetP.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(apiResetP.rejected, (state, action) => {
        state.isLoading = false
        toast.error(`${action.error.message}`);
      })
  },
});

export default otpSlice.reducer;


