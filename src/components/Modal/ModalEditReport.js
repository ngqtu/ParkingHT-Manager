import "assets/css/modalCommon.css"
import Loader from "components/Loader";
import Select from "components/inputs/Select";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReport } from "store/report/reportSlice";
import { statusReportData } from "ultils/contants";
import icons from "ultils/icons"

const ModalEditReport = ({ open, onClose, dataReportEdit, handleUpdateTable }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;
    const { loading } = useSelector((state) => state.report);
    const [processingStatus, setProcessingStatus] = useState(dataReportEdit.processingStatus);

    if (!open) return null;

    const handleStatusChange = (value) => {
        setProcessingStatus(value);
    };

    const handleEditReport = async (e) => {
        e.preventDefault();
        dispatch(updateReport({ ...dataReportEdit, processingStatus }))
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
                    <form onSubmit={handleEditReport} className="ModalCommonForm">
                        <p className='closeBtn' onClick={onClose}>
                            <CloseIcon />
                        </p>
                        <div className="resetpasswordForm">
                            <p className="resetpasswordHeading">Cập nhật đánh giá</p>
                            <Select
                                itemValue={dataReportEdit.processingStatus}
                                options={statusReportData}
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

export default memo(ModalEditReport)
