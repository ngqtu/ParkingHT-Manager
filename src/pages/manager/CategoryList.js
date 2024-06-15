import { DataGrid } from '@mui/x-data-grid';
import { Suspense, useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import icons from 'ultils/icons'
import _ from "lodash"
import { Loader, ModalAddCategory, ModalDetailsCategory, ModalEditCategory } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from 'store/category/categorySlice';
import { toast } from 'react-toastify';

const CategoryList = () => {
    const { AddIcon, EditOutlinedIcon, DeleteOutlineIcon, ContentPasteSearchIcon } = icons
    const listCategory = useSelector((state) => state.category.list);
    const { loading } = useSelector((state) => state.category);
    const [dataCategoryEdit, setdataCategoryEdit] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    const fetchData = useCallback(() => {
        try {
            dispatch(fetchCategories());
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = _.debounce((term) => {
        if (term) {
            const filtered = listCategory.filter((item) =>
                item.vehicleCategoryId.toLowerCase().includes(term.toLowerCase()) ||
                item.vehicleCategoryName.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredCategories(filtered);
        } else {
            setFilteredCategories(listCategory);
        }
    }, 500);

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        handleSearch(term);
    };

    const handleDeleteCategory = (uid) => {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: 'Bạn đã sẵn sàng ngừng hoạt động loại xe này chưa?',
            showCancelButton: true,
            confirmButtonColor: '#02aab0',
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(uid))
                    .then((res) => {
                        if (res.meta.requestStatus === 'fulfilled') {
                            fetchData()
                            toast.success("Loại xe được tắt hoạt động thành công!");
                        }
                    })
                    .catch((error) => {
                        toast.error(error);
                    });
            }
        });
    };

    const handleEditCategory = (category) => {
        setdataCategoryEdit(category);
        setOpenModalEdit(true);
    }
    const handleDetails = (info) => {
        setdataCategoryEdit(info);
        setOpenModalDetail(true);
    }
    const handleUpdateTable = () => {
        fetchData();
    };

    const columns = [
        { field: 'id', headerName: '#', width: 90 },
        { field: 'vehicleCategoryName', headerName: 'SỐ CHỖ', width: 200 },
        {
            field: 'delFlag', headerName: 'TRẠNG THÁI', width: 200, renderCell: (params) => {
                return (
                    <>
                        {params.row.delFlag ? (
                            <span className="tableStatusText TextSecond">KHÔNG HOẠT ĐỘNG</span>
                        ) : (
                            <span className="tableStatusText">HOẠT DỘNG</span>
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
                                <span onClick={() => handleEditCategory(params.row)}><EditOutlinedIcon className="tableListEdit" /></span>
                            </div>
                        ) : (
                            <div>
                                <span onClick={() => handleDetails(params.row)}><ContentPasteSearchIcon className='tableListDetail' /></span>
                                <span onClick={() => handleEditCategory(params.row)}><EditOutlinedIcon className="tableListEdit" /></span>
                                <span onClick={() => handleDeleteCategory(params.row.vehicleCategoryId)} ><DeleteOutlineIcon className="tableListDelete" /></span>
                            </div>
                        )}
                    </>
                )
            }
        }
    ];
    const data = searchTerm ? filteredCategories : listCategory;
    return (
        <>
            {loading && <Loader />}
            <div className="tableList">
                <h2 className="tableListTitle">Quản lý loại xe</h2>
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
                    <button type="button" onClick={() => setOpenModal(true)}><AddIcon className="tableCreateIcon" /><span>TẠO MỚI</span></button>
                </div>
                <Suspense fallback="Laoding categories...">
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
                </Suspense>
            </div>
            <ModalAddCategory
                open={openModal}
                onClose={() => setOpenModal(false)}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditCategory
                open={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                dataCategoryEdit={dataCategoryEdit}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalDetailsCategory
                open={openModalDetail}
                onClose={() => setOpenModalDetail(false)}
                dataInfo={dataCategoryEdit}
            />
        </>
    )
}

export default CategoryList
