import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import _ from "lodash"
import icons from 'ultils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehicle, fetchVehicle } from 'store/vehicle/vehicleSlice';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Loader, ModalDetailsVehicle, ModalEditVehicle } from 'components';
import { jwtDecode } from 'jwt-decode';

const VehicleList = () => {
    const { DeleteOutlineIcon, ContentPasteSearchIcon, EditOutlinedIcon } = icons
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [dataDetail, setdataDetail] = useState({});
    const [dataEdit, setdataEdit] = useState({});
    const listVehicle = useSelector((state) => state.vehicle.list);
    const { loading } = useSelector((state) => state.vehicle);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredvehicle, setFilteredvehicle] = useState([]);
    const { token } = useSelector(
        (state) => state.auth
    )
    const userInfo = jwtDecode(token)

    const fetchData = useCallback(() => {
        try {
            dispatch(fetchVehicle());
        } catch (error) {
            console.error('Error fetching vehicle data:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = _.debounce((term) => {
        if (term) {
            const filtered = listVehicle.filter((item) =>
                item.plateNumber.toLowerCase().includes(term.toLowerCase()) ||
                item.vehicleId.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredvehicle(filtered);
        } else {
            setFilteredvehicle(listVehicle);
        }
    }, 500);

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        handleSearch(term);
    };

    const handleDeleteVehicle = (uid) => {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: 'Bạn đã sẵn sàng ngừng hoạt động chiếc xe này chưa?',
            showCancelButton: true,
            confirmButtonColor: '#02aab0',
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(deleteVehicle(uid))
                    .then((res) => {
                        if (res.meta.requestStatus === 'fulfilled') {
                            fetchData()
                            toast.success("Xe được tắt hoạt động thành công!");
                        }
                    })
                    .catch((error) => {
                        toast.error(error);
                    });
            }
        });
    };

    const handleDetails = (info) => {
        setdataDetail(info);
        setOpenModalDetail(true);
    }

    const handleEditVehicle = (data) => {
        setdataEdit(data);
        setOpenModalEdit(true);
    }

    const handleUpdateTable = () => {
        fetchData();
    };

    const columns = [
        { field: 'id', headerName: '#', width: 20 },
        { field: 'plateNumber', headerName: 'BIỂN SỐ XE', width: 150 },
        {
            field: 'categoryName', headerName: 'SỐ CHỖ', width: 90, renderCell: (params) => {
                return (
                    <span>{params.row.vehicleCategory.vehicleCategoryName}</span>
                )
            }
        },
        {
            field: 'user', headerName: 'NGƯỜI DÙNG', width: 200, renderCell: (params) => {
                return (
                    <span>{params.row.user.fullName}</span>
                )
            }
        },
        { field: 'numberOfFouls', headerName: 'SỐ LẦN VI PHẠM', width: 140, align: 'Left' },
        {
            field: 'delFlag', headerName: 'TRẠNG THÁI', width: 150, renderCell: (params) => {
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
            field: 'action', headerName: 'CHỈNH SỬA', width: 180, renderCell: (params) => {
                const isAdmin = userInfo.role === 'ADMIN';
                const isDelFlagFalse = params.row.delFlag === true;
                return (
                    <>
                        <span onClick={() => handleDetails(params.row)}>
                            <ContentPasteSearchIcon className='tableListDetail' />
                        </span>

                        {
                            isAdmin && (!isDelFlagFalse || (
                                <span onClick={() => handleEditVehicle(params.row)}>
                                    <EditOutlinedIcon className="tableListEdit" />
                                </span>
                        ))}
                        {isAdmin && (isDelFlagFalse || (
                            <span onClick={() => handleDeleteVehicle(params.row.vehicleId)}>
                                <DeleteOutlineIcon className="tableListDelete" />
                            </span>
                        ))}
                    </>
                )
            }
        }
    ];
    const data = searchTerm ? filteredvehicle : listVehicle;
    return (
        <>
            {loading && <Loader />}
            <div className="tableList">
                <h2 className="tableListTitle">Quản lý xe</h2>
                <div className="tableListBoxContainer">
                    <div className="tableListinput-container">
                        <input type="text"
                            className="input"
                            value={searchTerm}
                            onChange={handleInputChange}
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
                </div>
                <DataGrid
                    rows={data.map((item, index) => ({ ...item, id: index + 1 }))
                        .sort((a, b) => a.delFlag - b.delFlag)}
                    columns={columns}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 6 },
                        }
                    }}
                />
            </div>
            <ModalDetailsVehicle
                open={openModalDetail}
                onClose={() => setOpenModalDetail(false)}
                dataInfo={dataDetail}
            />
            <ModalEditVehicle
                open={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                dataVehicleEdit={dataEdit}
                handleUpdateTable={handleUpdateTable}
            />
        </>
    )
}

export default VehicleList
