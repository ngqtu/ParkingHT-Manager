import "assets/css/modalCommon.css";
import Loader from "components/Loader";
import InputField from "components/inputs/InputField";
import Select from "components/inputs/Select";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "store/category/categorySlice";
import { statusData } from "ultils/contants";
import { validate } from "ultils/helpers";
import icons from "ultils/icons";

const ModalEditCategory = ({ open, onClose, handleUpdateTable, dataCategoryEdit }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;
    const [status, setStatus] = useState(dataCategoryEdit.delFlag);
    const { loading } = useSelector((state) => state.category);
    const [invalidFields, setInvalidFields] = useState([]);
    const [category, setCategory] = useState({
        vehicleCategoryName: ""
    });

    useEffect(() => {
        if (open) {
            setCategory({
                vehicleCategoryName: dataCategoryEdit.vehicleCategoryName
            });
        }
    }, [open, dataCategoryEdit]);

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const handleEditCategory = async (e) => {
        e.preventDefault();
        const invalids = validate(category, setInvalidFields)
        if (invalids === 0) {
            const updatedCategory = {
                vehicleCategoryId: dataCategoryEdit.vehicleCategoryId,
                vehicleCategoryName: category.vehicleCategoryName || dataCategoryEdit.vehicleCategoryName,
                delFlag: status || dataCategoryEdit.delFlag
            };
            dispatch(updateCategory(updatedCategory))
                .then((result) => {
                    onClose();
                    handleUpdateTable()
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    };

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
                    <form onSubmit={handleEditCategory} className="ModalCommonForm">
                        <p className="closeBtn" onClick={onClose}>
                            <CloseIcon />
                        </p>
                        <div className="resetpasswordForm">
                            <p className="tableformHeading">Cập nhật loại xe</p>
                            {
                                dataCategoryEdit.delFlag === false ? (
                                    <InputField
                                        nameKey='vehicleCategoryName'
                                        className='inputGroup'
                                        classNameInput='resetpasswordinput'
                                        value={category.vehicleCategoryName}
                                        onChange={(e) => setCategory(prev => ({ ...prev, vehicleCategoryName: e.target.value }))}
                                        placeholder="Tên loại xe"
                                        invalidFields={invalidFields}
                                        setInvalidFields={setInvalidFields}
                                    />
                                ) : (
                                    <Select
                                        itemValue={dataCategoryEdit.delFlag}
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

export default memo(ModalEditCategory);