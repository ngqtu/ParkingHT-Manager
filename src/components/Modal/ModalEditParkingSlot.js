import { apiEditParkingSlot } from "apis";
import "assets/css/modalCommon.css";
import Loader from "components/Loader";
import Select from "components/inputs/Select";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { statusData } from "ultils/contants";
import icons from "ultils/icons";

const ModalEditParkingSlot = ({ open, onClose, handleUpdateTable, dataParkingSlotEdit }) => {
    const { CloseIcon } = icons;
    const [isloading, setIsloading] = useState(false)
    const [status, setStatus] = useState(dataParkingSlotEdit.delFlag);
    const [parkingSlot, setParkingSlot] = useState({
        pricePerHour: "",
    });
    const handleStatusChange = (value) => {
        setStatus(value);
    };

    useEffect(() => {
        if (open) {
            setParkingSlot({
                pricePerHour: dataParkingSlotEdit.pricePerHour
            });
        }
    }, [open, dataParkingSlotEdit]);

    const handleEditParkingSlot = async (e) => {
        e.preventDefault();
        try {
            const updateParkingS = {
                parkingSlotId: dataParkingSlotEdit.parkingSlotId,
                area: dataParkingSlotEdit.area,
                name: dataParkingSlotEdit.name,
                pricePerHour: parkingSlot.pricePerHour || dataParkingSlotEdit.pricePerHour,
                vehicleCategory: dataParkingSlotEdit.categoryName,
                delFlag: status || dataParkingSlotEdit.delFlag
            }
            setIsloading(true)
            const res = await apiEditParkingSlot(updateParkingS);

            if (res?.statusCode === 200) {
                onClose();
                handleUpdateTable();
                toast.success(`Chỗ đậu xe được cập nhật thành công!`);
                setIsloading(false)
            }
        } catch (err) {
            // Handle error
            if (!err?.response) {
                toast.error('Không có phản hồi của máy chủ');
            } else if (err.response?.status === 400) {
                toast.error(`${err.response?.data.detail}`)
            } else if (err.response?.status === 401) {
                toast.error('Không được phép!');
            } else {
                toast.error("Chỗ đậu xe được cập nhật thất bại!")
            }
            console.clear();
        }
        setIsloading(false)

    };
    if (!open) return null;
    return (
        <>
            {isloading && <Loader />}
            <div onClick={onClose} className="ModalCommonoverlay">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="ModalCommonmodalContainer"
                >
                    <form onSubmit={handleEditParkingSlot} className="ModalCommonForm">
                        <p className="closeBtn" onClick={onClose}>
                            <CloseIcon />
                        </p>
                        <div className="resetpasswordForm">
                            <p className="tableformHeading">Cập nhật chỗ đậu xe</p>

                            {
                                dataParkingSlotEdit.delFlag === false ? (
                                    <div style={{ marginBottom: '20px' }}>
                                        <div className="inputGroup">
                                            <input
                                                type="number"
                                                className="resetpasswordinput"
                                                value={parkingSlot.pricePerHour}
                                                onChange={(e) => setParkingSlot(prev => ({ ...prev, pricePerHour: e.target.value }))}
                                                placeholder="Price Per Hour //Ex: 14000"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <Select
                                        itemValue={dataParkingSlotEdit.delFlag}
                                        options={statusData}
                                        onChange={handleStatusChange}
                                    />
                                )
                            }
                            <button type="submit" className="resetpasswordbtn">
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default memo(ModalEditParkingSlot);