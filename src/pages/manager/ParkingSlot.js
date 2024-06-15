import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import icons from 'ultils/icons'
import _, { debounce } from "lodash"
import { apiDeleteParkingSlot, apiParkingSlot } from 'apis';
import CurrencyFormat from 'ultils/regex';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Loader, ModalAddParkingSlot, ModalDetailsParkingSlot, ModalEditParkingSlot } from 'components';

const ParkingSlot = () => {
    const { AddIcon, EditOutlinedIcon, DeleteOutlineIcon, ContentPasteSearchIcon } = icons
    const [listParkingSlot, setlistParkingSlot] = useState([]);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [dataParkingSlotEdit, setdataParkingSlotEdit] = useState({});
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [isloading, setIsloading] = useState(false)

    const getAllParkingSlot = async () => {
        setIsloading(true)
        let res = (await apiParkingSlot()) ?? {};
        if (res && res.data) {
            const tableData = res.data?.map((item, index) => ({ ...item, id: index + 1 })).sort((a, b) => a.delFlag - b.delFlag);
            setlistParkingSlot(tableData);
        }
        setIsloading(false)
    }

    const handleSearch = debounce((e) => {
        let term = e.target.value;
        if (term) {
            let clonelistParkingSlot = _.cloneDeep(listParkingSlot);
            clonelistParkingSlot = clonelistParkingSlot.filter(item =>
                item.area.toLowerCase().includes(term.toLowerCase()) ||
                item.name.toLowerCase().includes(term.toLowerCase()) ||
                item.parkingSlotId.toLowerCase().includes(term.toLowerCase())
            );
            setlistParkingSlot(clonelistParkingSlot);
        } else {
            getAllParkingSlot();
        }
    }, 500);

    useEffect(() => {
        getAllParkingSlot();
    }, []);

    const handleUpdateTable = () => {
        getAllParkingSlot();
    };
    const handleEditParkingSlot = (parkingslot) => {
        setdataParkingSlotEdit(parkingslot);
        setOpenModalEdit(true);
    }

    const handleDeleteParkingSlot = (psid) => {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn đã sẵn sàng ngừng sử dụng chỗ đậu xe này chưa?",
            showCancelButton: true,
            confirmButtonColor: '#02aab0'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsloading(true)
                const res = await apiDeleteParkingSlot(psid);
                if (res.statusCode === 200) {
                    getAllParkingSlot();
                    toast.success("Chỗ đậu xe được tắt hoạt động thành công!");
                } else toast.error(res.message);
                setIsloading(false)
            }
        })
    }

    const handleDetails = (info) => {
        setdataParkingSlotEdit(info);
        setOpenModalDetail(true);
    }

    const columns = [
        { field: 'id', headerName: '#', width: 90 },
        { field: 'area', headerName: 'KHU VỰC', width: 150 },
        { field: 'name', headerName: 'TÊN Ô', width: 150 },
        {
            field: 'pricePerHour', headerName: 'GIÁ MỖI GIỜ', width: 150, renderCell: (params) => {
                return (
                    <CurrencyFormat num={params.row.pricePerHour} />
                )
            }
        },
        {
            field: 'delFlag', headerName: 'TRẠNG THÁI HOẠT ĐỘNG', width: 180, renderCell: (params) => {
                return (
                    <>
                        {params.row.delFlag ? (
                            <span className="tableStatusText TextSecond">KHÔNG HOẠT ĐỘNG</span>
                        ) : (
                            <span className="tableStatusText">HOẠT ĐỘNG</span>
                        )}
                    </>
                )
            }
        },
        {
            field: 'action', headerName: 'CHỈNH SỬA', width: 100, renderCell: (params) => {
                return (
                    <>
                        {params.row.delFlag === true ? (
                            <div>
                                <span onClick={() => handleDetails(params.row)}><ContentPasteSearchIcon className='tableListDetail' /></span>
                                <span onClick={() => handleEditParkingSlot(params.row)}><EditOutlinedIcon className="tableListEdit" /></span>
                            </div>
                        ) : (
                            <div>
                                <span onClick={() => handleDetails(params.row)}><ContentPasteSearchIcon className='tableListDetail' /></span>
                                <span onClick={() => handleEditParkingSlot(params.row)}><EditOutlinedIcon className="tableListEdit" /></span>
                                <span onClick={() => handleDeleteParkingSlot(params.row.parkingSlotId)}><DeleteOutlineIcon className="tableListDelete" /></span>
                            </div>
                        )}
                    </>

                )
            }
        }
    ];

    return (
        <>
            {isloading && <Loader />}
            <div className="tableList">
                <h2 className="tableListTitle">Quản lý chỗ đỗ xe</h2>
                <div className="tableListBoxContainer">
                    <div className="tableListinput-container">
                        <input type="text"
                            className="input"
                            onChange={(e) => handleSearch(e)}
                            placeholder="TÌM KIẾM..." />
                        <span className="icon">
                            <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path opacity="1" d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path opacity="1" d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path opacity="1" d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                    <button type="button" onClick={() => setOpenModal(true)}><AddIcon className="tableCreateIcon" /><span>TẠO MỚI</span></button>
                </div>
                <DataGrid
                    rows={listParkingSlot}
                    columns={columns}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 6 },
                        }
                    }}
                />
            </div>
            <ModalAddParkingSlot
                open={openModal}
                onClose={() => setOpenModal(false)}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditParkingSlot
                open={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                dataParkingSlotEdit={dataParkingSlotEdit}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalDetailsParkingSlot
                open={openModalDetail}
                onClose={() => setOpenModalDetail(false)}
                dataInfo={dataParkingSlotEdit}
            />
        </>
    )
}

export default ParkingSlot
