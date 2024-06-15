import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import _ from "lodash"
import icons from 'ultils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, ModalDetailsBooking } from 'components';
import { fetchBooking } from 'store/booking/bookingSlice';
import CurrencyFormat from 'ultils/regex';
import moment from 'moment';

const BookingList = () => {
  const { ContentPasteSearchIcon } = icons
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [dataDetail, setdataDetail] = useState({});
  const listBooking = useSelector((state) => state.booking.list);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.booking);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredvehicle, setFilteredvehicle] = useState([]);

  const fetchData = useCallback(() => {
    try {
      dispatch(fetchBooking());
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = _.debounce((term) => {
    if (term) {
      const filtered = listBooking.filter((item) =>
        item.booking_Id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredvehicle(filtered);
    } else {
      setFilteredvehicle(listBooking);
    }
  }, 500);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleDetails = (info) => {
    setdataDetail(info);
    setOpenModalDetail(true);
  }

  const columns = [
    { field: 'id', headerName: '#', width: 20 },
    {
      field: 'user', headerName: 'BIỂN SỐ XE', width: 150, renderCell: (params) => {
        return (
          <span>{params.row.vehicle.plateNumber}</span>
        )
      }
    },
    {
      field: 'start_Date', headerName: 'NGÀY BẮT ĐẦU', width: 150, renderCell: (params) => {
        return (
          <span>
            {
              moment(params.row.start_Date).format("DD/MM/YYYY")
            }
          </span>
        )
      }
    },
    {
      field: 'end_Date', headerName: 'NGÀY KẾT THÚC', width: 150, renderCell: (params) => {
        return (
          <span>
            {
              moment(params.row.end_Date).format("DD/MM/YYYY")
            }
          </span>
        )
      }
    },
    {
      field: 'booking_Status', headerName: 'TRẠNG THÁI', width: 150, renderCell: (params) => {
        return (
          <>
            {params.row.booking_Status === 'ONGOING' ? (
              <span className="tableStatusText TextAvailable">ĐANG ĐẶT CHỖ</span>
            ) : params.row.booking_Status === 'COMPLETED' ? (
              <span className="tableStatusText TextComplete">HOÀN THÀNH</span>
            ) : params.row.booking_Status === 'CANCELED' ? (
              <span className="tableStatusText TextOccupied">ĐÃ HỦY</span>
            ) : null}
          </>
        );
      }
    },
    {
      field: 'booking_Total', headerName: 'TỔNG TIỀN', width: 150, renderCell: (params) => {
        return (
          <CurrencyFormat num={params.row.booking_Total} />
        )
      }
    },
    {
      field: 'action', headerName: 'CHI TIẾT', width: 100, renderCell: (params) => {
        return (
          <>
            <div>
              <span onClick={() => handleDetails(params.row)}>
                <ContentPasteSearchIcon className='tableListDetail' />
              </span>
            </div>
          </>
        )
      }
    }
  ];
  const data = searchTerm ? filteredvehicle : listBooking;
  return (
    <>
      {loading && <Loader />}
      <div className="tableList">
        <h2 className="tableListTitle">Quản lý đặt chỗ</h2>
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
          rows={data
            .map((item, index) => ({ ...item, id: index + 1 }))
            .sort((a, b) => {
              // If delFlag is the same, sort by create_Date in descending order (latest first)
              if (a.create_Date > b.create_Date) return -1;
              if (a.create_Date < b.create_Date) return 1;
              return 0;
            })}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            },
          }}
        />
      </div>
      <ModalDetailsBooking
        open={openModalDetail}
        onClose={() => setOpenModalDetail(false)}
        dataInfo={dataDetail}
      />
    </>
  )
}

export default BookingList
