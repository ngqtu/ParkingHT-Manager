import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';

const ModalDetailsUser = ({ open, onClose, dataInfo }) => {
    const { CloseIcon } = icons;
    if (!open) return null;
    return (
        <div onClick={onClose} className="ModalCommonoverlay">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="ModalCommonmodalContainer"
            >
                <div className="ModalCommonForm">
                    <p className="closeBtn" onClick={onClose}>
                        <CloseIcon />
                    </p>
                    <div className="resetpasswordForm">
                        <p className="tableformHeading hr">CHI TIẾT NGƯỜI DÙNG</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                <p>Tên: </p>
                                <p>Ngày sinh: </p>
                                <p>Số điện thoại: </p>
                                <p>E-mail: </p>
                                <p>Ngày tạo: </p>
                                <p>Vai trò: </p>
                                <p>Trạng thái: </p>
                                <p>Cập nhật thời gian: </p>
                                <p>Lần đăng nhập cuối: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                <p>{dataInfo.fullName}</p>
                                <p>{moment(dataInfo.birthday).format('DD/MM/YYYY')}</p>
                                <p>{dataInfo.phoneNumber}</p>
                                <p>{dataInfo.email}</p>
                                <p>{moment(dataInfo.createdDate).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{dataInfo.role}</p>
                                <p>{dataInfo.delFlag ? "Không hoạt động" : "Hoạt động"}</p>
                                <p>{dataInfo.updateTime == null ? "Chưa chỉnh sửa" : moment(dataInfo.updateTime).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{dataInfo.lastLogin === null ? "Chưa đăng nhập" : moment(dataInfo.lastLogin).format('DD/MM/YYYY, h:mm:ss A')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalDetailsUser)
