import { useCallback, useEffect, useState } from "react";
import "assets/css/userProfile.css"
import { Loader, ModalChangePass } from "components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { apiUpdateUser } from "apis";
import { toast } from "react-toastify";
import { fetchGetUserById } from "store/user/userSlide";
import InputField from "components/inputs/InputField";
import { validate } from "ultils/helpers";
import InputDate from "components/inputs/InputDate";

const UsersProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);
    const dispatch = useDispatch();
    const [isloading, setIsloading] = useState(false)
    const userinfo = useSelector((state) => state.user.current);
    const { token } = useSelector((state) => state.auth)
    const rolePemission = jwtDecode(token);


    const fetchData = useCallback(() => {
        try {
            dispatch(fetchGetUserById())
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const [payload, setPayload] = useState({
        fullName: '',
        birthday: '',
        email: ''
    })

    useEffect(() => {
        if (userinfo !== null) {
            setPayload({
                fullName: userinfo?.fullName,
                birthday: userinfo?.birthday,
                email: userinfo?.email,
            });
        }
    }, [userinfo]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            const birthdayValue = payload?.birthday;
            const formattedBirthday = moment(birthdayValue).format("YYYY-MM-DD");

            if (!moment(formattedBirthday, "YYYY-MM-DD", true).isValid()) {
                toast.error("Định dạng ngày sinh nhật không hợp lệ");
                return;
            }

            const updatedUser = {
                userId: userinfo.userId,
                fullName: payload.fullName,
                birthday: formattedBirthday,
                email: payload.email,
            };

            try {
                setIsloading(true)
                const res = await apiUpdateUser(userinfo.userId, updatedUser);
                if (res.statusCode === 200) {
                    fetchData();
                    toast.success("Cập nhật người dùng thành công!");
                    setIsloading(false)
                } else {
                    toast.error(`${res.message}`);
                    setIsloading(false)
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while updating the user.");
            }
            setIsloading(false)
        }
    };

    return (
        <>
            {isloading && <Loader />}
            <div className="userProfile">
                <h2 className="editUserTitle">Thông tin của tôi</h2>
                <div className="userProfileContainer">
                    <div className="userProfileCard">
                        <div className="userProfileBox">
                            <div className="userProfileContent">
                                <h2>{userinfo?.fullName} <br /><span>Manager Parking</span></h2>
                                <div className="userProfileInfo">
                                    <ul className="userProfileContact">
                                        <li><span>P</span> {userinfo?.phoneNumber}</li>
                                        <li><span>E</span> {userinfo?.email}</li>
                                        <li><span>B</span> {moment(userinfo?.birthday).format("DD/MM/YYYY")}</li>
                                    </ul>
                                </div>
                                {rolePemission.role !== "ADMIN" ? (
                                    <button onClick={() => setOpenModal(true)}>Đổi mật khẩu</button>
                                ) : ''}
                            </div>
                        </div>
                        <div className="userProfileCircle">
                            <div className="userProfileImgBx">
                                <img src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/06/ben-xe-da-nang-vntrip.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="userProfileUpdate">
                        <span className="userProfileUpdateTitle">Cập nhật thông tin</span>
                        <form onSubmit={handleUpdateUser} className="userProfileUpdateForm">
                            <div className="userProfileUpdateLeft">
                                <InputField
                                    nameKey='fullName'
                                    className="userProfileUpdateItem"
                                    classNameInput='userProfileUpdateInput'
                                    label="Tên"
                                    value={payload?.fullName}
                                    onChange={(e) => setPayload(prev => ({ ...prev, fullName: e.target.value }))}
                                    placeholder="Nhập tên của bạn"
                                    invalidFields={invalidFields}
                                    setInvalidFields={setInvalidFields}
                                    readOnlyInput={rolePemission.role === "ADMIN" ? true : false}
                                />
                                <div className="userProfileUpdateItem">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="number"
                                        defaultValue={userinfo?.phoneNumber}
                                        className="userProfileUpdateInput"
                                        name="phoneNumber"
                                        readOnly
                                    />
                                </div>
                                <InputField
                                    nameKey='email'
                                    className="userProfileUpdateItem"
                                    classNameInput='userProfileUpdateInput'
                                    label="E-mail"
                                    value={payload?.email}
                                    onChange={(e) => setPayload(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="Nhập E-mail"
                                    invalidFields={invalidFields}
                                    setInvalidFields={setInvalidFields}
                                    readOnlyInput={rolePemission.role === "ADMIN" ? true : false}
                                />
                                <InputDate
                                    nameKey='birthday'
                                    className="userProfileUpdateItem"
                                    classNameInput='userProfileUpdateInput'
                                    label="Ngày sinh"
                                    dateFormat="dd/MM/yyyy"
                                    value={payload.birthday ? new Date(payload.birthday) : null}
                                    onChange={(date) => {
                                        const formattedDate = date ? moment(date).format("YYYY-MM-DD") : "";
                                        setPayload(prev => ({ ...prev, birthday: formattedDate }));
                                    }}
                                    placeholder="Nhập ngày sinh"
                                    invalidFields={invalidFields}
                                    setInvalidFields={setInvalidFields}
                                    readOnlyInput={rolePemission.role === "ADMIN" ? true : false}
                                />
                            </div>
                            <div className="userProfileUpdateRight">
                                <div className="userProfileUpdateUpload">
                                    <img
                                        className="userProfileUpdateImg"
                                        src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/06/ben-xe-da-nang-vntrip.jpg"
                                        alt=""
                                    />
                                    <input type="file" id="file" className="userProfileUpdateInputFile" />
                                </div>
                                {rolePemission.role !== "ADMIN" && (
                                    <button type="submit" className="userProfileUpdateButton">
                                        Cập nhật
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ModalChangePass
                open={openModal}
                onClose={() => setOpenModal(false)} />
        </>
    )
}

export default UsersProfile
