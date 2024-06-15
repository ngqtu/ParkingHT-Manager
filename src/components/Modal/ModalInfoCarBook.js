import React, { memo, useEffect } from 'react';
import icons from 'ultils/icons';
import "assets/css/modalCommon.css";
import { fetchBookingById } from 'store/booking/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Loader from 'components/Loader';

const ModalInfoCarBook = ({ open, onClose, dataInfo }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;
    const { getbooking, loading } = useSelector((state) => state.booking);

    useEffect(() => {
        if (open) {
            dispatch(fetchBookingById(dataInfo));
        }
    }, [dispatch, dataInfo, open]);

    if (!open) return null;

    return (
        <>
            {loading && <Loader />}
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
                            <p className="tableformHeading hr">THÔNG TIN CHI TIẾT XE ĐỖ</p>

                            <div className='tableDetail'>
                                <div className='tableLeft col-sm-4'>
                                    <p>Biển số xe: </p>
                                    <p>Chủ xe: </p>
                                    <p>Điện thoại: </p>
                                    <p>Loại xe: </p>
                                    <p>Ngày bắt đầu: </p>
                                    <p>Ngày kết thúc: </p>
                                </div>
                                <div className='tableRight col-sm-8'>
                                    <p>{getbooking?.vehicle.plateNumber}</p>
                                    <p>{getbooking?.vehicle.user.fullName}</p>
                                    <p>{getbooking?.vehicle.user.phoneNumber}</p>
                                    <p>{getbooking?.vehicle.vehicleCategory.vehicleCategoryName} chỗ</p>
                                    <p>{moment(getbooking?.start_Date).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                    <p>{moment(getbooking?.end_Date).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(ModalInfoCarBook);