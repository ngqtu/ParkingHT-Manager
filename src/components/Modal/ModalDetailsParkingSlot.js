import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';
import CurrencyFormat from 'ultils/regex';

const ModalDetailsParkingSlot = ({ open, onClose, dataInfo }) => {
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
                        <p className="tableformHeading hr">CHI TIẾT BÃI ĐẬU XE</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                <p>Khu vực: </p>
                                <p>Tên ô: </p>
                                <p>Giá mỗi giờ: </p>
                                <p>Số chỗ: </p>
                                <p>Trạng thái hoạt động: </p>
                                <p>Cập nhật thời gian: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                <p>{dataInfo.area}</p>
                                <p>{dataInfo.name}</p>
                                <p><CurrencyFormat num={dataInfo.pricePerHour} /></p>
                                <p>{dataInfo.categoryName}</p>
                                <p>{dataInfo.delFlag ? "Không hoạt động" : "Hoạt động"}</p>
                                <p>{moment(dataInfo.updateTime).format('DD/MM/YYYY, h:mm:ss A')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalDetailsParkingSlot)
