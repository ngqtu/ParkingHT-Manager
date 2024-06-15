import "assets/css/statsCard.css"
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "store/dashboard/dashboardSlice";
import icons from "ultils/icons"
import CurrencyFormat from "ultils/regex";

const StatsCard = () => {
    const {AttachMoneyIcon,GroupAddIcon} = icons;
    const dispatch = useDispatch();
    const { numberTotalInDay, numberTotalRegister } = useSelector((state) => state.dashboard);
    const { token } = useSelector((state) => state.auth);
    const tokenInfo = jwtDecode(token)
    
    useEffect(() => {
        if (tokenInfo.role === "ADMIN") {
            dispatch(fetchDashboard())
        }
    },[dispatch,tokenInfo.role])

    return (
        <div className="StatsCard">
            <div className="StatsCardItem">
                <span className="StatsCardTitle">Tổng thu nhập trong một ngày</span>
                <div className="StatsCardMoneyContainer">
                    <AttachMoneyIcon className="StatsCardIconItem"/>
                    <div className="StatsCardWrapper">
                        <span className="StatsCardMoney">
                            <CurrencyFormat num={numberTotalInDay} />
                        </span>                       
                    </div>
                </div>
            </div>

            <div className="StatsCardItem lightGreenColor">
                <span className="StatsCardTitle">Số người dùng mới đăng ký</span>
                <div className="StatsCardMoneyContainer">
                    <GroupAddIcon className="StatsCardIconItem"/>
                    <div className="StatsCardWrapper">
                        <span className="StatsCardMoney">{numberTotalRegister}</span>                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsCard
