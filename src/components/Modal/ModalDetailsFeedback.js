import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateFeedback } from 'store/feedback/feedbackSlice';

const ModalDetailsFeedback = ({ open, onClose, dataInfo }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;

    const handleCloseModal = () => {
        dispatch(updateFeedback({
            feedbackId: dataInfo.report.reportId,
            content: dataInfo.content,
            rankStar: dataInfo.rankStar
        }))
        onClose()
    }

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
                    <p className="closeBtn" onClick={handleCloseModal}>
                        <CloseIcon />
                    </p>
                    <div className="resetpasswordForm">
                        <p className="tableformHeading hr">CHI TIẾT PHẢN HỒI</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                <p>Tài khoản: </p>
                                <p>Điện thoại: </p>
                                <p>Đánh giá sao: </p>
                                <p>ReportID: </p>
                                {dataInfo.report.managerId === null ? "" :
                                    <p>ManagerID: </p>
                                }
                                <p>Ngày tạo: </p>
                                <p>Trạng thái: </p>
                                <p>Nội dung: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                <p>{dataInfo.report.user.fullName}</p>
                                <p>{dataInfo.report.user.phoneNumber}</p>
                                <p>{dataInfo.rankStar}</p>
                                <p>{dataInfo.report.reportId}</p>
                                {dataInfo.report.managerId === null ? "" :
                                    <p>{dataInfo.report.managerId}</p>
                                }
                                <p>{moment(dataInfo.createDate).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{dataInfo.isFeedback === 1 ? "Phản hồi" : "Chưa"}</p>
                                <p>{dataInfo.content !== null ? dataInfo.content : 'Không có ý kiến'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalDetailsFeedback)
