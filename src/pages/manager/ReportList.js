import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import icons from 'ultils/icons'
import _ from "lodash"
import { fetchReport } from 'store/report/reportSlice';
import { Loader, ModalDetailsReport, ModalEditReport } from 'components';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

const ReportList = () => {
  const { EditOutlinedIcon, ContentPasteSearchIcon } = icons
  const dispatch = useDispatch();
  const listReport = useSelector((state) => state.report.list);
  const { loading } = useSelector((state) => state.report);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReport, setFilteredReport] = useState([]);
  const [dataReportEdit, setdataReportEdit] = useState({});
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const fetchData = useCallback(() => {
    try {
      dispatch(fetchReport());
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = _.debounce((term) => {
    if (term) {
      const filtered = listReport.filter((item) =>
        item.vehiclePlateNumber.toLowerCase().includes(term.toLowerCase()) ||
        item.reportId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredReport(filtered);
    } else {
      setFilteredReport(listReport);
    }
  }, 500);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleEditReport = (report) => {
    setdataReportEdit(report);
    setOpenModalEdit(true);
  }

  const handleDetails = (info) => {
    setdataReportEdit(info);
    setOpenModalDetail(true);
  }

  const handleUpdateTable = () => {
    fetchData();
  };

  const columns = [
    { field: 'id', headerName: '#', width: 20 },
    {
      field: 'vehiclePlateNumber', headerName: 'BIỂN SỐ XE', width: 150, renderCell: (params) => {
        return (
          <span>
            {
              params.row.vehiclePlateNumber !== "" && params.row.vehiclePlateNumber.length > 0
                ? params.row.vehiclePlateNumber : "Không có biển số"
            }
          </span>
        )
      }
    },
    {
      field: 'createDate', headerName: 'NGÀY TẠO', width: 150, renderCell: (params) => {
        return (
          <span>
            {
              moment(params.row.createDate).format("DD/MM/YYYY")
            }
          </span>
        )
      }
    },
    {
      field: 'processingStatus', headerName: 'TRẠNG THÁI XỬ LÝ', width: 150, renderCell: (params) => {
        return (
          <>
            {params.row.processingStatus === 1 ? (
              <span className="tableStatusText">hoàn thành</span>
            ) : <span className="tableStatusText TextSecond">đang xử lý</span>}
          </>
        );
      }
    },
    {
      field: 'processingDate', headerName: 'NGÀY XỬ LÝ', width: 220, renderCell: (params) => {
        return (
          <span>
            {params.row.processingDate !== null ?
              moment(params.row.processingDate).format("DD/MM/YYYY, h:mm:ss A")
              : 'Chưa được xử lý'
            }
          </span>
        )
      }
    },
    {
      field: 'action', headerName: 'CHỈNH SỬA', width: 100, renderCell: (params) => {
        return (
          <>
            {params.row.processingStatus === 1 ? (
              <div>
                <span onClick={() => handleDetails(params.row)}>
                  <ContentPasteSearchIcon className='tableListDetail' />
                </span>
              </div>
            ) : (
              <div>
                <span onClick={() => handleDetails(params.row)}>
                  <ContentPasteSearchIcon className='tableListDetail' />
                </span>
                <span onClick={() => handleEditReport(params.row)}>
                  <EditOutlinedIcon className="tableListEdit" />
                </span>
              </div>
            )}
          </>
        )
      }
    }
  ];
  const data = searchTerm ? filteredReport : listReport;

  return (
    <>
      {loading && <Loader />}
      <div className="tableList">
        <h2 className="tableListTitle">Quản lý đánh giá</h2>
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
            .sort((a, b) => a.isRead - b.isRead)}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            }
          }}
        />
      </div>
      <ModalEditReport
        open={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        dataReportEdit={dataReportEdit}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalDetailsReport
        open={openModalDetail}
        onClose={() => setOpenModalDetail(false)}
        dataInfo={dataReportEdit}
      />
    </>
  )
}

export default ReportList
