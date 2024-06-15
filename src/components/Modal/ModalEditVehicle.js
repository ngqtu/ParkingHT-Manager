import "assets/css/modalCommon.css"
import Loader from "components/Loader";
import Select from "components/inputs/Select";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicle } from "store/vehicle/vehicleSlice";
import { statusData } from "ultils/contants";
import icons from "ultils/icons"

const ModalEditVehicle = ({ open, onClose, dataVehicleEdit, handleUpdateTable }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;
    const { loading } = useSelector((state) => state.report);
    const [status, setStatus] = useState(dataVehicleEdit.delFlag);

    if (!open) return null;

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const handleEditVehicle = async (e) => {
        e.preventDefault();
        dispatch(updateVehicle({ ...dataVehicleEdit, delFlag: status }))
            .then((result) => {
                onClose();
                handleUpdateTable()
            })
            .catch((error) => {
                console.log(error)
            });
    };
    return (
        <>
            {loading && <Loader />}
            <div onClick={onClose} className='ModalCommonoverlay'>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className='ModalCommonmodalContainer'
                >
                    <form onSubmit={handleEditVehicle} className="ModalCommonForm">
                        <p className='closeBtn' onClick={onClose}>
                            <CloseIcon />
                        </p>
                        <div className="resetpasswordForm">
                            <p className="resetpasswordHeading">Cập nhật xe</p>
                            <Select
                                itemValue={dataVehicleEdit.delFlag}
                                options={statusData}
                                onChange={handleStatusChange}
                            />
                            <button type="submit" className="resetpasswordbtn">cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default memo(ModalEditVehicle)
