import "assets/css/sidebar.css";
import { NavLink } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { sidebarItemData } from "ultils/contants";
import icons from "ultils/icons";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const SidebarContext = createContext();

export default function Sidebar() {
  const { ArrowBackIcon, ArrowForwardIcon } = icons;
  const [expand, setExpand] = useState(true);
  const { token } = useSelector(
    (state) => state.auth
  )
  const userInfo = jwtDecode(token)

  const filteredSidebarItemData = sidebarItemData.filter((item) => {
    if (userInfo.role === "ADMIN") {
      return true; // Show all items for ROLE_ADMIN
    } else if (userInfo.role === "MANAGER") {
      return item.id >= 4; // Show items from id 3 onwards for ROLE_MANAGER
    }
    return false; // Hide other items for any other role
  });
  return (
    <aside className="sidebar">
      <div className={`sidebarContainer ${expand ? "openSidebar" : "closeSidebar"}`}>
        <div className="sidebartoplogo">
          <img className="logo" src={require('../assets/images/Logo.png')} alt='Logo' />
          <span className={`logoText ${expand ? "openSidebarlogoText" : "closeSidebarlogoText"}`}>arkingHT</span>
        </div>
        <SidebarContext.Provider value={{ expand }}>
          <ul className="sidebarWrapper">
            {filteredSidebarItemData.map((el) => (
              <SidebarItem key={el.id} itemId={el.id} icon={el.icon} text={el.value} path={el.paths} />
            ))}
          </ul>
        </SidebarContext.Provider>
        <div className="sidebarBottom">
          <button className="sidebarBottomIcon" onClick={() => setExpand((curr) => !curr)}>
            {expand ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          </button>
        </div>
      </div>
    </aside>
  );
}

export function SidebarItem({ icon, text, path, itemId }) {
  const { expand } = useContext(SidebarContext);
  return (
    <li className="sidebarItem" key={itemId}>
      <NavLink to={path} className="sidebarItemLink">
        {icon}
        <span className={`sidebarItemText ${expand ? "openText" : "closeText"}`}>{text}</span>
        {!expand && <div className="sidebarItemTextHide">{text}</div>}
      </NavLink>
    </li>
  );
}