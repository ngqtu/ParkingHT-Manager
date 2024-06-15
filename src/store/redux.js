import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/authSlice';
import categorySlice from './category/categorySlice';
import storage from 'redux-persist/lib/storage';
import { 
  persistReducer, 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import reportSlice from './report/reportSlice';
import feedbackSlice from './feedback/feedbackSlice';
import vehicleSlice from './vehicle/vehicleSlice';
import parkingslotSlice from './parkingslot/parkingslotSlice';
import userSlide from './user/userSlide';
import dashboardSlice from './dashboard/dashboardSlice';
import bookingSlice from './booking/bookingSlice';
import otpSlice from './otp/otpSlice';


const commonConfig = {
  key: 'root/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isAuthenticated', 'token']
}

export const redux = configureStore({
  reducer: {
    auth: persistReducer(userConfig, authSlice),
    category: categorySlice,
    report: reportSlice,
    feedback: feedbackSlice,
    vehicle: vehicleSlice,
    parkingslot: parkingslotSlice,
    user: userSlide,
    dashboard: dashboardSlice,
    booking: bookingSlice,
    otp: otpSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})


export const persistor =  persistStore(redux)
