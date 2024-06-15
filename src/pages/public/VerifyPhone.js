import "assets/css/verify.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import icons from "ultils/icons";
import path from "ultils/path";
import InputField from "components/inputs/InputField";
import { validate } from "ultils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { apiSendOtpByPh } from "store/otp/otpSlice";
import { Loader } from "components";

const VerifyPhone = () => {
    const { PhoneIcon } = icons;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [invalidFields, setInvalidFields] = useState([]);
    const { isLoading } = useSelector((state) => state.otp);
    const [payload, setPayload] = useState({
        phoneNumber: ''
    })

    const sendOTPSMS = async () => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            const destPhoneNumber = payload.phoneNumber
            dispatch(apiSendOtpByPh(destPhoneNumber))
                .then((result) => {
                    if (result.payload?.status === "DELIVERED") {
                        navigate("/" + path.VERIFY);
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
            <div className="verify">
                <div className="verifyback">
                    <Link to={path.LOGIN} className="verifybackLink">⇦ Back</Link>
                </div>
                <div className="verifyForm">
                    <p className="verifyHeading">XÁC MINH SỐ ĐIỆN THOẠI CỦA BẠN</p>
                    <PhoneIcon className="verifycheck" sx={{ fontSize: 60 }} />
                    <InputField
                        nameKey='phoneNumber'
                        className='verifyboxGroup'
                        type='number'
                        value={payload.phoneNumber}
                        onChange={(e) => setPayload(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        placeholder="Nhập số điện thoại"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <button
                        onClick={sendOTPSMS}
                        className="verifybtn1"
                    >
                        Gửi mã qua SMS
                    </button>
                </div>
            </div>
        </>
    );
}

export default VerifyPhone;