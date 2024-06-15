import React from "react";
import "assets/css/dashboard.css";
import { Sidebar, Topbar } from "components";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import UsersProfile from "./UsersProfile";
import path from "ultils/path"
// import ProtectedRoute from "components/ProtectedRoute";
import { FeedbackList, UserList } from "pages/admin";
import { BookingList, CategoryList, MapParkingSlot, ParkingSlot, ReportList, VehicleList } from "pages/manager";


const Dashboard = () => {

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="container">
        <Topbar />
        <Routes>          
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.USERLIST} element={<UserList />} />
          <Route path={path.USERPROFILE} element={<UsersProfile />} />

          <Route path={path.CATEGORY} element={<CategoryList />} />
          <Route path={path.VEHICLE} element={<VehicleList />} />
          <Route path={path.PARKINGSLOT} element={<ParkingSlot />} />
          <Route path={path.BOOKING} element={<BookingList />} />
          <Route path={path.REPORT} element={<ReportList />} />
          <Route path={path.FEEDBACK} element={<FeedbackList />} />
          <Route path={path.DIAGRAMPARKINGSLOT} element={<MapParkingSlot />} />

        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
