import { apiAddParkingSlot } from "apis";
import "assets/css/modalCommon.css"
import Loader from "components/Loader";
import InputField from "components/inputs/InputField";
import SelectCategory from "components/inputs/SelectCategory";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllCategoriesD } from "store/category/categorySlice";
import { validate } from "ultils/helpers";
import icons from "ultils/icons"

const ModalAddParkingSlot = ({ open, onClose, handleUpdateTable }) => {
    const { CloseIcon } = icons;
    const [invalidFields, setInvalidFields] = useState([]);
    const dispatch = useDispatch();
    const { listCategoryD } = useSelector((state) => state.category);
    const [isloading, setIsloading] = useState(false)
    const [parkingSlot, setparkingSlot] = useState({
        area: '',
        name: '',
        pricePerHour: '',
        vehicleCategory: ''
    })

    useEffect(() => {
        dispatch(fetchAllCategoriesD());
    }, [dispatch]);
    if (!open) return null;

    const handleReset = () => {
        setparkingSlot({
            area: '',
            name: '',
            pricePerHour: '',
            vehicleCategory: ''
        })
    }

    if (parkingSlot.vehicleCategory === "" || !parkingSlot.vehicleCategory.length > 0) {
        setparkingSlot(prev => ({ ...prev, vehicleCategory: listCategoryD[0].vehicleCategoryId }))
    }

    const handleAddParkingSlot = async (e) => {
        e.preventDefault();
        const invalids = validate(parkingSlot, setInvalidFields)
        if (invalids === 0) {
            try {
                setIsloading(true)
                const res = await apiAddParkingSlot(parkingSlot);
                if (res.statusCode === 200) {
                    handleReset();
                    onClose();
                    handleUpdateTable();
                    toast.success("Chỗ đậu xe được tạo mới thành công!");
                    setIsloading(false)
                }
            } catch (err) {
                // Handle error
                if (!err?.response) {
                    toast.error('Không có phản hồi của máy chủ');
                } else if (err.response?.status === 400) {
                    toast.error(`Tên trùng lặp trong một khu vực!`)
                } else if (err.response?.status === 401) {
                    toast.error('Không được phép!');
                } else {
                    toast.error("Chỗ đậu xe được tạo mới thất bại!")
                }
                console.clear();
            }
            setIsloading(false)
        }
    };



    return (
        <>
            {isloading && <Loader />}
            <div onClick={onClose} className='ModalCommonoverlay'>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className='ModalCommonmodalContainer'
                >
                    <form onSubmit={handleAddParkingSlot} className="ModalCommonForm">
                        <p className='closeBtn' onClick={onClose}>
                            <CloseIcon />
                        </p>
                        <div className="resetpasswordForm">
                            <p className="tableformHeading">TẠO CHỖ ĐẬU XE</p>
                            <InputField
                                nameKey='area'
                                className='inputGroup'
                                classNameInput='resetpasswordinput'
                                value={parkingSlot.area}
                                onChange={(e) => setparkingSlot(prev => ({ ...prev, area: e.target.value }))}
                                placeholder="Area //Ex: Đường số 1"
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <InputField
                                nameKey='name'
                                className='inputGroup'
                                classNameInput='resetpasswordinput'
                                value={parkingSlot.name}
                                onChange={(e) => setparkingSlot(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Name //Ex: 101"
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <InputField
                                type='number'
                                nameKey='pricePerHour'
                                className='inputGroup'
                                classNameInput='resetpasswordinput'
                                value={parkingSlot.pricePerHour}
                                onChange={(e) => setparkingSlot(prev => ({ ...prev, pricePerHour: e.target.value }))}
                                placeholder="Price Per Hour //Ex: 14000"
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <SelectCategory
                                options={listCategoryD}
                                onChange={(e) => setparkingSlot(prev => ({ ...prev, vehicleCategory: e.target.value }))}
                            />
                            <button type="submit" className="resetpasswordbtn">Lưu thay đổi</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default memo(ModalAddParkingSlot)
