import React, { memo, useEffect } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';
import CurrencyFormat from 'ultils/regex';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentById } from 'store/booking/bookingSlice';
import Loader from 'components/Loader';

const ModalDetailsPayment = ({ open, onClose, dataPayment }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;

    const { getpayment, loading } = useSelector((state) => state.booking);

    useEffect(() => {
        if (open) {
            dispatch(fetchPaymentById(dataPayment));
        }
    }, [dispatch, dataPayment, open]);

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
                            <p className="tableformHeading hr">CHI TIẾT THANH TOÁN</p>

                            <div className='tableDetail'>
                                <div className='tableLeft col-sm-4'>
                                    <p>Mã giao dịch: </p>
                                    <p>Trạng thái: </p>
                                    <p>Phương thức thanh toán: </p>
                                    <p>Ngày tạo: </p>
                                    <p>Tổng tiền: </p>
                                </div>
                                <div className='tableRight col-sm-8'>
                                    <p>{getpayment?.transaction_Id}</p>
                                    <p>{getpayment?.status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                                    <p>{getpayment?.payment_Method}</p>
                                    <p>{moment(getpayment?.create_Time).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                    <p><CurrencyFormat num={(getpayment?.total_Price)/100} /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ModalDetailsPayment)
