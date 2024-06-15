import React, { memo } from 'react';
import icons from 'ultils/icons';
import "assets/css/modalCommon.css";

const ModalInfoParkingSlot = ({ open, onClose, dataInfoP }) => {
    const { CloseIcon } = icons;
    if (!open) return null;

    return (
        <>
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
                            <p className="tableformHeading hr">THÔNG TIN CHI TIẾT CHỖ ĐỖ XE</p>

                            <div className='tableDetail'>
                                <div className='tableLeft col-sm-4'>
                                    <p>Loại chỗ: </p>
                                    <p>Khu vực: </p>
                                    <p>Tên ô: </p>
                                </div>
                                <div className='tableRight col-sm-8'>
                                    <p>{dataInfoP.parkingSlot.categoryName} chỗ</p>
                                    <p>{dataInfoP.parkingSlot.area}</p>
                                    <p>{dataInfoP.parkingSlot.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(ModalInfoParkingSlot);