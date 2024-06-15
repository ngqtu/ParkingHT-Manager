import "assets/css/modalCommon.css"
import Loader from "components/Loader";
import Select from "components/inputs/Select";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRoleUser } from "store/user/userSlide";
import { roleUserData, statusData } from "ultils/contants";
import icons from "ultils/icons"

const ModalEditUser = ({ open, onClose, dataUserEdit, handleTableU }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;
    const [status, setStatus] = useState(dataUserEdit.delFlag);
    const [role, setRole] = useState(dataUserEdit.role)
    const { loading } = useSelector((state) => state.user);

    if (!open) return null;

    const handleRoleChange = (value) => {
        setRole(value);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const handleEditRole = async (e) => {
        e.preventDefault();

        const updateRoleU = {
            userId: dataUserEdit.userId,
            role: role || dataUserEdit.role,
            delFlag: status || dataUserEdit.delFlag
        }
        dispatch(updateRoleUser(updateRoleU))
            .then((result) => {
                onClose();
                handleTableU()
            })
            .catch((error) => {
                console.log(error)
            });
    };

    return (
        <>
            {loading && <Loader />}
            <div onClick={onClose} className='ModalCommonoverlay'>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className='ModalCommonmodalContainer'
                >
                    <form onSubmit={handleEditRole} className="ModalCommonForm">
                        <p className='closeBtn' onClick={onClose}>
                            <CloseIcon />
                        </p>
                        <div className="resetpasswordForm">
                            <p className="resetpasswordHeading">Cập nhật người dùng</p>
                            {
                                dataUserEdit.delFlag === false ? (
                                    <Select
                                        itemValue={dataUserEdit.role}
                                        options={roleUserData}
                                        onChange={handleRoleChange}
                                    />
                                ) : (
                                    <Select
                                        itemValue={dataUserEdit.delFlag}
                                        options={statusData}
                                        onChange={handleStatusChange}
                                    />
                                )
                            }
                            <button className="resetpasswordbtn">Lưu thay đổi</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default memo(ModalEditUser)
