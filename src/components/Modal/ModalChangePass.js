import { apiChangePassUser } from "apis";
import "assets/css/modalCommon.css"
import Loader from "components/Loader";
import InputFieldPass from "components/inputs/inputFieldPass";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetUserById } from "store/user/userSlide";
import { validate } from "ultils/helpers";
import icons from "ultils/icons"

const ModalChangePass = ({ open, onClose }) => {
    const { CloseIcon, LockResetIcon } = icons;
    const [invalidFields, setInvalidFields] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isloading, setIsloading] = useState(false)
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state.user.current);
    const [payload, setPayload] = useState({
        oldPass: '',
        password: '',
        confirmPassword: ''
    })

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };
    const handlePasswordToggle1 = () => {
        setShowPassword1(!showPassword1);
    };
    const handlePasswordToggle2 = () => {
        setShowPassword2(!showPassword2);
    };

    useEffect(() => {
        dispatch(fetchGetUserById())
    }, [dispatch]);

    const handleReset = () => {
        setPayload({
            oldPass: '',
            password: '',
            confirmPassword: ''
        })
    }

    const handleChangePass = async (e) => {
        e.preventDefault();
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            try {
                const changePassNew = {
                    oldPass: payload.oldPass,
                    newPass: payload.password
                }
                setIsloading(true)
                const res = await apiChangePassUser(userinfo.userId, changePassNew);
                if (res.statusCode === 200) {
                    handleReset();
                    onClose();
                    toast.success('Đã đổi mật khẩu thành công!');
                    setIsloading(false)
                } else {
                    toast.error(`${res.message}`)
                    setIsloading(false)
                }
            } catch (err) {
                if (!err?.response) {
                    toast.error('No Server Response');
                } else if (err.response?.status === 400) {
                    toast.error('Mật khẩu cũ sai');
                } else {
                    toast.error("An error occurred while changing the password.");
                }
                console.clear();
            }
            setIsloading(false)
        }
    };
    if (!open) return null;
    return (
        <>
            {isloading && <Loader />}
            <div onClick={onClose} className='ModalCommonoverlay'>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className='ModalCommonmodalContainer'
                >
                    <div className="ModalCommonForm">
                        <p className='closeBtn' onClick={onClose}>
                            <CloseIcon />
                        </p>
                        <form onSubmit={handleChangePass} className="resetpasswordForm">
                            <div className="resetpasswordFormText">
                                <p className="resetpasswordHeading">ĐỔI MẬT KHẨU</p>
                                <LockResetIcon className="resetpasswordcheck" fontSize="large" />
                            </div>
                            <InputFieldPass
                                nameKey='oldPass'
                                className='resetpasswordGroup'
                                classNameInput='resetpasswordinput'
                                showPassword={showPassword1}
                                onClick={handlePasswordToggle1}
                                value={payload.oldPass}
                                onChange={(e) => setPayload(prev => ({ ...prev, oldPass: e.target.value }))}
                                placeholder='Mật khẩu cũ'
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
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
                            <button type="submit" className="resetpasswordbtn">Đổi mật khẩu</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalChangePass
