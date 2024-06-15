import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { Login, Dashboard, Verify, ResetPassword, VerifyPhone, PaymentSuccess, PaymentFail } from './pages/public';
import path from './ultils/path';


function App() {
  return (
    <div>
      <Routes>    
        <Route path={path.LOGIN} element={<Login />} />   
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path={path.VERIFY} element={<Verify />} />
        <Route path={path.VERIFYPHONE} element={<VerifyPhone />} />
        <Route path={path.RESETPASSWORD} element={<ResetPassword />} />
        <Route path={path.PAYMENTSUCCESS} element={<PaymentSuccess />} />
        <Route path={path.PAYMENTFAIL} element={<PaymentFail />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
