import React, { memo, useState } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';
import CurrencyFormat from 'ultils/regex';
import ModalDetailsPayment from './ModalDetailsPayment';
import ModalInfoParkingSlot from './ModalInfoParkingSlot';

const ModalDetailsBooking = ({ open, onClose, dataInfo }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalParking, setOpenModalParking] = useState(false);
    const [dataParking, setDataParking] = useState({});
    const [dataPayment, setdataPayment] = useState("");
    const { CloseIcon } = icons;
    if (!open) return null;

    const handlePayment = () => {
        setdataPayment(dataInfo.booking_Id);
        setOpenModal(true);
    }
    const handleParkingSlot = (data) => {
        setOpenModalParking(true)
        setDataParking(data)
    }
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
                            <p className="tableformHeading hr">CHI TIẾT ĐẶT CHỖ</p>

                            <div className='tableDetail'>
                                <div className='tableLeft col-sm-4'>
                                    <p>Mã đặt chỗ: </p>
                                    <p>Biển số xe: </p>
                                    <p>Điện thoại: </p>
                                    <p>Mã chỗ đỗ xe: </p>
                                    <p>Ngày bắt đầu: </p>
                                    <p>Ngày kết thúc: </p>
                                    <p>Ngày tạo: </p>
                                    <p>Trạng thái: </p>
                                    <p>Tổng tiền: </p>
                                    <p>Khi vào: </p>
                                    <p>Khi ra: </p>
                                    <p>Cập nhật thời gian: </p>
                                </div>
                                <div className='tableRight col-sm-8'>
                                    {dataInfo.booking_Status === "COMPLETED" ? (
                                        <p className='bookingIDText' onClick={() => handlePayment()}>{dataInfo.booking_Id}</p>
                                    ) : (
                                        <p>{dataInfo.booking_Id}</p>
                                    )}
                                    <p>{dataInfo.vehicle.plateNumber}</p>
                                    <p>{dataInfo.vehicle.user.phoneNumber}</p>
                                    {dataInfo.booking_Status === "COMPLETED" ? (
                                        <p className='bookingIDText' onClick={() => handleParkingSlot(dataInfo)}>{dataInfo.parkingSlot.parkingSlotId}</p>
                                    ) : (
                                        <p>{dataInfo.parkingSlot.parkingSlotId}</p>
                                    )}
                                    <p>{moment(dataInfo.start_Date).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                    <p>{moment(dataInfo.end_Date).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                    <p>{moment(dataInfo.create_Date).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                    <p>{dataInfo.booking_Status === "ONGOING"
                                        ? 'ĐANG ĐẶT CHỖ' : dataInfo.booking_Status === "COMPLETED"
                                            ? 'HOÀN THÀNH' : dataInfo.booking_Status === "CANCELED"
                                                ? 'ĐÃ HỦY' : ''
                                    }</p>
                                    <p><CurrencyFormat num={dataInfo.booking_Total} /></p>
                                    <p>{dataInfo.checkin_Time === null ? "Chưa kiểm tra" : moment(dataInfo.checkin_Time).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                    <p>{dataInfo.checkout_Time === null ? "Chưa kiểm tra" : moment(dataInfo.checkout_Time).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                    <p>{moment(dataInfo.updateTime).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalDetailsPayment
                open={openModal}
                onClose={() => setOpenModal(false)}
                dataPayment={dataPayment}
            />
            <ModalInfoParkingSlot
                open={openModalParking}
                onClose={() => setOpenModalParking(false)}
                dataInfoP={dataParking}
            />
        </>
    )
}

export default memo(ModalDetailsBooking)
