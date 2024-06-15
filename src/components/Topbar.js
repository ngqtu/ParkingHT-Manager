import "assets/css/topbar.css"
import Dropdown, { DropdownItem, DropdownNotifications } from './Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from 'store/user/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import path from "ultils/path";
import icons from "ultils/icons";
import { useEffect } from "react";
import { fetchCountReportUnread, fetchReportUnread } from "store/report/reportSlice";
import { jwtDecode } from "jwt-decode";
import { fetchCountFeedbackUnread, fetchFeedbackUnread } from "store/feedback/feedbackSlice";
import moment from "moment";
import { clearMessage, fetchGetUserById } from "store/user/userSlide";
import Swal from "sweetalert2";

export default function Topbar() {
  const { NotificationsNoneIcon, AccountCircleIcon, LogoutIcon } = icons
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countUnread, listUnread } = useSelector((state) => state.report);
  const { countUnreadF, listUnreadF } = useSelector((state) => state.feedback);
  const { token } = useSelector((state) => state.auth);
  const { current, mess } = useSelector((state) => state.user);
  const tokenInfo = jwtDecode(token)

  const handleLogout = () => {
    dispatch(logout());
    navigate(`${path.LOGIN}`);
    toast.success("Bạn đã đăng xuất thành công!");
  }

  useEffect(() => {
    dispatch(fetchGetUserById())
    if (tokenInfo.role === "MANAGER") {
      dispatch(fetchCountReportUnread())
      dispatch(fetchReportUnread())
      document.title = countUnread !== 0 ? `(${countUnread}) New Report` : "ParkingHT"
    }
    if (tokenInfo.role === "ADMIN") {
      dispatch(fetchCountFeedbackUnread())
      dispatch(fetchFeedbackUnread())
      document.title = countUnreadF !== 0 ? `(${countUnreadF}) New Feedback` : "ParkingHT"
    }
  }, [dispatch, tokenInfo.role, countUnread, countUnreadF]);

  useEffect(() => {
    if (mess) Swal.fire('Oops!', mess, 'info').then(() => {
        dispatch(logout())
        dispatch(clearMessage())
        navigate(`${path.LOGIN}`);
      })

  }, [mess, dispatch, navigate])

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        {tokenInfo.role === "MANAGER" ? (
          <Dropdown trigger={
            <div className="topbarIconsContainer">
              <NotificationsNoneIcon/>
              {countUnread === 0 ? '' : <span className="topIconBadge">{countUnread}</span>}
            </div>}>
            {countUnread === 0 ? '' : <h6 className='topRightNotifications'>Thông báo</h6>}
            {listUnread?.map((report) => (
              <DropdownNotifications key={report.reportId} isRead="isRead" onClick={() => navigate("/dashboard/report")}>
                <img className="topRightInfoImg" src={require('../assets/images/Logo.png')} alt='' />
                <div className="topRightNotificationsContainer">
                  <p className="topRightNotificationsTitle">{report.content}</p>
                  <span className="topRightNotificationsTime">{moment(report.createDate).endOf('day').fromNow()}</span>
                </div>
              </DropdownNotifications>
            ))}
          </Dropdown>
        ) : tokenInfo.role === "ADMIN" ? (
          <Dropdown trigger={
            <div className="topbarIconsContainer">
              <NotificationsNoneIcon />
              {countUnreadF === 0 ? '' : <span className="topIconBadge">{countUnreadF}</span>}
            </div>}>
            {countUnreadF === 0 ? '' : <h6 className='topRightNotifications'>Thông báo</h6>}
            {listUnreadF?.map((feedback) => (
              <DropdownNotifications key={feedback.feedBackId} isRead="isRead" onClick={() => navigate("/dashboard/feedback")}>
                <img className="topRightInfoImg" src={require('../assets/images/Logo.png')} alt='' />
                <div className="topRightNotificationsContainer">
                  <p className="topRightNotificationsTitle">{feedback.content === null ? 'No idea' : feedback.content}</p>
                  <span className="topRightNotificationsTime">{moment(feedback.createDate).endOf('day').fromNow()}</span>
                </div>
              </DropdownNotifications>
            ))}
          </Dropdown>
        ) : ''}
        <Dropdown trigger={<img className="topAvatar" src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/06/ben-xe-da-nang-vntrip.jpg" alt="avatar" />}>
          <DropdownItem>
            <img className="topRightInfoImg" src={require('assets/images/Logo.png')} alt="avatar" />
            <div className="topRightInfoUser">
              <p className="topRightInfoUserName">{current?.fullName}</p>
              <span className="topRightInfoEmail">Chào mừng trở lại!</span>
            </div>
          </DropdownItem>
          <hr />
          <DropdownItem><AccountCircleIcon size={20} /><Link className="DropdownItemUserProfile" to="/dashboard/userprofile">Thông tin của tôi</Link></DropdownItem>
          <DropdownItem><div className="TopbarDropdownItem" onClick={() => handleLogout()}><LogoutIcon size={20} /> Đăng xuất</div></DropdownItem>
        </Dropdown>
      </div>
    </div>
  )
}
