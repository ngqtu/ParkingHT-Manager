import "assets/css/resetPassword.css";
import { Loader } from "components";
import InputFieldPass from "components/inputs/inputFieldPass";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { apiResetP } from "store/otp/otpSlice";
import { validate } from "ultils/helpers";
import icons from "ultils/icons"
import path from "ultils/path"

const ResetPassword = () => {
  const { LockResetIcon } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [invalidFields, setInvalidFields] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const urlResetP = useSelector((state) => state.otp.urlResetPass);
  const { isLoading } = useSelector((state) => state.otp);

  const [payload, setPayload] = useState({
    password: '',
    confirmPassword: ''
  })

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordToggle2 = () => {
    setShowPassword2(!showPassword2);
  };

  function resetPass() {
    const invalids = validate(payload, setInvalidFields)
    if (invalids === 0) {
      console.log(urlResetP)
      const urlbasic = new URL(urlResetP);
      const phoneNumber = urlbasic.searchParams.get("phoneNumber");
      dispatch(apiResetP({ phone: phoneNumber, confirmPassword: payload.confirmPassword }))
        .then((result) => {
          if (result.payload?.statusCode === 200) {
            navigate(path.LOGIN);
            toast.success(`Đặt lại mật khẩu thành công!`);
          } else {
            toast.error(`${result.payload.message}`)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className="resetpassword">
        <div className="resetpasswordback">
          <Link to="/verifycode" className="resetpasswordbackLink">⇦ Back</Link>
        </div>
        <div className="resetpasswordForm">
          <div className="resetpasswordFormText">
            <p className="resetpasswordHeading">ĐẶT LẠI MẬT KHẨU</p>
            <LockResetIcon className="resetpasswordcheck" sx={{ fontSize: 60 }} />
          </div>
          <InputFieldPass
            nameKey='password'
            className='resetpasswordGroup'
            classNameInput='resetpasswordinput'
            showPassword={showPassword}
            onClick={handlePasswordToggle}
            value={payload.password}
            onChange={(e) => setPayload(prev => ({ ...prev, password: e.target.value }))}
            placeholder='Mật khẩu mới'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputFieldPass
            nameKey='confirmPassword'
            className='resetpasswordGroup'
            classNameInput='resetpasswordinput'
            showPassword={showPassword2}
            onClick={handlePasswordToggle2}
            value={payload.confirmPassword}
            onChange={(e) => setPayload(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder='Xác nhận mật khẩu'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <button onClick={resetPass} className="resetpasswordbtn">Đặt lại mật khẩu</button>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
