import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';

const ModalDetailsCategory = ({ open, onClose, dataInfo }) => {
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
                        <p className="tableformHeading hr">CHI TIẾT LOẠI XE</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                <p>Số chỗ: </p>
                                <p>Trạng thái: </p>
                                <p>Cập nhật thời gian: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                <p>{dataInfo.vehicleCategoryName}</p>
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

export default memo(ModalDetailsCategory)
