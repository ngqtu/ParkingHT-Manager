import { DataGrid } from '@mui/x-data-grid';
import { Loader, ModalDetailsFeedback } from 'components';
import _ from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedback } from 'store/feedback/feedbackSlice';
import icons from 'ultils/icons';

const FeedbackList = () => {
  const { ContentPasteSearchIcon } = icons
  const dispatch = useDispatch();
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [dataDetail, setdataDetail] = useState({});
  const listFeedback = useSelector((state) => state.feedback.list);
  const { loading } = useSelector((state) => state.feedback);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFeedback, setFilteredFeedback] = useState([]);

  const fetchData = useCallback(() => {
    try {
      dispatch(fetchFeedback());
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = _.debounce((term) => {
    if (term) {
      const filtered = listFeedback.filter((item) =>
        item.feedBackId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFeedback(filtered);
    } else {
      setFilteredFeedback(listFeedback);
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
    { field: 'rankStar', headerName: 'ĐÁNH GIÁ SAO', width: 150 },
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
      field: 'isRead', headerName: 'TRẠNG THÁI', width: 150, renderCell: (params) => {
        return (
          <>
            {params.row.isRead === 1 ? (
              <span className="tableStatusText">ĐÃ XEM</span>
            ) : <span className="tableStatusText TextSecond">CHƯA</span>}
          </>
        );
      }
    },
    {
      field: 'isFeedback', headerName: 'PHẢN HỒI', width: 150, renderCell: (params) => {
        return (
          <>
            {params.row.isFeedback === 1 ? (
              <span className="tableStatusText">PHẢN HỒI</span>
            ) : <span className="tableStatusText TextSecond">CHƯA</span>}
          </>
        );
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
  const data = searchTerm ? filteredFeedback : listFeedback;
  return (
    <>
      {loading && <Loader />}
      <div className="tableList">
        <h2 className="tableListTitle">Quản lý phản hồi</h2>
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
              // Sort by isFeedback in ascending order
              if (a.isFeedback > b.isFeedback) return 1;
              if (a.isFeedback < b.isFeedback) return -1;
              // If isFeedback is the same, sort by createdDate in descending order (latest first)
              if (a.createDate > b.createDate) return -1;
              if (a.createDate < b.createDate) return 1;
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
      <ModalDetailsFeedback
        open={openModalDetail}
        onClose={() => setOpenModalDetail(false)}
        dataInfo={dataDetail}
      />
    </>
  )
}

export default FeedbackList
