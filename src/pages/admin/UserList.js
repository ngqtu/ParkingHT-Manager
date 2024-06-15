import "assets/css/tablelist.css"
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import _, { debounce } from "lodash"
import icons from "ultils/icons";
import { apiDeleteUser, apiGetUser } from "apis";
import moment from "moment/moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Loader, ModalDetailsUser, ModalEditUser } from "components";

const UserList = () => {
  const { EditOutlinedIcon, DeleteOutlineIcon, ContentPasteSearchIcon } = icons
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [isloading, setIsloading] = useState(false)
  const [listUser, setlistUser] = useState([]);
  const [dataEditUser, setdataEditUser] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const getAllUsers = async () => {
    setIsloading(true)
    let res = (await apiGetUser()) ?? {};
    if (res && res.data) {
      const tableData = res.data
        .sort((a, b) => {
          // Sort by delFlag in ascending order
          if (a.delFlag > b.delFlag) return 1;
          if (a.delFlag < b.delFlag) return -1;
          // If delFlag is the same, sort by createdDate in descending order (latest first)
          if (a.createdDate > b.createdDate) return -1;
          if (a.createdDate < b.createdDate) return 1;
          return 0;
        })
        .map((item, index) => ({ ...item, id: index + 1 }));
      setlistUser(tableData);
    }
    setIsloading(false)
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleEditUser = (user) => {
    setdataEditUser(user);
    setOpenModal(true);
  }

  const handleDetails = (info) => {
    setdataEditUser(info);
    setOpenModalDetail(true);
  }

  const handleTableU = () => {
    getAllUsers();
  }

  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Bạn đã sẵn sàng ngừng hoạt động người dùng này chưa?",
      showCancelButton: true,
      confirmButtonColor: '#02aab0'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsloading(true)
        const res = await apiDeleteUser(uid);
        if (res.statusCode === 200) {
          getAllUsers();
          toast.success("Người dùng này được tắt hoạt động thành công!");
        } else toast.error(res.message);
        setIsloading(false)
      }
    })

  }

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let clonelistUser = _.cloneDeep(listUser);
      clonelistUser = clonelistUser.filter(item =>
        item.userId.toLowerCase().includes(term.toLowerCase()) ||
        item.fullName.toLowerCase().includes(term.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(term.toLowerCase()) ||
        item.email.toLowerCase().includes(term.toLowerCase())
      );
      setlistUser(clonelistUser);
    } else {
      getAllUsers();
    }
  }, 500)

  const columns = [
    { field: 'id', headerName: '#', width: 20 },
    { field: 'fullName', headerName: 'TÊN TÀI KHOẢN', width: 150 },
    {
      field: 'birthday', headerName: 'NGÀY SINH', width: 150, renderCell: (params) => {
        return (
          <span>{moment(params.row.birthday).format("DD/MM/YYYY")}</span>
        )
      }
    },
    { field: 'phoneNumber', headerName: 'ĐIỆN THOẠI', width: 150 },
    { field: 'role', headerName: 'VAI TRÒ', width: 100 },
    {
      field: 'delFlag', headerName: 'TRẠNG THÁI', width: 150, renderCell: (params) => {
        return (
          <>
            {params.row.delFlag ? (
              <span className="tableStatusText TextSecond">không hoạt động</span>
            ) : (
              <span className="tableStatusText">hoạt động</span>
            )}
          </>
        )
      }
    },
    {
      field: 'action', headerName: 'CHỈNH SỬA', width: 200, renderCell: (params) => {
        const isAdmin = params.row.role === 'ADMIN';
        const isDelFlagFalse = params.row.delFlag === true;

        return (
          <>
            <span onClick={() => handleDetails(params.row)}>
              <ContentPasteSearchIcon className='tableListDetail' />
            </span>

            {
              !isAdmin && (
                <span onClick={() => handleEditUser(params.row)}>
                  <EditOutlinedIcon className="tableListEdit" />
                </span>
              )
            }
            {!isAdmin && (isDelFlagFalse || (
              <span onClick={() => handleDeleteUser(params.row.userId)}>
                <DeleteOutlineIcon className="tableListDelete" />
              </span>
            ))}
          </>
        );
      }
    }
  ];

  return (
    <>
      {isloading && <Loader />}
      <div className="tableList">
        <h2 className="tableListTitle">Quản lý người dùng</h2>
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
        </div>

        <DataGrid
          rows={listUser}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            }
          }}
        />
      </div>
      <ModalEditUser
        open={openModal}
        onClose={() => setOpenModal(false)}
        dataUserEdit={dataEditUser}
        handleTableU={handleTableU}
      />
      <ModalDetailsUser
        open={openModalDetail}
        onClose={() => setOpenModalDetail(false)}
        dataInfo={dataEditUser}
      />
    </>
  )
}

export default UserList
