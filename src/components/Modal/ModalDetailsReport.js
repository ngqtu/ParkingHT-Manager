import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';
import { getTokenInfo } from 'ultils/AuthHeader';

const ModalDetailsReport = ({ open, onClose, dataInfo }) => {
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
                        <p className="tableformHeading hr">Chi tiết đánh giá</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                {dataInfo.vehiclePlateNumber !== "" && dataInfo.vehiclePlateNumber.length > 0
                                    ? <p>Biển số xe: </p> : ''
                                }
                                <p>Tài khoản: </p>
                                <p>Điện thoại: </p>
                                <p>Ngày tạo: </p>
                                <p>Ngày xử lý: </p>
                                <p>Trạng thái xử lý: </p>
                                <p>Cập nhật thời gian: </p>
                                {getTokenInfo().role === "ADMIN" && (dataInfo.managerId === null || (
                                    <p>ManagerID: </p>
                                ))}
                                <p>Nội dung: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                {dataInfo.vehiclePlateNumber !== "" && dataInfo.vehiclePlateNumber.length > 0
                                    ? <p>{dataInfo.vehiclePlateNumber}</p> : ''
                                }
                                <p>{dataInfo.user.fullName}</p>
                                <p>{dataInfo.user.phoneNumber}</p>
                                <p>{moment(dataInfo.createDate).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{dataInfo.processingDate !== null
                                    ? moment(dataInfo.processingDate).format('DD/MM/YYYY, h:mm:ss A')
                                    : 'Chưa được xử lý'
                                }</p>
                                <p>{dataInfo.processingStatus === 1 ? "Đã xử lý" : "Đang xử lý"}</p>
                                <p>{moment(dataInfo.updateTime).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                {getTokenInfo().role === "ADMIN" && (dataInfo.managerId === null || (
                                    <p>{dataInfo.managerId}</p>
                                ))}
                                <p>{dataInfo.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalDetailsReport)
